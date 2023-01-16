import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import whilelist from "./whitelist.json"  assert { type: "json" };

const getLeafNodes = (addresses) => {
    return addresses.map((address) =>
        keccak256(address)
    );
};

const getProof = (address) => {
    const leafNodes = getLeafNodes(whilelist);
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

    const leaf = keccak256(address);
    const proof = merkleTree.getHexProof(leaf);
    console.log("PROOF", proof);
    return proof;
};

getProof("0x232d31Edd7C8886A64121EF3a9A3Ed24eEd0b104");
