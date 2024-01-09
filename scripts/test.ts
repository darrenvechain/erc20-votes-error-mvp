import { deployB3trToken, deployVot3Token } from "./deploy";
import Connex from '@vechain/connex'

async function main() {
    // deploy the contracts
    const token = await deployB3trToken()
    const votingToken = await deployVot3Token(await token.getAddress())

    // instantiate thor for solo network
    const thor = new Connex.Thor({
        node: 'http://localhost:8669',
        // the genesis block of your private network
        network: {
            number: 0,
            id: "0x00000000c05a20fbca2bf6ae3affba6af4a74b800b585bf7a4988aba7aea69f6",
            size: 170,
            parentID:
                "0xffffffff53616c757465202620526573706563742c20457468657265756d2100",
            timestamp: 1530316800,
            gasLimit: 10000000,
            beneficiary: "0x0000000000000000000000000000000000000000",
            gasUsed: 0,
            totalScore: 0,
            txsRoot:
                "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
            txsFeatures: 0,
            stateRoot:
                "0x93de0ffb1f33bc0af053abc2a87c4af44594f5dcb1cb879dd823686a15d68550",
            receiptsRoot:
                "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
            signer: "0x0000000000000000000000000000000000000000",
            isTrunk: true,
            transactions: [],
        }
    })
    console.log(thor);

    // simulate test and call the explain method
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
