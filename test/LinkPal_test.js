// eslint-disable-next-line @typescript-eslint/no-var-requires
var h = require('chainlink').helpers
// eslint-disable-next-line @typescript-eslint/no-var-requires
var { expectRevert, time } = require('openzeppelin-test-helpers')

var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

var LinkPal = artifacts.require("./LinkPal");

contract('Factory', accounts => {
  console.log('Running LinkPal Tests')

  const LinkToken = artifacts.require('LinkToken.sol')
  const Oracle = artifacts.require('Oracle.sol')
  const Factory = artifacts.require("Factory.sol");


  const defaultAccount = accounts[0]

  //Oracle Node for testing
  const node_1 = accounts[1]
  
  //Reserved for other shit
  const node_2 = accounts[2]
  const node_3 = accounts[3]
  const node_4 = accounts[4]

  //const oracleNode = accounts[1]
  const seller = accounts[5]
  const buyer = accounts[6]

  // These parameters are used to validate the data was received
  // on the deployed oracle contract. The Job ID only represents
  // the type of data, but will not work on a public testnet.
  // For the latest JobIDs, visit our docs here:
  // https://docs.chain.link/docs/testnet-oracles

  const paypalInvoice = "MHRNUJCVDB4"

  // Represents 1 LINK for testnet requests
  const payment = web3.utils.toWei('1')
  var ethAmount =  1000000000000000000;

  let link, oc, cc
  let factory
  //Before each should deploy a Factory contract and deploy a contract.
  beforeEach(async () => {
    link = await LinkToken.new()
    oc = await Oracle.new(link.address, { from: defaultAccount })
    instance = await Factory.new()
    application = await instance.createLinkPal(
      "USD",
      paypalInvoice,
      buyer,
      ["9e077ffec34b413b9622f9b21f028c49","9e077ffec34b413b9622f9b21f028c49","9e077ffec34b413b9622f9b21f028c49"],
      ["0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1","0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1","0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1"],
      link.address,
    {from : seller, value : ethAmount});
    //This looks for the emitted event by the contract which states the new address
    //console.log(application.logs[0].args.LinkPalAddress)
    linkPalContract = await LinkPal.at(application.logs[0].args.LinkPalAddress);
    //cc = await MyContract.new(link.address, { from: consumer })
    await oc.setFulfillmentPermission(node_1, true, {
      from: defaultAccount,
    })
  })

  //Factory Tests
  it("This should check if the Factory has 1 deployed contract for the seller", async () => { 
    assert.equal(1,await instance.getLinkPalAddressesSeller({from : seller}))
  });
   
  //Factory Tests
  it("This should check if the Factory has 1 deployed contract for the buyer", async () => { 
    assert.equal(1,await instance.getLinkPalAddressesBuyer({from : buyer}))
  });

  it("This should check if the Factory has 2 deployed contract for the seller", async () => { 
    //Deploy another contract as the seller
    await instance.createLinkPal(
      "USD",
      paypalInvoice,
      buyer,
      ["9e077ffec34b413b9622f9b21f028c49","9e077ffec34b413b9622f9b21f028c49","9e077ffec34b413b9622f9b21f028c49"],
      ["0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1","0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1","0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1"],
      link.address,
    {from : seller, value : ethAmount});

    assert.equal(2,await instance.getLinkPalAddressesSeller({from : seller}))
  });

  it("This should check if the Factory has 2 deployed contract for the buyer", async () => { 
    //Deploy another contract as the seller
    await instance.createLinkPal(
      "USD",
      paypalInvoice,
      buyer,
      ["9e077ffec34b413b9622f9b21f028c49","9e077ffec34b413b9622f9b21f028c49","9e077ffec34b413b9622f9b21f028c49"],
      ["0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1","0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1","0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1"],
      link.address,
    {from : seller, value : ethAmount});

    assert.equal(2,await instance.getLinkPalAddressesBuyer({from : buyer}))
  });

  
  //LinkPal Tests
  it("This should check if the contract indeed has 3 Jobs", async () => { 
    assert.equal(3,await linkPalContract.getjobIdsLength.call())
  });

  it("This should check if the contract indeed has 3 Oracles", async () => { 
    assert.equal(3,await linkPalContract.getoraclesLength.call())
  });

  it("This should check that the seller has no link in the contract", async () => { 
    assert.equal(0,await linkPalContract.getLinkBalance.call({from : seller}))
  });

  it("This should check that the buyer has no link in the contract", async () => { 
    assert.equal(0,await linkPalContract.getLinkBalance.call({from : buyer}))
  });

  it("This should check if the ChainLinkToken Address is correct", async () => { 
    assert.equal(link.address,await linkPalContract.getChainlinkToken.call())
  });

  describe('#createRequest', () => {
    context('without LINK', () => {
      it('reverts', async () => {
        await expectRevert.unspecified(
          linkPalContract.requestConfirmations({
            from: seller,
          }),
        )
      })
    })

    context('with LINK', () => {

      beforeEach(async () => {
        await link.transfer(linkPalContract.address, web3.utils.toWei('10', 'ether'))
      })

      context('sending a request to a specific oracle contract address', () => {
        it('triggers a log event in the new Oracle contract', async () => {
          const tx = await linkPalContract.requestConfirmations({ from: seller })
          assert.equal(oc.address, tx.receipt.rawLogs[3].address)
        })
      })
    })
  })
})