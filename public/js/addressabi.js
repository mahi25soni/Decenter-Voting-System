export const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const abi = [
    {
    "inputs": [],
    "name": "netVotes",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "string",
        "name": "partyname",
        "type": "string"
        }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "string",
        "name": "partyname",
        "type": "string"
        }
    ],
    "name": "votePerParty",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    }
]