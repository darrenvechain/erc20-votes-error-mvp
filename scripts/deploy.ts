import { ethers } from "hardhat";
import { TOKEN, VOTING_TOKEN } from "../typechain-types";

const DEFAULT_MINTER = "0x0E1DbabfeB875E76C3a365174bcc06ae7286Be31" //1st account

async function main() {

  // Deploy the contracts
  const token = await deployB3trToken()
  const votingToken = await deployVot3Token(await token.getAddress())

}


export async function deployB3trToken(): Promise<TOKEN> {
  console.log(`Deploying B3tr contract`)
  const B3trContract = await ethers.getContractFactory("TOKEN") // Use the global variable
  const contract = await B3trContract.deploy(DEFAULT_MINTER)

  await contract.waitForDeployment()

  console.log(`B3tr contract deployed at address ${await contract.getAddress()}`)

  return contract
}

export async function deployVot3Token(b3trAddress: string): Promise<VOTING_TOKEN> {
  console.log(`Deploying Vot3 contract`)
  const Vot3Contract = await ethers.getContractFactory("VOTING_TOKEN") // Use the global variable
  const contract = await Vot3Contract.deploy(b3trAddress)

  await contract.waitForDeployment()

  console.log(`Vot3 contract deployed at address ${await contract.getAddress()}`)

  return contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
