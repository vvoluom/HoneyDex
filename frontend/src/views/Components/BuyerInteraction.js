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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



import Web3 from 'web3';

//Factory Contract Address Ropsten Factory = 0xd770fa5b25ce0c48ccfbd925b753322c1f69bcb3
var contractFactoryAddress = '0x2F38fF4EB8a354d7f4cBd10956C6acb1880DA4a0';

const coinrankingJob = "83c040f342b143f5ad760308c285fbf9";
const coinrankingOracle = "0x4a3fbbb385b5efeb4bc84a25aaadcd644bd09721";
const coinrankingETHID ="2";
const coinrankingTargetID = "1";

const withErrorHandling = WrappedComponent => ({ showError, children }) => {
  return (
    <WrappedComponent>
      {showError && <div className="error-message">Oops! Something went wrong! Install MetaMask and refresh.</div>}
      {children}
    </WrappedComponent>
  );
};


//var web3 = new Web3();
//const web3 = new Web3(window.web3.currentProvider); //Use provider from MetaMask
var web3;

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
		"constant": false,
		"inputs": [
			{
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"name": "coinPrice",
				"type": "int256"
			}
		],
		"name": "fullfillCoinPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "coinnumber",
				"type": "string"
			},
			{
				"name": "_oracle",
				"type": "address"
			},
			{
				"name": "_jobId",
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
		"constant": false,
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"type": "int256"
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
		"name": "marketPrice",
		"outputs": [
			{
				"name": "",
				"type": "int256"
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
	}
];



function createData(operator, oracle, job) {
	return { operator, oracle, job };
};

var HoneyDexFactory;
var HoneyDex;
var ChainlinkContractAddress = '0x20fE562d797A42Dcb3399062AE9546cd06f63280';
var ChainlinkContract;
var contractAddress;
var linkFee = 1;
var linkPerOracle = 1;

export default class ContractInteraction extends React.Component {

	state ={
		currentContract : '',
        HoneyDexAddress : '',
        trueCount : null,
        falseCount : null,
		ethAmount : null,
		invoice_id : '',
        sellerAddress : '',
        buyerAddress : '',
		released : false,	
		oracles : [],
		coinPrices : [],
        job_ids : [],
        deploymentTime : '',
		showError :false,
		loading: false,
		newHoneyDexAddress : null,
		arrayLength : null,
    };
	
    //Loader function to retrieve the data from the contract
	loadHoneyDexContract = async (event) => {
        try{
			HoneyDex = new web3.eth.Contract(abiAgreement, this.state.currentContract);
			
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
			linkFee = this.state.arrayLength * linkPerOracle;
			console.log("UPDATED LINKFEE : " + linkFee);
        }
		// Non-DApp Browsers
		catch {
            this.toggleError();
		}
	} 
	   
	/*
	//Loader function to retrieve the data from the contract
	loadOracleJobs = async (event) => {
        try{
			HoneyDex = new web3.eth.Contract(abiHoneyDex, this.state.currentContract);
			linkFee = this.state.arrayLength * linkPerOracle;
			console.log(this.state.arrayLength);
			for (let i = 0; i < this.state.arrayLength; i++) {
					var tempOracle = '';
					var tempJob = '';

					await HoneyDex.methods.oracles(i).call().then(function (res) { tempOracle =  res });
					await HoneyDex.methods.jobIds(i).call().then(function (res) { tempJob =  res });
					console.log("ANOTHER ONE ");
					console.log(tempOracle);
					console.log(tempJob);

					this.state.oracles.concat([tempOracle]);
					this.state.job_ids.concat([tempJob]);
			}
			console.log("LOOK AT ME PICKLED DICK");
			console.log(this.state.oracles);
			console.log(this.state.job_ids);
        }
		// Non-DApp Browsers
		catch {
            this.toggleError();
		}
    }    
	*/

    async loadChainlinkContract(){
        try{
        	ChainlinkContract  = new web3.eth.Contract(abiERC20, ChainlinkContractAddress);
        }
        // Non-DApp Browsers
        catch {
            this.toggleError();
        }
    }
    
    //Loads the web3 Metamask confirmations and Checks for Events
	async loadBlockChain() {
		// Modern DApp Browsers
		if (window.ethereum) {
			web3 =  new Web3(window.ethereum);
			this.getAccounts();
			try { 
				window.ethereum.enable().then(function() {
					//Set State When recieve Emission from Event from Smart Contract
                    HoneyDex = new web3.eth.Contract(abiHoneyDex, contractAddress);
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
	getAccounts = () =>{
		web3.eth.getAccounts().then(accounts => { 
				
			this.setState({ account: accounts[0]});
			console.log(accounts);
		
		});}
	
	onClickFund = async (event) =>{
		try{	
			this.getAccounts();
			console.log('CHECK THIS CONSOLE')
			ChainlinkContract.methods.transfer(
				HoneyDex.options.address, 
				web3.utils.toHex(linkFee * Math.pow (10, 18))).send( {
				   from: this.state.account
				 }, 
				(error, txHash) => {
					console.log(error);
				  console.log(txHash);
				});
				
		}catch(err){
			console.log(err)
			this.toggleError();
		}
	}
	
	//This should run the confirmations to see if the bitcoin payment was done.
	onClickConfirmPaid = async (event) =>{
		try{	
			this.getAccounts();
			HoneyDex.methods.requestConfirmations(this.state.targetPaymentTransaction).send({
					from: this.state.account
				}, 
				(error, txHash) => {
				  console.log(error);
				  console.log(txHash);
				});
		}catch(err){
			console.log(err)
			this.toggleError();
		}
	}
	
	//This should withdraw the Ethereum
	onWithDrawETH = async (event) =>{
			try{	
				this.getAccounts();
				HoneyDex.methods.withdrawETH().send({
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
	
	//This should withdraw the Ethereum
	onCheckPrice = async (event) =>{
			try{	
				this.getAccounts();

				HoneyDex.methods.requetMarketPrice(coinrankingTargetID,coinrankingOracle,coinrankingJob).send({
					from: this.state.account
				}, 
				(error, txHash) => {
				  console.log(txHash);

				});

				HoneyDex.methods.requetMarketPrice(coinrankingETHID,coinrankingOracle,coinrankingJob).send({
					from: this.state.account
				}, 
				(error, txHash) => {
				  console.log(error);
				  console.log(txHash);
				});

				HoneyDex.events.NewPriceEmiited(function(error, result){
					if (!error){
						
						var coinPrices = this.state.coinPrices;
						coinPrices.push(result.returnValues.coinPrice);

						coinPrices.sort((a, b) => a - b)  
												
						this.setState({ coinPrices: coinPrices });
						
						// this.props.toggleNextEnabled();
					} else {
						console.log(error);
					}
					
				}.bind(this));

			}catch(err){
				console.log(err);
				this.toggleError();
			}
	}

	//This should withdraw the LINK
	onWithDrawLINK = async (event) =>{
		try{	
			this.getAccounts();
			HoneyDex.methods.withdrawLink().send({
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

	toggleError = () => {
		this.setState((prevState, props) => {
		return { showError: true }
		})
    };
    
	async componentDidMount() {
		//this.loadBlockChain()
	}
	
    async componentWillMount(){
		this.loadBlockChain();
        this.loadChainlinkContract();
	}

    render(){
		return(  
          <DivWithErrorHandling showError={this.state.showError}>      
          <h5>View HoneyDex contract details by address: </h5>
		  {/* <div className={classes}> */}
			<div >
				<Grid container  justify = "center" spacing={1} alignItems="flex-end">
				<Grid item> 
				<TextField
					onChange ={event => this.setState({ currentContract: event.target.value})}
					id="filled-textarea"
					label="HoneyDex Contract Address"
					placeholder="eg. 0xae9b2cf719bf30f8024d29aae341dcb5e581b491"
					multiline
					style = {{width: 525}}
					margin="normal"
					variant="filled"
					/>
				</Grid>
				</Grid>          
			</div>
			<div >
				<Grid container  justify = "center" spacing={1} alignItems="flex-end">
					<Grid item>
					<br/>
					<Fab variant="extended" padding={5} onClick={this.loadHoneyDexContract} aria-label="like">
					<NavigationIcon />
						Load Selected Contract
					</Fab>
					</Grid>
				</Grid>  
			</div>
			<div>
			<Table aria-label="simple table">
                  <TableBody>                  
                    <TableRow>
                      <TableCell align="left"><b>Contract Address</b></TableCell>
                      <TableCell align="left"> {contractAddress} </TableCell>
                    </TableRow> 
                    <TableRow>  
                    <TableCell align="left"><b>ETH</b></TableCell>    
                    <TableCell align="left"> {this.state.ethAmount} </TableCell>     
                             </TableRow>    
                    <TableRow>  
                    <TableCell align="left"><b>BTC</b></TableCell>    
                    <TableCell align="left"> {this.state.targetAmount} </TableCell>     
                             </TableRow>           
					<TableRow>             
                    <TableCell align="left"><b>Buyer ETH Address</b></TableCell>
                      <TableCell align="left"> {this.state.buyerEthAddress} </TableCell>
                             </TableRow>    
					<TableRow>             
                            <TableCell align="left"><b>Buyer BTC Address</b></TableCell>
                            <TableCell align="left"> {this.state.buyerTargetAddress} </TableCell>
                    </TableRow>    
                    <TableRow>    
                    <TableCell align="left"><b>Seller ETH Address</b></TableCell>     
                      <TableCell align="left"> {this.state.sellerEthAddress} </TableCell>
                             </TableRow>    
                    <TableRow>  
                    <TableCell align="left"><b>Seller BTC Address</b></TableCell>     
                      <TableCell align="left"> {this.state.sellerTargetAddress } </TableCell>
                             </TableRow>    
                    <TableRow>   
                    <TableCell align="left"><b>Redeemable</b></TableCell>      
                      <TableCell align="left"> {this.state.released.toString()} </TableCell>
                             </TableRow>    
                    <TableRow>
                    <TableCell align="left"><b>Created</b></TableCell>
                      <TableCell align="left"> {this.state.deploymentTime} </TableCell>
                             </TableRow>    
                    <TableRow>
                    <TableCell align="left"><b>True Checks</b></TableCell>
                      <TableCell align="left"> {this.state.trueCount} </TableCell>
                             </TableRow>    
                    <TableRow>
                    <TableCell align="left"><b>False Checks</b></TableCell>
                      <TableCell align="left"> {this.state.falseCount} </TableCell>    
					</TableRow> 
                    <TableRow>
                    <TableCell align="left"><b>Sale ETH/BTC Price</b></TableCell>
                      <TableCell align="left"> {this.state.ethAmount/(this.state.targetAmount*0.00000001)} ETH per BTC </TableCell>    
					</TableRow> 
					<TableRow>
                    <TableCell align="left"><b>Market ETH/BTC Price</b></TableCell>
                      <TableCell align="left"> {this.state.coinPrices.length > 1 ? <p>{ this.state.coinPrices[this.state.coinPrices.length-1]/this.state.coinPrices[0]} ETH per BTC  </p>  : null }  </TableCell>    
					</TableRow> 			
						
                </TableBody>
              </Table>
			  <Grid container  justify = "center" spacing={1} alignItems="flex-end">
						<Grid item> 
						<TextField
							onChange ={event => this.setState({ targetPaymentTransaction: event.target.value})}
							id="filled-textarea"
							label="Enter BTC Payment TX ID"
							placeholder="eg. 3fcce8cf6a299a45793b3cfe..."
							multiline
							style = {{width: 430}}
							margin="normal"
							variant="filled"
							/>
						</Grid>
						</Grid>		
			</div>
			<div>
				<Grid container  justify = "center" spacing={1} alignItems="flex-end">
				<Grid item>
					<br/>
					<Fab variant="extended" padding={5} onClick={this.onClickFund} aria-label="like">
					<NavigationIcon />
					Deposit LINK
					</Fab>
					</Grid>
					<Grid item>
					<br/>
					<Fab variant="extended" padding={5} onClick={this.onWithDrawETH} aria-label="like">
					<NavigationIcon />
					Redeem ETH
					</Fab>
					</Grid>
					<Grid item>
					<br/>
					<Fab variant="extended" padding={5} onClick={this.onWithDrawLINK} aria-label="like">
					<NavigationIcon />
					Withdraw LINK
					</Fab>
					</Grid>
					<Grid item>
					<br/>
					<Fab variant="extended" padding={5} onClick={this.onClickConfirmPaid} aria-label="like">
					<NavigationIcon />
					Query Oracles
					</Fab>
					</Grid>
					<Grid item>
					<br/>
					<Fab variant="extended" padding={5} onClick={this.onCheckPrice} aria-label="like">
					<NavigationIcon />
					Query ETH/BTC Price
					</Fab>
					</Grid>
				</Grid>            
			</div>
        	</DivWithErrorHandling>
        )
    }
 }