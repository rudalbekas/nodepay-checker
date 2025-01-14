const axios = require("axios");
const fs = require("fs");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");

let wallets = fs.readFileSync("address.txt", "utf8").split("\n").map(line => line.trim()).filter(Boolean); 
let proxies = fs.readFileSync("proxies.txt", "utf8").split("\n").map(line => line.trim()).filter(Boolean);  

let totalLock = 0;

function getRandomProxy() {
  return proxies[Math.floor(Math.random() * proxies.length)];
}

async function checkTotalPoints(wallet) {
  let proxy = getRandomProxy();  
  let config = {
    timeout: 25000,
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    },
  };

  if (proxy) {
    if (proxy.includes('http')) {
      config.httpsAgent = new HttpsProxyAgent(proxy);
    } else if (proxy.includes('socks')) {
      config.httpsAgent = new SocksProxyAgent(proxy);
    }
  }

  try {
    const response = await axios.get(`https://claim.nodefoundation.ai/api/allocations?wallet=${wallet}`, config);
    let lock = response.data[0]?.total || 0;

    totalLock += parseFloat(lock);

    console.log(`Wallet: ${wallet} | Total: ${lock}`);
  } catch (error) {
    console.error('Error fetching data for wallet', wallet, error.message);
  }
}

async function checkWallets() {
  for (let i = 0; i < wallets.length; i++) {
    await checkTotalPoints(wallets[i]);
  }

  console.log('----------------------------');
  console.log('Total NC:', totalLock);
}

checkWallets();
