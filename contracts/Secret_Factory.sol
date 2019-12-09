pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

import "./Secret_HoneyDex.sol";

//HoneyDexFactory, Produces the HoneyDex agreements between users.
contract Secret_Factory{
    mapping (address => address[]) public HoneyDexAddressesSeller;
    mapping (address => address[]) public HoneyDexAddressesBuyer;

    //address public HoneyDexAddress;
    event contractDeployed(
        address HoneyDexAddress
    );

    //Creates, deploys and funds the HoneyDex contract
    function createHoneyDex(

        bytes32 _blockstackID,
        string _invoiceID,
        address  _buyerAddress,
        string[] _jobIds,
        address[] _oracles,
        bytes32[] _publicKeys,
        bytes32[] _encryptedInvoices,
        address _link

    ) public payable{
        //Probably need more requirement checks
        require(msg.value > 0,"No Negative Values are allowed");

        address HoneyDexAddress = (new Secret_HoneyDex).value(address(this).balance)(

            _blockstackID,
             _invoiceID,
            msg.sender,
            _buyerAddress,
            msg.value,
            _jobIds,
            _oracles,
            _publicKeys,
            _encryptedInvoices,
            _link

        );

        //If it didn't fail Lock that much into a balance
        HoneyDexAddressesSeller[msg.sender].push(HoneyDexAddress);
        HoneyDexAddressesBuyer[_buyerAddress].push(HoneyDexAddress);

        //Emit an event here\
        emit contractDeployed(HoneyDexAddress);
    }

    function getHoneyDexAddressesSeller() public constant returns(address[]) {
        return HoneyDexAddressesSeller[msg.sender];
    }

    function getHoneyDexAddressesBuyer() public constant returns(address[]) {
      return HoneyDexAddressesBuyer[msg.sender];
    }
}
