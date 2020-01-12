pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

import "./HoneyDex.sol";

//HoneyDexFactory, Produces the HoneyDex agreements between users.
contract HoneyDex{
    mapping (address => address[]) public AgreementAddressesSeller;
    mapping (address => address[]) public AgreementAddressesBuyer;

    //address public HoneyDexAddress;
    event contractDeployed(
        address AgreementAddress
    );

    //Creates, deploys and funds the HoneyDex contract
    function createAgreement(

        address _buyerEthAddress,
        uint256 _amountTarget,
        string  _sellerTargetCryptoAddress,
        string  _buyerTargetCryptoAddress,
        string[] _jobIds,
        address[] _oracles

    ) public payable{
        //Probably need more requirement checks
        require(msg.value > 0,"No Negative Values are allowed");

        address AgreementAddress = (new Agreement).value(address(this).balance)(
            msg.sender,
            _buyerEthAddress,
            msg.value,
            _amountTarget,
            _sellerTargetCryptoAddress,
            _buyerTargetCryptoAddress,
            _jobIds,
            _oracles
        );

        //If it didn't fail Lock that much into a balance
        AgreementAddressesSeller[msg.sender].push(AgreementAddress);
        AgreementAddressesBuyer[_buyerEthAddress].push(AgreementAddress);

        //Emit an event here\
        emit contractDeployed(AgreementAddress);
    }

    function getAgreementAddressesSeller() public view returns(address[]) {
        return AgreementAddressesSeller[msg.sender];
    }

    function getAgreementAddressesBuyer() public view returns(address[]) {
      return AgreementAddressesBuyer[msg.sender];
    }
}