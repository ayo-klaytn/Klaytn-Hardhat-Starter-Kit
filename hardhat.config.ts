require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

// KLAYTN_URL
// Go to https://www.allthatnode.com/, sign up, create
// a new App in its dashboard, and replace "KEY" with its key

// PRIVATE_KEY
// Replace this private key with your Kaikas account private key
// To export your private key from Kaikas, open Kaikas and
// go to Account Details > Export Private Key
// Beware: NEVER put real KLAY into testing accounts

module.exports = {
  solidity: "0.8.17",
  networks: {
    baobab: {
      url: process.env.BAOBAB_RPC_URL || "",
      gasPrice: 250000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      forking: {
       url: process.env.CYPRESS_ARCHIVE_URL ||  "",
    }
  }
  }
};

// MNEMONICs Config

// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     baobab: {
//       url: process.env.KLAYTN_URL || "",
//       gasPrice: 250000000000,
//       accounts: {
//         mnemonic: process.env.MNEMONIC || "",
//         path: "m/44'/60'/0'/0",
//         initialIndex: 0,
//         count: 20,
//         passphrase: "",
//       },
//     },
//   },
// };