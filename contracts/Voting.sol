//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@chainlink\contracts\src\v0.8\ChainlinkClient.sol";
import "@chainlink\contracts\src\v0.8\ConfirmedOwner.sol";

contract VoterContract is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 totalVotes;
    mapping(string => uint256) partyToVote;
    string public validvoter;


    const string memory jobId = 1b387a84c15d4a7e81d9faa916080a59

    event RequestForInfoFulfilled(
        bytes32 indexed requestId,
        string indexed response
    );

    constructor(){
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x89Eb3F66f442F18302116988d0CA4ebe34455C3F);
        set
    }

        function requestInfo(
        string memory consti,
        string memory voterId
    ) public onlyOwner {
        Chainlink.Request memory req = buildOperatorRequest(
            stringToBytes32(_jobId),
            this.fulfillRequestInfo.selector
        );

        req.add("consti", number);
        req.add("voterId", voterId);
        sendOperatorRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillRequestInfo(bytes32 _requestId, string memory _info)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestForInfoFulfilled(_requestId, _info);
        validvoter = _info;
    }

    modifier isVoter{
        if (validvoter != "undefined"){
            __;
        }
    }

    
    function vote(string memory partyname) public payable isVoter{
        partyToVote[partyname] += 1;
        totalVotes++;
    }
    // This 'vote' can create decentralized, if we only access everything from front-end. We can create function for each party like 'bjpVote',
    // 'congressVote', 'aapVote'. Creating multiple function is feasible or not I don't know.

    function netVotes() public view returns(uint256){
        return totalVotes;
    }

    function votePerParty(string memory partyname) public view returns(uint256){
        return partyToVote[partyname];
    }

    
}