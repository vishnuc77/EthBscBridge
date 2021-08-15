import React, { Component } from "react";
import MyTokenEthContract from "./contracts/MyTokenEth.json";
import MyTokenBscContract from "./contracts/MyTokenBsc.json";
import ERCBridgeEthContract from "./contracts/ERCBridgeEth.json";
import ERCBridgeBscContract from "./contracts/ERCBridgeBsc.json";
import getWeb3 from "./getWeb3";

import "./App.css";
const Web3 = require('web3');

class App extends Component {
  state = { web3: null, accounts: null, recipientAddress: 0x0000, numTokens: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Setting web3 instance for Ethereum and BSC separately
      const web3Eth = new Web3("https://rinkeby.infura.io/v3/e231165cabd748bab6b079a9a57c530c");
      const web3Bsc = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get MyTokenEth contract instance.
      const networkId = await web3.eth.net.getId();

      var balanceof;

      // If networkId is 4, then get contract instances in Ethereum
      if (Number(networkId) === Number(4)) {
        const deployedNetwork = MyTokenEthContract.networks[networkId];
        const myTokenEthInstance = new web3.eth.Contract(
          MyTokenEthContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        balanceof = await myTokenEthInstance.methods.balanceOf(accounts[0]).call();

        const ERCBridgeEthInstance = new web3.eth.Contract(
          ERCBridgeEthContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
      }

      // If networkId is 97, then get contract instances in BSC
      if (Number(networkId) === Number(97)) {
        const deployedNetwork = MyTokenBscContract.networks[networkId];
        const myTokenBscInstance = new web3.eth.Contract(
          MyTokenBscContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        balanceof = await myTokenBscInstance.methods.balanceOf(accounts[0]).call();
      }

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, balance: balanceof });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSendSubmit = async () => {
    const {recipientAddress} = this.state;
    const {numTokens} = this.state;
    await this.ERCBridgeEthInstance.methods.burn(recipientAddress, numTokens).send({from: this.accounts[0]});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Send ETH to BSC</h1>
        <p>The balance is: {this.state.balance}</p>
        Recipient address of BSC: <input type="text" name="recipientAddress" value={this.state.recipientAddress} onChange={this.handleInputChange} /><br/><br/>
        Number of tokens to send: <input type="text" name="numTokens" value={this.state.numTokens} onChange={this.handleInputChange} /><br/><br/>
        <button type="button" onClick={this.handleSendSubmit}>send</button>
      </div>
    );
  }
}

export default App;
