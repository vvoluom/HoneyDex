import React,{ Component } from 'react';

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



import Web3 from 'web3';

//Factory Contract Address Ropsten Factory = 0xd770fa5b25ce0c48ccfbd925b753322c1f69bcb3
var contractFactoryAddress = '0xd770fa5b25ce0c48ccfbd925b753322c1f69bcb3';

const withErrorHandling = WrappedComponent => ({ showError, children }) => {
  return (
    <WrappedComponent>
      {showError && <div className="error-message">Oops! Something went wrong! Install MetaMask and refresh.</div>}
      {children}
    </WrappedComponent>
  );
};

try{
var web3 = new Web3(window.web3.currentProvider);
}catch {
    //alert('HoneyDex requires MetaMask to function.');
}

const DivWithErrorHandling = withErrorHandling(({children}) => <div>{children}</div>)


const abiERC20 =
[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

const abiHoneyDex = 
[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_buyerEthAddress",
				"type": "address"
			},
			{
				"name": "_amountTarget",
				"type": "uint256"
			},
			{
				"name": "_sellerTargetCryptoAddress",
				"type": "string"
			},
			{
				"name": "_buyerTargetCryptoAddress",
				"type": "string"
			},
			{
				"name": "_jobIds",
				"type": "string[]"
			},
			{
				"name": "_oracles",
				"type": "address[]"
			}
		],
		"name": "createAgreement",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "AgreementAddress",
				"type": "address"
			}
		],
		"name": "contractDeployed",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AgreementAddressesBuyer",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AgreementAddressesSeller",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAgreementAddressesBuyer",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAgreementAddressesSeller",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const abiAgreement = [
	{
		"constant": true,
		"inputs": [],
		"name": "falseCount",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getChainlinkToken",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "trueCount",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "coinPrice",
				"type": "uint256"
			}
		],
		"name": "fullfillCoinPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "returnNewID",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "jobIds",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "marketPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getjobIds",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLinkBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "oracles",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "coinnumber",
				"type": "string"
			}
		],
		"name": "requetMarketPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellerEthAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "returnedtxid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellerTargetCryptoAddress",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amountTarget",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawLink",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "released",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getoracles",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amountEth",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "linkbalances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerEthAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerTargetCryptoAddress",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "txid",
				"type": "uint256"
			}
		],
		"name": "fulfillNodeRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "apiAddress",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "deploymentTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "tx_hash",
				"type": "string"
			}
		],
		"name": "requestConfirmations",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositLink",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_sellerEthAddress",
				"type": "address"
			},
			{
				"name": "_buyerEthAddress",
				"type": "address"
			},
			{
				"name": "_amountEth",
				"type": "uint256"
			},
			{
				"name": "_amountTarget",
				"type": "uint256"
			},
			{
				"name": "_sellerTargetCryptoAddress",
				"type": "string"
			},
			{
				"name": "_buyerTargetCryptoAddress",
				"type": "string"
			},
			{
				"name": "_jobIds",
				"type": "string[]"
			},
			{
				"name": "_oracles",
				"type": "address[]"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "success",
				"type": "bool"
			}
		],
		"name": "successNodeResponse",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "coinPrice",
				"type": "uint256"
			}
		],
		"name": "NewPriceEmiited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	}
];

function createData(operator, oracle, job) {
    return { operator, oracle, job };
};

var HoneyDex;
var ChainlinkContractAddress = '0x20fE562d797A42Dcb3399062AE9546cd06f63280';
var ChainlinkContract;
var contractAddress;
var linkFee = 1;
var linkPerOracle = 1;
export default class ContractInteraction extends React.Component {

    constructor(props){
        super(props);
        contractAddress = this.props.newHoneyDexAddress;
        linkFee = this.props.newOracleCount * linkPerOracle ;
    }

  	state ={
        HoneyDexAddress : '',
        trueCount : null,
        falseCount : null,
		ethAmount : null,
		invoice_id : '',
        sellerAddress : '',
        buyerAddress : '',
		released : false,	
		oracles : [],
        job_ids : [],
        deploymentTime : '',
		showError :false,
		loading: false,
        newHoneyDexAddress : null,
        arrayLength : null,
    };
    
    //Loader function to retrieve the data from the contract
    async loadHoneyDexContract(){
        try{
            HoneyDex = new web3.eth.Contract(abiAgreement,contractAddress);            
            await HoneyDex.methods.released().call().then(function (res) { if (res != null){this.setState({ released  : res })}}.bind(this));
            await HoneyDex.methods.trueCount().call().then(function (res) {  this.setState({ trueCount  : res })}.bind(this));
            await HoneyDex.methods.falseCount().call().then(function (res) { this.setState({ falseCount : res })}.bind(this));
            await HoneyDex.methods.sellerEthAddress().call().then(function (res) {  this.setState({ sellerEthAddress : res })}.bind(this));
            await HoneyDex.methods.sellerTargetCryptoAddress().call().then(function (res) {  this.setState({ sellerTargetAddress : res })}.bind(this));
            await HoneyDex.methods.buyerTargetCryptoAddress().call().then(function (res) {  this.setState({ buyerTargetAddress : res })}.bind(this));
            await HoneyDex.methods.buyerEthAddress().call().then(function (res) {   this.setState({ buyerEthAddress  : res })}.bind(this));
            await HoneyDex.methods.amountEth().call().then(function (res) { this.setState({ ethAmount : res })}.bind(this));
            await HoneyDex.methods.amountTarget().call().then(function (res) { this.setState({ targetAmount : res })}.bind(this));
            await HoneyDex.methods.deploymentTime().call().then(function (res) { this.setState({ deploymentTime : res })}.bind(this));
            await HoneyDex.methods.getjobIdsLength().call().then(function (res) { this.setState({ arrayLength : res })}.bind(this));
            //await HoneyDex.methods.jobIds().call().then(function (res) {  this.setState({ job_ids : this.state.job_ids.concat([res])})}.bind(this));
            //await HoneyDex.methods.oracles().call().then(function (res) {    this.setState({ oracles : res })}.bind(this));
        }
		// Non-DApp Browsers
		catch {
            this.toggleError();
		}
    }    
    
