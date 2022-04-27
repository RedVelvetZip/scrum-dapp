require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const { REACT_APP_INFURA_URL, REACT_APP_PRIVATE_KEY } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  defaultNetwork: "rinkeby", //if not stated otherwise, default goes to hardhat
  networks: {
    hardhat: {  //for local 8545
      chainId: 1337,
    },
    rinkeby: {
      url: `${process.env.REACT_APP_INFURA_URL}`,
      accounts: [`${process.env.REACT_APP_PRIVATE_KEY}`]
    }
  },
};
