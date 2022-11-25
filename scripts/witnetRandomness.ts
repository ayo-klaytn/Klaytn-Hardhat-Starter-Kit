import { ethers } from "hardhat";

async function main() {

    const deployerAddr = "0x3A270D04BC0C942f74AEAbEEF4299714B348be96";
    const deployer = await ethers.getSigner(deployerAddr);

//  console.log(`Deploying contracts with the account: ${deployer.address}`);
//  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

//  const pricefeedContract = await ethers.getContractFactory("WitnetRandomness");
//  const pfContract = await pricefeedContract.deploy("0xB4B2E2e00e9d6E5490d55623E4F403EC84c6D33f");


//  await pfContract.deployed();

//  console.log(`Token contract is deployed to ${pfContract.address}`);
//  console.log(`Congratulations! You have just succesfully deployed your randomness contract.`);

  const deployedContractAddr = "0x0f26194f41b557EE026234D2f25DB0251B2ce614"
  const witnetRandomInstance = await ethers.getContractAt("WitnetRandomness", deployedContractAddr)
  
//   const option = {value: ethers.utils.parseEther('3')};
//   const requestRN = await witnetRandomInstance.connect(deployer).requestRandomNumber(option);
//   await requestRN.wait();

//   const fetchRN = await witnetRandomInstance.connect(deployer).fetchRandomNumber();
//   await fetchRN.wait()
  
  

  const randomness = await witnetRandomInstance.randomness()
  console.log(randomness);
  





}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
