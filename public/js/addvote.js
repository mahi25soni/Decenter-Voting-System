import { ethers } from "../ethers-5.2.umd.min.js"
import { abi , address } from "./constant.js"


const connectButton = document.getElementById("connectButton")
const voteButton = document.getElementById("voteButton")
const checkButton = document.getElementById("checkButton")
const netVoteButton = document.getElementById("getNetVotes")


connectButton.onclick = connect
voteButton.onclick = voting
checkButton.onclick = checking
netVoteButton.onclick = netVote

async function connect(){
    if(typeof window.ethereum !== "undefined"){
        await ethereum.request({ method: 'eth_requestAccounts' });
        connectButton.innerHTML = "Connected";
    }
    else{
        connectButton.innerHTML = "Create A Metamask Account";
    }
}

async function voting() {
    const votingParty = document.getElementById("partynameforvoting").value
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const mycontract = new ethers.Contract(address, abi, signer)
        const voted = await mycontract.vote(votingParty) 
    }

}

async function checking(){
    const checkingParty = document.getElementById("partynameforchecking").value 
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const mycontract = new ethers.Contract(address, abi, signer)
        const perparty = await mycontract.votePerParty(checkingParty) 
        console.log(perparty.toString())
    }

}

async function netVote(){
    if(typeof window.ethereum !== "undefined"){
        console.log("eefsdf")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const mycontract = new ethers.Contract(address, abi, signer)
        const total = await mycontract.netVotes() 
        console.log(total.toString())
    }
}
