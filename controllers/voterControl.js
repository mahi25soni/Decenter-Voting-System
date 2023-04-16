const bodyParser = require("body-parser");
const ethers = require("ethers");
const crypto = require("crypto");
const ejs = require("ejs");
const fs = require("fs");
// const { abi, address } = require("../public/js/addressabi")


const homePage = (req, res) =>{
  res.render("home")
}

const voterPage = (req, res)=>{
    res.render("voter");
}

const addVoter = (req, res) =>{
    const epic = req.body.voterid;
    const phonenumber = req.body.mobileno;
    const constituency = req.body.yoursconst;
  
    var privateKey =  crypto.randomBytes(32).toString("hex")
    // We will send this private key to the candidate using their phone number.
  
    var wallet = new ethers.Wallet("0x"+privateKey);
  
    data_update({
      epic,
      constituency,
      public_key: wallet.address,
    });
  
    res.send(req.body);
  };
  
const data_update = (data) => {
    const { constituency, epic, public_key } = data;
  
    const read_data_json = fs.readFileSync("data.json", "utf-8");
  
    const json_convert = read_data_json ? JSON.parse(read_data_json) : {};
  
    const keys_length = Object.keys(json_convert);
  
    if (keys_length.length) {
      const find_constituency = json_convert[constituency];
  
      if (find_constituency) {
        Object.assign(find_constituency, {
          [epic]: public_key
        })
  
        json_convert[constituency] = find_constituency;
  
  
        fs.writeFileSync('data.json', JSON.stringify(json_convert), 'utf-8');
      } else {
        Object.assign(json_convert, {
          [constituency]: {
            [epic]: public_key
          }
        })
  
        fs.writeFileSync('data.json', JSON.stringify(json_convert), 'utf-8');
      }
    }
  
    return {
      json_convert,
      keys_length: keys_length.length,
    };
  };
  

const candidatePage = (req, res) =>{
  res.render("candidate")
}

const addCandidate = (req, res) => {

}

const votePage = (req, res) => {
  const list = [
    ["rahul", "bjp"],
    ["mahi", "bjp"],
    ["nisha", "bjp"],
    ["ravi", "bjp"],
    ["shubh", "bjp"],
    ["aditya", "bjp"],
    ["abhisek", "bjp"],
    ["bhavuk", "bjp"],
]
  res.render("vote", {"list":list})
}

const finalStep = (req, res) =>{
    console.log(req.body)
    res.send("skdfhhk")
}
module.exports = {
    homePage, voterPage, addVoter, candidatePage, addCandidate, votePage, finalStep
}