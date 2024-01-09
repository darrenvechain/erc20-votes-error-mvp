// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract TOKEN is ERC20Capped, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(
        address _defaultMinter
    ) ERC20Capped(1000000000 * 10 ** 18) ERC20("TOKEN", "TOKEN") {
        // Grant the contract deployer the default admin role
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, _defaultMinter);
    }

    /**
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - supply must not exceed cap.
     */
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    /**
     * Proxy function to get all token details in one call
     */
    function tokenDetails()
        external
        view
        returns (string memory, string memory, uint8, uint256, uint256)
    {
        return (name(), symbol(), decimals(), totalSupply(), cap());
    }
}
