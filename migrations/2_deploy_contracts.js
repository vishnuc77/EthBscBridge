var MyTokenEth = artifacts.require("./MyTokenEth.sol");
var MyTokenBsc = artifacts.require("./MyTokenBsc.sol");
var ERCBridgeEth = artifacts.require("./ERCBridgeEth.sol");
var ERCBridgeBsc = artifacts.require("./ERCBridgeBsc.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer, network) {
  let addr = await web3.eth.getAccounts();
  if (network === 'rinkeby_infura') {
    await deployer.deploy(MyTokenEth);
    let tokenEthInstance = await MyTokenEth.deployed();
    await tokenEthInstance.mintToken(addr[0], process.env.INITIAL_TOKENS);
    await deployer.deploy(ERCBridgeEth, tokenEthInstance.address);
    let bridgeEthInstance = await ERCBridgeEth.deployed();
    tokenEthInstance.changeOwner(bridgeEthInstance.address);
  }
  if (network === 'bsc') {
    await deployer.deploy(MyTokenBsc);
    let tokenBscInstance = await MyTokenBsc.deployed();
    await deployer.deploy(ERCBridgeBsc, tokenBscInstance.address);
    let bridgeBscInstance = await ERCBridgeBsc.deployed();
    tokenBscInstance.changeOwner(bridgeBscInstance.address);
  }
};
