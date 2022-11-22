
## Table of Content
- [Klaytn Hardhat Starter-Kit](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#hardhat-starter-kit)
 - [Getting Started](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#getting-started)
      - [Requirement](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#requirement)
      - [Quickstart](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#quickstart)
- [Usage](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#usage)
     - [Compiling contracts](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#1-compiling-contracts)
      - [Deploying contracts](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#2-deploying-contracts)
     - [Run a Local Network](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#run-a-local-network)
      - [Using a Testnet or Live Network (Baobab or Cypress)](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#using-a-testnet-or-live-network-baobab-or-cypress)
     - [Klaytn Baobab Testnet Setup](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#klaytn-baobab-testnet-setup)
      - [Forking from mainnet](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#forking-from-mainnet)
      - [Test
](https://github.com/ayo-klaytn/Klaytn-Harhdat-Starter-Kit#test)

# Hardhat Starter-Kit

This is an implementation of Klaytn token standards using the Hardhat development environment.

 - [KIP 7](https://kips.klaytn.foundation/KIPs/kip-7)
 - [KIP 17](https://kips.klaytn.foundation/KIPs/kip-17)
 - [KIP 37](https://kips.klaytn.foundation/KIPs/kip-37)

# Getting Started

Primarily, you would learn how to write, deploy, and test smart contract functionalities using Hardhat.
And also explore other Hardhat features like [Forking from mainnet](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-from-mainnet), [Impersonating Account](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#impersonating-accounts) and [Hardhat Set Balance](https://hardhat.org/hardhat-network/docs/reference#hardhat_setbalance)


Please refer to [Hardhat Getting Started Guide](https://hardhat.org/getting-started/) to learn more.

## Requirement

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    - You'll know if git is installed if you can run: ```git --version``` and you see a response like git version x.x.x
- [Nodejs](https://nodejs.org/en/)
    - You'll know you've installed nodejs right if you can run: ```node --version``` and get an output like: vx.x.x

## Quickstart

1. Clone and install dependencies

After installing all the requirements, run the following:


```bash
  git clone githbub/rep
  cd my-project
```

Then:

```bash
 npm install
```


2. Now you can run hardhat commands!

```bash
 npx hardhat test
```

To get a list of all commnands, run ```npx hardhat --help```

# Usage 

## 1. Compiling contracts

```bash
 npx hardhat compile
```

This compiles the entire project, building all artifacts.

## 2. Deploying contracts 

```bash
 npx hardhat run
```

This runs a user-defined script after compiling the project.

```bash
 npx hardhat run scripts/scriptname.ts
```

## Run a Local Network

```bash
 npx hardhat node
```

 This Starts a JSON-RPC server on top of Hardhat Network. With this you get you'll get a local blockchain, private keys, and also ether for gas fees. This is one of the best ways to test and interact with smart contracts.

 ## Using a Testnet or Live Network (Baobab or Cypress)

 In your hardhat.config.ts you'll see section like:

```bash
module.exports = {
  solidity: "0.8.17",
  networks: {
```

This section of the file is where you define which networks you want to interact with. You can read more about network config in [hardhat docs](https://hardhat.org/hardhat-runner/docs/config).

To interact with a live or test network, you'll need:

- An rpc URL
- A Private Key
- KLAY (either testnet or real)

Let's look at an example of setting these up using the  Klaytn Baobab testnet.

## Klaytn Baobab Testnet Setup

First, we will need to set environment variables. We can do so by setting them in our .env file (create it if it's not there / rename to .env if you have .env.example).

`IMPORTANT NOTE: PLEASE MAKE SURE YOU'D DON'T EXPOSE THE KEYS YOU PUT IN THIS .env FILE. By that, I mean don't push them to a public repo, and please try to keep the keys you use in development not associated with any real funds.`



1. Set your `Baobab_RPC_URL` environment variable.

You can get one for free from [ANKR](https://rpc.ankr.com/klaytn), [AllthatNode](https://www.allthatnode.com/klaytn.dsrv), .

2. Set your `PRIVATE_KEY` environment variable.
This is your private key from your wallet, ie MetaMask. This is needed for deploying contracts to public networks. You can optionally set your MNEMONIC environment variable instead with some changes to the hardhat.config.js.

`.env` example:

```bash
BAOBAB_RPC_URL="https://klaytn-baobab-rpc.allthatnode.com:8551/abcdef"
PRIVATE_KEY="abcdef"
```

3. Get some Testnet KLAY

Head over to the [Klaytn Faucet](https://baobab.wallet.klaytn.foundation/faucet) and get some KLAY.

4. Change KIP7 contract argument.

Head over to **scripts** folder, click on kip7TokenDeploy.ts. Change token **name**, **symbol** and **supply** to suit yours.


5. Running commands

You should now be all setup! You can run any command and just pass the --network baobab now!

To deploy contracts:

```bash
npx hardhat run scripts/kip7TokenDeploy.ts --network baobab
```

To run test:
```bash
npx hardhat test test/kip7test.ts
```

## Forking from mainnet

If you'd like to run tests or on a network that is a [forked network](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-from-mainnet)

1. Set a CYPRESS_ARCHIVE_URL environment variable that connects to the mainnet.

```bash
CYPRESS_ARCHIVE_URL = "https://klaytn-mainnet-archive.allthatnode.com:8551"
```

This is how your `hardhat.config.ts` should look like


```bash
  hardhat: {
      forking: {
       url: process.env.CYPRESS_ARCHIVE_URL ||  "",
    }
```


```bash
npx hardhat node
```
This pulls the instance of live network(cypress) on your local 

## Test

Tests are located in the **test** directory, and are split between unit tests and staging/testnet tests. Unit tests should only be run on local environments, and staging tests should only run on live environments.

To run unit tests:

```bash
npx hardhat test
```

To run tests on baobab network:

```bash
npx hardhat test test/testfile.ts --network baobab
```










