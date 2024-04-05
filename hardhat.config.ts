import { VECHAIN_URL_SOLO, VECHAIN_URL_MAINNET, VECHAIN_URL_TESTNET } from "@vechain/hardhat-vechain"
import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@vechain/hardhat-vechain"
import "@vechain/hardhat-ethers"

const config: HardhatUserConfig = {
  solidity: "0.8.20",
}

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 180000,
  },
  defaultNetwork: "vechain_solo",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    vechain_solo: {
      url: VECHAIN_URL_SOLO,
      accounts: {
        mnemonic: "denial kitchen pet squirrel other broom bar gas better priority spoil cross",
        count: 10,
      },
      restful: true,
      gas: 10000000,
    },
  },
}

export default config
