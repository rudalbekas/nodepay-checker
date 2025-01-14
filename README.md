# Nodepay Allocation Checker

[Claim Nodepay](https://claim.nodefoundation.ai)

## Installation

### 1. Clone the repository

To get started, clone this repository to your local machine using Git:

```bash
git clone https://github.com/rudalbekas/nodepay-checker
cd nodepay-checker
```
### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```
This will install axios, https-proxy-agent, and socks-proxy-agent dependencies that are required by the script.

### 3. Configure your wallet addresses and proxies

Create two text files in the project root directory:

* address.txt : List of wallet addresses, each on a new line.
* proxies.txt : List of proxy URLs (both HTTP and SOCKS), each on a new line.

### 4. Running the script
```bash
node index.js
```

