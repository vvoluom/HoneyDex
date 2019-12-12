import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";

import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import CreditCard from "@material-ui/icons/CreditCard";
import Public from "@material-ui/icons/Public";
import SyncAlt from "@material-ui/icons/Public";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CardMedia from '@material-ui/core/CardMedia';
import banner from "assets/img/banner3.png";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

import { Card } from "rebass";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const cardStyles = {
    card: {
      margin: "120px auto 50px",
      maxWidth: 345,
      overflow: "visible",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    media: {
      margin: "0px auto 0",
      width: "90%",
      height: 156,
      // borderRadius: "4px",
      // boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
      position: "relative",
      zIndex: 1000
    }
  };

  const useCardStyles = makeStyles(cardStyles);
  const cardClasses = useCardStyles();

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 id="how" className={classes.title} style={{color:"#000"}}>How It Works</h2>
          <h5 className={classes.description}>
            HoneyDex is a smart contract deployed on the Ethereum blockchain, which creates ETH escrow smart contracts for ETH to BTC swaps. ETH is locked in a HoneyDex agreement and is only transferred to the buyer once the agreed upon BTC amount is received at the sender's BTC address. Bitcoin data is provided by a network of decentralised Chainlink oracles.
            </h5>
        {/* <CardMedia className={cardClasses.media} image={banner}/> */}
             
        </GridItem>
      </GridContainer>
      <div ><br/><br/>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Trustless"
              description="Locked up ETH is held in a newly created smart contract on the Ethereum blockchain. Bitcoin payment confirmation is queried using Chainlink's network of decentralised oracles."
              icon={Public}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="No Sign-Ups"
              description="No need to sign up with personal information or undergo KYC verification."
              icon={Fingerprint}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Interoperable"
              description="Starting off with ETH to BTC trades, HoneyDex's generic and secure cross-chain swap implementation using Chainlink allows anonymous trades between ETH and any other chain."
              icon={SyncAlt}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
