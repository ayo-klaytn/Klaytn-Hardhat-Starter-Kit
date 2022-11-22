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
    const Token = await ethers.getContractFactory("KIP17Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const kip17Token = await Token.deploy();

    await kip17Token.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { kip17Token, owner, addr1, addr2 };
  }

  describe("Transactions", function () {
    it("Should mint tokens to an account", async function () {
      const { kip17Token,  addr1} = await loadFixture(deployTokenFixture);
      //  mint tokens to addr1
      await expect(
        kip17Token.mintTo(addr1.address)
      ).to.changeTokenBalance(kip17Token, addr1.address, 1);
    });

    it("Should fail if caller is not owner", async function () {
      const { kip17Token, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      // mint tokens to owner addr
      const mintOwner = await kip17Token.mintTo(owner.address);
      let tx = mintOwner.wait();

      // get owner balance after mint
      const ownerBalanceAftermint = await kip17Token.balanceOf(owner.address);

      // Try to send token id 1 from owner addr (0 tokens) to addr 1 (0 tokens) .
      // `require` will evaluate false and revert the transaction.
      await expect(
        kip17Token.connect(addr1).transferFrom(owner.address, addr1.address, 1)
      ).to.be.revertedWith("KIP17: transfer caller is not owner nor approved");

      // Owner balance shouldn't have changed.
      expect(await kip17Token.balanceOf(owner.address)).to.equal(
        ownerBalanceAftermint
      );
    })

    it("Should return owner of token Id", async function () {
        const { kip17Token, owner } = await loadFixture(deployTokenFixture);
        
        // mint tokens to owner addr
        const mintOwner = await kip17Token.mintTo(owner.address);
        let tx = mintOwner.wait();
    
        expect(
          await kip17Token.ownerOf(1)
        ).to.equal(owner.address);

      })


})

})