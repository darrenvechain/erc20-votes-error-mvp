// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// VOTING_TOKEN contract
contract VOTING_TOKEN is ERC20Votes, AccessControl {
    IERC20 public token;
    bool public canTransfer = false;

    modifier transferEnabled() {
        require(canTransfer, "Transfers disabled");
        _;
    }

    constructor(
        address _token
    ) ERC20("VOTING_TOKEN", "VOTING_TOKEN") ERC20Permit("VOTING_TOKEN") {
        // Grant the contract deployer the default admin role
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        token = IERC20(_token);
    }

    function setCanTransfer(
        bool _canTransfer
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        canTransfer = _canTransfer;
    }

    function stake(uint256 amount) external {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        _mint(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient VotingToken Tokens"
        );
        _burn(msg.sender, amount);
        require(token.transfer(msg.sender, amount), "Transfer failed");
    }

    function transfer(
        address to,
        uint256 value
    ) public override(ERC20) transferEnabled returns (bool) {
        return super.transfer(to, value);
    }

    function approve(
        address spender,
        uint256 value
    ) public override(ERC20) transferEnabled returns (bool) {
        return super.approve(spender, value);
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public override(ERC20) transferEnabled returns (bool) {
        return super.transferFrom(from, to, value);
    }
}
