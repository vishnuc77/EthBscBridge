pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can perform this action");
        _;
    }

    function changeOwner(address _owner) external onlyOwner {
        owner = _owner;
    }

    function mintToken(address _account, uint256 _amount) external onlyOwner {
        _mint(_account, _amount);
    }

    function burnToken(address _account, uint256 _amount) external onlyOwner {
        _burn(_account, _amount);
    }
}
