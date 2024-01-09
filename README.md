## OVERVIEW

There are two contracts:

- TOKEN: an ERC20 token, anyone can mint tokens
- VOTING_TOKEN: an extension of ERC20Votes that is used in Governance contracts to track voting power and delegate votes

To obtain the VOTING_TOKEN a user must first mint TOKEN, then call the `stake` function of the VOTING_TOKEN to swap TOKEN with VOTING_TOKEN at a 1:1 ratio. To get TOKEN back, the user must call the `unstake` function of the VOTING_TOKEN.

## PROBLEM

On Ethereum (tested on goerli and hardhat local network), I can stake and unstake in the following block without any problems. On vechain instead I need to wait at least 10 seconds from the previous operation otherwise the unstake fails and the transaction reverts.

## STEPS TO REPRODUCE

Test runs on hardhat local network:

```
npx hardhat test --network hardhat

```

Test fails on vechain:

```
npx hardhat test

```
