var MyTokenEth = artifacts.require("./MyTokenEth.sol");
var MyTokenBsc = artifacts.require("./MyTokenBsc.sol");
var ERCBridgeEth = artifacts.require("./ERCBridgeEth.sol");
var ERCBridgeBsc = artifacts.require("./ERCBridgeBsc.sol");
require("dotenv").config({ path: "../.env" });

module.exports = function (deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyTokenEth);
  let tokenEthInstance = await MyTokenEth.deployed();
  await tokenEthInstance.mint(addr[0], process.env.INITIAL_TOKENS);
  await deployer.deploy(ERCBridgeEth, tokenEthInstance.address);
  let bridgeEthInstance = await ERCBridgeEth.deployed();
  tokenEthInstance.changeOwner(bridgeEthInstance.address);
};
