import { ethers } from "hardhat";

async function main() {

    const deployerAddr = "0x3A270D04BC0C942f74AEAbEEF4299714B348be96";
    const deployer = await ethers.getSigner(deployerAddr);

    console.log(`Deploying contracts with the account: ${deployer.address}`);
    console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

  const tokenContract = await ethers.getContractFactory("KIP17Token");
  const tContract = await tokenContract.deploy();


  await tContract.deployed();

  console.log(`Token contract is deployed to ${tContract.address}`);
  console.log(`Congratulations! You have just succesfully deployed your tokens.`); 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
