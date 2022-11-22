// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("KIP37Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const kip37Token = await Token.deploy();

    await kip37Token.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { kip37Token, owner, addr1, addr2 };
  }

  describe("Transactions", function () {
    it("balance should increase after minting", async function () {
      const { kip37Token,  addr1} = await loadFixture(deployTokenFixture);
    
      const initialBlalance = await kip37Token.balanceOf(addr1.address, 0);
      const amount = "1000000000";
      const uri = "Token URI";
      const mint = await kip37Token.connect(addr1).mintToken(uri, amount);
      let tx = await mint.wait()

     const balanceAfter = await kip37Token.balanceOf(addr1.address, 0);

     expect(Number(initialBlalance.toString()) + Number(amount.toString())).to.equal(Number(balanceAfter.toString())) 

    })

    it("Should return correct URI", async function () {
      const { kip37Token, addr1 } = await loadFixture(
        deployTokenFixture
      );

      const amount = "1000000000";
      const uri = "Token URI";
      const mint = await kip37Token.connect(addr1).mintToken(uri, amount);
      let tx = await mint.wait()

      expect( await kip37Token.uri(0)).to.equal(uri) 
    
    })

    it("Should fail if caller is not owner", async function () {
        const { kip37Token, owner, addr1 } = await loadFixture(
          deployTokenFixture
        );
  
        // mint tokens to owner addr
        const amount = "1000000000";
        const uri = "Token URI";
        const mint = await kip37Token.connect(addr1).mintToken(uri, amount);
        let tx = await mint.wait()
  
        // get owner balance after mint
        const ownerBalanceAftermint = await kip37Token.balanceOf(owner.address, 0);
  
        // Try to send token id 1 from owner addr (0 tokens) to addr 1 (0 tokens) .
        // `require` will evaluate false and revert the transaction.
        await expect(
          kip37Token.connect(addr1).safeTransferFrom(owner.address, addr1.address, 0, 5000000000, "0x00")
        ).to.be.revertedWith("KIP37: caller is not owner nor approved");
  
        // Owner balance shouldn't have changed.
        expect(await kip37Token.balanceOf(owner.address, 0)).to.equal(
          ownerBalanceAftermint
        );
      })


    })

})
