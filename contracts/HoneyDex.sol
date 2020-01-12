pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

import "https://github.com/thodges-gh/chainlink/evm/contracts/ChainlinkClient.sol";
import "https://github.com/thodges-gh/chainlink/evm/contracts/vendor/Ownable.sol";

library SafeMath{

    function add(uint256 a, uint256 b) internal pure returns (uint256){    
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256){
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a-b;

        return c;
    }
}

contract Agreement is ChainlinkClient{

    //Payment of 0.3333 to each node
    uint256 constant private ORACLE_PAYMENT = LINK/3;
    bool public released;
    uint8 public trueCount;
    uint8 public falseCount;
    uint256 public returnedtxid;
    int256 public marketPrice;
    //These must all be set on creation
    string public sellerTargetCryptoAddress;
    string public buyerTargetCryptoAddress;
    address public sellerEthAddress;
    address public buyerEthAddress;
    uint256 public amountEth;
    uint256 public amountTarget;
    uint256 public deploymentTime;
    string  public apiAddress;

    mapping (address => uint256) public linkbalances;

    using SafeMath for uint256;

    event successNodeResponse(
        bool success
    );

    event NewPriceEmiited(
        int256 coinPrice
    );

    //Arrays 1:1 of Oracales and the corresponding Jobs IDs in those oracles
    string[] public jobIds;
    address[] public oracles;

    constructor(

        address _sellerEthAddress,
        address _buyerEthAddress,
        uint256 _amountEth,
        uint256 _amountTarget,
        string  _sellerTargetCryptoAddress,
        string  _buyerTargetCryptoAddress,
        string[] _jobIds,
        address[] _oracles

    )public payable{

        deploymentTime = block.timestamp;
        trueCount = 0;
        falseCount = 0;
        released = false;
        sellerEthAddress = _sellerEthAddress;
        buyerEthAddress = _buyerEthAddress;
        amountEth = _amountEth;
        amountTarget = _amountTarget;
        sellerTargetCryptoAddress = _sellerTargetCryptoAddress;
        buyerTargetCryptoAddress = _buyerTargetCryptoAddress;
        jobIds = _jobIds;
        oracles = _oracles;
        setPublicChainlinkToken();

    }

    function getjobIds() public view returns(string[]) {
        return jobIds;
    }

    function getoracles() public view returns(address[]) {
        return oracles;
    }

    //Return link balance of the function invoker
    function getLinkBalance() public view returns(uint){
        return linkbalances[msg.sender];
    }
    //modifier to only allow buyers to access functions
    modifier buyerSellerContract(){
        require(address(this) == msg.sender || sellerEthAddress == msg.sender || buyerEthAddress == msg.sender,"Unauthorised , must be buyer or seller");
        _;
    }

    function requestMarketPrice(string coinnumber, address _oracle, string  _jobId)
    public
    {
        //Loop to iterate through all the responses from different nodes
        Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), this, this.fullfillCoinPrice.selector);
        req.add("coin_id", coinnumber);
        req.add("copyPath", "data.coin.price");
        sendChainlinkRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function requestConfirmations(string memory tx_hash)
    public
    buyerSellerContract
    {
        apiAddress = strConcat("https://blockchain.info/q/txresult/", tx_hash, "/", sellerTargetCryptoAddress, "?confirmations=3");
        //Reset them to 0 to be able to safely re-run the oracles
        trueCount = 0;
        falseCount = 0;

        //Loop to iterate through all the responses from different nodes
        for(uint i = 0; i < oracles.length; i++){
            Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(jobIds[i]), this, this.fulfillNodeRequest.selector);
            req.add("get",apiAddress);
            sendChainlinkRequestTo(oracles[i], req, ORACLE_PAYMENT);
        }
    }

    function strConcat(string _a, string _b, string _c, string _d, string _e) internal pure returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    //This should fulfill the node request
    function fullfillCoinPrice(bytes32 _requestId, int256 coinPrice)
    public
    recordChainlinkFulfillment(_requestId)
    {
        marketPrice = coinPrice;
        emit NewPriceEmiited(coinPrice);
    }

    //This should fulfill the node request
    function fulfillNodeRequest(bytes32 _requestId, uint256 txid)
    public
    recordChainlinkFulfillment(_requestId)
    {
        returnedtxid = txid;
        //emit NodeRequestFulfilled(_requestId, _output);
        //Append to these to calculate if the funds should be released 0.2704
        if(amountTarget == txid) {
            //Invoice Paid
            trueCount += 1;
        }else if (amountTarget != txid){
            //Invoice Not Paid Yet
            falseCount += 1;
        }
        if(trueCount > falseCount){
            released = true;
        }else{
		  released = false;
		}
        emit successNodeResponse(released);
    }

    function returnNewID() public view returns(uint256){
        return returnedtxid;
    }

    //This isnt really needed
    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    //Withdraw ETH from contract
    //Checks on who can withdraw should only be accessible by buyer and seller
    //Maybe modifications that the seller can send the ETH to the buyer.
    function withdrawETH() public buyerSellerContract {
        if(msg.sender == sellerEthAddress && deploymentTime <= block.timestamp + 1 days && (trueCount != 0 || falseCount != 0)){
            if(released == false){
                //If a day has passed then the seller can take back his ETH
                address(msg.sender).transfer(amountEth);
                amountEth = 0;
            }
        }else if (msg.sender == buyerEthAddress && released == true){
            //Withdraw the ETH from the contract
            address(msg.sender).transfer(amountEth);
            amountEth = 0;
        }else{
            //Do Nothing cause you do not have access to this contract
        }
    }

    //Function to deposit LINK into contract and keep track of such deposits
    function depositLink(uint256 _amount) public buyerSellerContract{
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(address(this),_amount),"Unable to transfer");
        linkbalances[msg.sender] = SafeMath.add(linkbalances[msg.sender],_amount);
    }

//Withdraw Link from contract
    function withdrawLink() public buyerSellerContract{
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender,linkbalances[msg.sender]), "Unable to transfer");
        linkbalances[msg.sender] = 0;
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
          return 0x0;
        }
        //Or this
        assembly{
          result := mload(add(source, 32))
        }
    }
}