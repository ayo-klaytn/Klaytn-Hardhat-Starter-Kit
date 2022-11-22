import { ethers } from "hardhat";

async function main() {

    // This is an example of interacting with an already deployed contract(WKLAY) using hardhat forking feature.

    // address with Wklay
    const WklayOwnerAddr = "0x32ec8541bb748d7e23d3ec2f24cd06054c13a4ec";

    // address without Wklay
    const noWklayAddr = "0x0DFbacf13d84627C1c629FE46a6307665646d92a"

    // using hardhat-ethers impersonate feature
    const impersonatedSigner = await ethers.getImpersonatedSigner(WklayOwnerAddr);

    console.log(`Impersonating account!!: ${impersonatedSigner.address}`);
    console.log(`Account balance: ${(await impersonatedSigner.getBalance()).toString()}`); 


    // setting the instance of WKLAY Contract
    const WKLAYContract = await ethers.getContractAt("IKIP7Token", "0xe4f05a66ec68b54a58b17c22107b02e0232cc817")
    // gets the balance of address with wKlay
    const bal = await WKLAYContract.balanceOf(WklayOwnerAddr)
    console.log(bal);

    // @ts-ignore

    // You can set the balance if wklayOwnwerAddr doesnt have KLAY to pay for gas fees.
    //  await network.provider.send("hardhat_setBalance", [
    //   WklayOwnerAddr,
    //   "0x100000000000000000000000000000000000",
    // ])

    // console.log(`Account balance after setting KLAY: ${(await impersonatedSigner.getBalance()).toString()}`);
    
    // address with wKlay transfers WKLAY to an address without wKlay
    await WKLAYContract.connect(impersonatedSigner).transfer(noWklayAddr, "1000000000000000000");

    // balance of wklayOwner and noWklayBalAfter should decrease and increase respectively
    const wklayOwnerBalAfter = await WKLAYContract.balanceOf(WklayOwnerAddr);
    const noWklayBalAfter = await  WKLAYContract.balanceOf(noWklayAddr);

    console.log(wklayOwnerBalAfter, noWklayBalAfter);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
