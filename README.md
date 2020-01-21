## Abstract
Ethereum based smart contracts have no way to communicate with outside data which makes them limited in the ability to verify the information that is being given to them. The Chainlink network provides a reliable tamper-proof way to input and retrieve data from these smart contracts. Using this new technology HoneyDex was created with the purpose of trading ETH for Bitcoin and vice versa without having to trust either party or a centralised provider. All the transactions are done through the smart contract and the Bitcoin transaction verifications are done by Chainlink's decentralised oracles. This concept is taken from LinkPal to cater for direct Crypto Currency transactions.

## Introduction
This project was done as a hackathon submission for the [Honeycomb smart contract hackathon](https://honeycomb.devpost.com/) where it was awarded a Judges Choice award. The problem that is solved by HoneyDex is the "Who goes first" problem while transacting digital goods online during Peer-to-Peer trading. It also removes having to trust a centralised authority to facilitate your data and payments. This solution uses HoneyComb's API to parse Bitcoin transactions while trading ETH for Bitcoin.

## Background
# Ethereum
[Ethereum](https://ethereum.org/) is a decentralised platform for smart contracts built using blockchain technology. It is currently run using a Proof of Work (POW) consensus mechanism where transactions are confirmed by miners solving cryptographic hashes to gain rewards. ETH is a cryptocurrency which is used to deploy, trade and run functions on the platform.

# Smart Contracts
Smart Contracts provide the ability to execute tamper-proof digital agreements, which are considered highly secure and highly reliable. Smart contracts on the Ethereum Blockchain are coded using the programming language [Solidity](https://solidity.readthedocs.io/en/v0.6.1/) which is high-level and object-oriented.

# Chainlink
[Chainlink](https://chain.link/) facilitates the retrieval of reliable and tamper-proof information from and to smart contracts. It does this in a decentralised way by sending and retrieving information from multiple nodes. The data that is received by the majority of the nodes is what the smart contract agrees on as the correct data. Chainlink uses LINK tokens as their cryptocurrency to execute data transactions on their nodes.

# Metamask
[Metamask](https://metamask.io/) is a bridge that allows you to visit the distributed web of tomorrow in your browser today. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.

# Bitcoin
Bitcoin is a digital currency created in January 2009. It follows the ideas set out in a [whitepaper](https://bitcoin.org/bitcoin.pdf) by the mysterious and pseudonymous developer Satoshi Nakamoto, whose true identity has yet to be verified. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and is operated by a decentralized authority, unlike government-issued currencies.

# Honeycomb
[Honeycomb](https://honeycomb.market/) is a venture of CLC Group - a network of professional services and technological solutions focused on facilitating the 4th industrial revolution powered by smart contracts.

## Methodology
# Smart Contract
The design utilized was the Factory Method where the factory produces agreements containing all the necessary functions, details and funds to make the exchange happen. A Seller would need to enter the amount of ETH they are going to sell for the amount of BTC they want to receive, the Seller's and Buyer's Bitcoin Addresses,the Ethereum Address of the Buyer and finally the Chainlink Oracle Nodes and their Job Id's. All of this can be seen in the picture of the form below.