import { ethers } from "hardhat";

async function main() {

    const deployerAddr = "0x3A270D04BC0C942f74AEAbEEF4299714B348be96";
    const deployer = await ethers.getSigner(deployerAddr);

//  console.log(`Deploying contracts with the account: ${deployer.address}`);
//  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

//  const pricefeedContract = await ethers.getContractFactory("KlayUsdPriceFeed");
//  const pfContract = await pricefeedContract.deploy();


//  await pfContract.deployed();

//  console.log(`Token contract is deployed to ${pfContract.address}`);
//  console.log(`Congratulations! You have just succesfully deployed your price feed contract.`);

  const deployedContractAddr = "0x06E856ff30b0Dc2D3fD1B26F28f447A4327419D6"
  const priceFeedInstance = await ethers.getContractAt("KlayUsdPriceFeed", deployedContractAddr)
  const priceFeed = await priceFeedInstance.connect(deployer).getKlayUsdtPrice();
  console.log(Number(priceFeed[0].toString()) / Math.pow(10,6));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
