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
// var contractFactoryAddress = '0x42ae2b89472aa0c5085eaaf6a3efdb261a33e68e';
var contractFactoryAddress = '0x021012d534b0fF59E524339245C19f0a7eB0D7CE';

const rows = [
	createData('Simply', '0x0D31C381c84d94292C07ec03D6FeE0c1bD6e15c1', 'afc6b2cf33f04bd3a355839e23335b34'),
	createData('Honeycomb', '0x4a3fbbb385b5efeb4bc84a25aaadcd644bd09721', '9e4ac334bca643389460f47076f43a8b'),
	createData('Chainlink', '0xc99B3D447826532722E41bc36e644ba3479E4365', '3cff0a3524694ff8834bda9cf9c779a1'),
	createData('LinkPool', '0x83f00b902cbf06e316c95f51cbeed9d2572a349a', 'c179a8180e034cf5a341488406c32827'),
];

const withErrorHandling = WrappedComponent => ({ showError, children }) => {
  return (
    <WrappedComponent>
      {showError && <div className="error-message">Oops! Something went wrong! Install MetaMask or try again.</div>}
      {children}
    </WrappedComponent>
  );
};


//var web3 = new Web3();
//const web3 = new Web3(window.web3.currentProvider); //Use provider from MetaMask
var web3;

const DivWithErrorHandling = withErrorHandling(({children}) => <div>{children}</div>)



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
]

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

var HoneyDexFactory;


export default class ContractInteraction extends React.Component {
	  	
	state ={
		account : '',
		eth_amount: null,
		invoice_id: '',
		eth_address: '',
		options:[],	
		oracles : [],
		job_ids : [],
		oracleCount: 0,
		showError:false,
		loading: false,
		createDisabled: false,
		createBtnMessage: 'Submit contract',
		newHoneyDexAddress: null
	};
	
	
 getAccounts = () =>{
	web3.eth.getAccounts().then(accounts => { 
			
		this.setState({ account: accounts[0]});
		console.log(accounts);
	
	});}

	//Loads the web3 Metamask confirmations and Checks for Events
	async loadBlockChain() {
		//this.props.toggleNextEnabled();
	
		// Modern DApp Browsers
		if (window.ethereum) {
			web3 = new Web3(window.ethereum);
			try { 
				window.ethereum.enable().then(function() {
				this.getAccounts();

					//Set State When recieve Emission from Event from Smart Contract
					HoneyDexFactory = new web3.eth.Contract(abiHoneyDex, contractFactoryAddress);

					HoneyDexFactory.events.contractDeployed(function(error, result){
						if (!error){
							
							var HoneyDexAddress = result.returnValues.AgreementAddress;
							this.setState({ newHoneyDexAddress: HoneyDexAddress });
							this.props.createHandler(HoneyDexAddress,this.state.oracleCount);
							// this.props.toggleNextEnabled();
						} else {
							console.log(error);
						}
						
					}.bind(this));
				}.bind(this));	
			} catch(e) {
			// User has denied account access to DApp...
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

	handleChangeChk(e) {
		// current array of options
		const options = this.state.options
		let index

		// check if the check box is checked or unchecked
		if (e.target.checked) {
		// add the numerical value of the checkbox to options array
		options.push(+e.target.value)
		} else {
		// or remove the value from the unchecked checkbox from the array
		index = options.indexOf(+e.target.value)
		options.splice(index, 1)
		}
		
		// update the state with the new array of options
		this.setState({ options: options })
	}

	async componentWillMount() {
		this.loadBlockChain()
	}

	
	onSubmit = async (event) =>{
		var oracles = []
		var job_ids = []
		for (let i = 0; i < this.state.options.length; i++) {
				oracles.push(rows[this.state.options[i]].oracle);
				job_ids.push(rows[this.state.options[i]].job);
		}		

		event.preventDefault();
		this.setState({ oracleCount: oracles.length, loading: true, errorMessage: ''});

		try{	
			console.log('Get all accounts')
			console.log('CHECK THIS CONSOLE')
			this.setState({ loading: false, createDisabled:true, createBtnMessage:'Processing...'});
			await HoneyDexFactory.methods.createAgreement(this.state.eth_address, this.state.btc_amount,this.state.seller_btc_address,this.state.buyer_btc_address, job_ids, oracles).send({from:this.state.account,value:web3.utils.toWei(this.state.eth_amount,'ether')});
			
		}catch(err){
			console.log(err)
			this.toggleError();
		}

			// this.setState({createBtnMessage:'Complete'});
		// const accounts = await web3.eth.getAccounts();
		// const driverCd = await factory.methods.getDeployedContract(this.state.driver).call();
	}

    render(){
		return(  
          <DivWithErrorHandling showError={this.state.showError}>      
          <h5>Enter the details required for creating a HoneyDex contract: </h5>
          {/* <div className={classes}> */}
          <div >
            <Grid container  justify = "center" spacing={1} alignItems="flex-end">
              <Grid item>
              <TextField
                  onChange ={event => this.setState({ eth_amount: event.target.value})}
                  id="filled-textarea"
                  label="ETH Amount"
                  placeholder="eg. 12.34"
                  multiline
                  style = {{width: 430}}
                  margin="normal"
                  variant="filled"
                />
              </Grid>
            </Grid>            
          </div>
          <div >
            <Grid container  justify = "center" spacing={1} alignItems="flex-end">
              <Grid item>
              <TextField
                  onChange ={event => this.setState({ btc_amount: event.target.value})}
                  id="filled-textarea"
                  label="BTC Amount To Receive"
                  placeholder="eg. 1.234"
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
              <TextField
                  onChange ={event => this.setState({ eth_address: event.target.value})}
                  id="filled-textarea"
                  label="Buyer ETH Address"
                  placeholder="eg. 0xA1B2C3D4E5F6G..."
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
              <TextField
                  onChange ={event => this.setState({ seller_btc_address: event.target.value})}
                  id="filled-textarea"
                  label="Your BTC Address to receive BTC"
                  placeholder="eg. 147SwRQd..."
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
              <TextField
                  onChange ={event => this.setState({ buyer_btc_address: event.target.value})}
                  id="filled-textarea"
                  label="Buyer's BTC Address"
                  placeholder="eg. 147SwRQd..."
                  multiline
                  style = {{width: 430}}
                  margin="normal"
                  variant="filled"
                />
              </Grid>
            </Grid>            
          </div>	          
          <div>
          <h5>Select 1 or more Chainlink data providers: </h5>
            <Grid container  justify = "center" spacing={1} alignItems="flex-end">
              <Grid item>
                
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                  <TableCell></TableCell>
                    <TableCell><b>Operator</b></TableCell>
                    <TableCell align="center"><b>Oracle</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row,index) => (                    
                    <TableRow>
                        <TableCell padding="checkbox">
                        <Checkbox value={index} onChange={event => this.handleChangeChk(event)}  />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.operator}
                      </TableCell>
                      <TableCell align="center">{row.oracle}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Grid>
            </Grid>            
          </div>
          <div>
            <Grid container  justify = "center" spacing={1} alignItems="flex-end">
              <Grid item>
              <br/>
              <Fab variant="extended" padding={5} 
                disabled={this.state.createDisabled} onClick={this.onSubmit} aria-label="like">
                <NavigationIcon />
                {this.state.createBtnMessage}
              </Fab>
              </Grid>
            </Grid>            
          </div>
		</DivWithErrorHandling>
        )
    }
 }