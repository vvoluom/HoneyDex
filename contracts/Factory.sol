pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

import "./LinkPal.sol";

//LinkPalFactory, Produces the LinkPal agreements between users.
contract Factory{
    mapping (address => address[]) public LinkPalAddressesSeller;
    mapping (address => address[]) public LinkPalAddressesBuyer;

    //address public LinkPalAddress;
    event contractDeployed(
        address LinkPalAddress
    );

    //Creates, deploys and funds the linkpal contract
    function createLinkPal(
        string _currency,
        string _invoiceID,
        address  _buyerAddress,
        string[] _jobIds,
        address[] _oracles,
        address _link
    ) public payable{
        //Probably need more requirement checks
        require(msg.value > 0,"No Negative Values are allowed");
 
        address LinkPalAddress = (new LinkPal).value(address(this).balance)(
            _currency,
             _invoiceID,
            msg.sender,
            _buyerAddress,
            msg.value,
            _jobIds,
            _oracles,
            _link
        );
        
        //If it didn't fail Lock that much into a balance
        LinkPalAddressesSeller[msg.sender].push(LinkPalAddress);
        LinkPalAddressesBuyer[_buyerAddress].push(LinkPalAddress);
    
        //Emit an event here\
        emit contractDeployed(LinkPalAddress);
    }
    
    function getLinkPalAddressesSeller() public constant returns(uint) {
        return LinkPalAddressesSeller[msg.sender].length;
    }
    
    function getLinkPalAddressesBuyer() public constant returns(uint) {
      return LinkPalAddressesBuyer[msg.sender].length;
    }
}