    async loadChainlinkContract(){
        try{
        ChainlinkContract  = new web3.eth.Contract(abiERC20, ChainlinkContractAddress);
        }
        // Non-DApp Browsers
        catch {
            this.toggleError();
        }
    }

    getAccounts = () =>{
        web3.eth.getAccounts().then(accounts => { 
                
            this.setState({ account: accounts[0]});
            console.log(accounts);
        
        });}

    //Loads the web3 Metamask confirmations and Checks for Events
	async loadBlockChain() {
		// Modern DApp Browsers
		if (window.ethereum) {
			web3 = new Web3(window.ethereum);
            this.getAccounts();
			try { 
				window.ethereum.enable().then(function() {
					//Set State When recieve Emission from Event from Smart Contract
                    //HoneyDex = new web3.eth.Contract(abiHoneyDex, contractAddress);
                    ChainlinkContract  = new web3.eth.Contract(abiERC20, ChainlinkContractAddress);
                    //this.setState({ HoneyDexState : HoneyDex });
				}.bind(this));
			} catch(e) {
                // User has denied account access to DApp...
                console.log(e);
			}
		}
		// Legacy DApp Browsers
		else if (window.web3) {
			web3 = new Web3(window.web3.currentProvider);
            this.getAccounts();
		}
		// Non-DApp Browsers
		else {
            this.toggleError();
		}
	}
        
	toggleError = () => {
		this.setState((prevState, props) => {
		return { showError: true }
		})
    };
    
    async componentWillMount(){
		this.loadBlockChain()
        this.loadHoneyDexContract();
        this.loadChainlinkContract();
    }
    //Function to fund the contract with LINK
    onClickFund = async (event) =>{
        try{	
            this.getAccounts();        
            ChainlinkContract.methods.transfer(
                contractAddress, 
                web3.utils.toHex(linkFee * Math.pow (10, 18))).send( {
                from: this.state.account
                }, 
                (error, txHash) => {
                console.log(txHash);
                });
        
        }catch(err){
            console.log(err)
            this.toggleError();
        }
    }


    render(){
        
        //Run this bitch
        //this.loadBlockChain();
		return(  
          <DivWithErrorHandling> 
              <h5>The contract has been successfully created on the Ethereum Ropsten testnet. ()</h5>     
          {/* <div className={classes}> */}
          <Table aria-label="simple table">
                  <TableBody>                  
                    <TableRow>
                      <TableCell align="right"><b>Contract Address</b></TableCell>
                      <TableCell align="right"> {contractAddress} </TableCell>
                    </TableRow> 
                    <TableRow>  
                    <TableCell align="right"><b>ETH</b></TableCell>    
                    <TableCell align="right"> {this.state.ethAmount} </TableCell>     
                             </TableRow>    
                    <TableRow>  
                    <TableCell align="right"><b>BTC</b></TableCell>    
                    <TableCell align="right"> {this.state.targetAmount} </TableCell>     
                             </TableRow>           
					<TableRow>             
                    <TableCell align="right"><b>Buyer ETH Address</b></TableCell>
                      <TableCell align="right"> {this.state.buyerEthAddress} </TableCell>
                             </TableRow>    
					<TableRow>             
                            <TableCell align="right"><b>Buyer BTC Address</b></TableCell>
                            <TableCell align="right"> {this.state.buyerTargetAddress} </TableCell>
                    </TableRow>    
                    <TableRow>    
                    <TableCell align="right"><b>Seller ETH Address</b></TableCell>     
                      <TableCell align="right"> {this.state.sellerEthAddress} </TableCell>
                             </TableRow>    
                    <TableRow>  
                    <TableCell align="right"><b>Seller BTC Address</b></TableCell>     
                      <TableCell align="right"> {this.state.sellerTargetAddress } </TableCell>
                             </TableRow>    
                    <TableRow>   
                    <TableCell align="right"><b>Redeemed</b></TableCell>      
                      <TableCell align="right"> {this.state.released.toString()} </TableCell>
                             </TableRow>    
                    <TableRow>
                    <TableCell align="right"><b>Created</b></TableCell>
                      <TableCell align="right"> {this.state.deploymentTime} </TableCell>
                             </TableRow>    
                    <TableRow>
                    <TableCell align="right"><b>True Checks</b></TableCell>
                      <TableCell align="right"> {this.state.trueCount} </TableCell>
                             </TableRow>    
                    <TableRow>
                    <TableCell align="right"><b>False Checks</b></TableCell>
                      <TableCell align="right"> {this.state.falseCount} </TableCell>    
                             </TableRow>    
                </TableBody>
              </Table>
              
              <h5>HoneyDex contracts use Chainlink off-chain oracles for verifying tht Bitcoin transactions have been completed. These queries are paid with LINK. For testnet purposes, 0.333 testnet LINK is required per oracle request. </h5>     
              <div>
        <Grid container  justify = "center" spacing={1} alignItems="flex-end">
              <Grid item>
              <br/>
              <Fab variant="extended" padding={5} onClick={this.onClickFund} aria-label="like">
                <NavigationIcon />
                Fuel Contract with {linkFee} LINK
              </Fab>
              </Grid>
            </Grid>            
          </div>
        </DivWithErrorHandling>
        )
    }
 }
