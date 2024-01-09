import { ethers } from "hardhat";
import { TOKEN, VOTING_TOKEN } from "../typechain-types";

const DEFAULT_MINTER = "0x0E1DbabfeB875E76C3a365174bcc06ae7286Be31" //1st account

async function main() {

  // Deploy the contracts
  const token = await deployTokenToken()
  const votingToken = await deployVotingTokenToken(await token.getAddress())

}


export async function deployTokenToken(): Promise<TOKEN> {
  console.log(`Deploying Token contract`)
  const TokenContract = await ethers.getContractFactory("TOKEN") // Use the global variable
  const contract = await TokenContract.deploy(DEFAULT_MINTER)

  await contract.waitForDeployment()

  console.log(`Token contract deployed at address ${await contract.getAddress()}`)

  return contract
}

export async function deployVotingTokenToken(TokenAddress: string): Promise<VOTING_TOKEN> {
  console.log(`Deploying VotingToken contract`)
  const VotingTokenContract = await ethers.getContractFactory("VOTING_TOKEN") // Use the global variable
  const contract = await VotingTokenContract.deploy(TokenAddress)

  await contract.waitForDeployment()

  console.log(`VotingToken contract deployed at address ${await contract.getAddress()}`)

  return contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
