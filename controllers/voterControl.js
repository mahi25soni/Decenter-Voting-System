const bodyParser = require("body-parser");
const ethers = require("ethers");
const crypto = require("crypto");
const ejs = require("ejs");
const fs = require("fs");
const { PassThrough } = require("stream");
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
  
    data_update_voter({
      epic,
      constituency,
      public_key: wallet.address,
    });
  
    res.redirect("/voter")
  };
  
const data_update_voter = (data) => {
    const { constituency, epic, public_key } = data;
  
    let read_data_json = fs.readFileSync("voter.json", "utf-8");
  
    let json_convert;
    if (read_data_json && read_data_json.trim().length > 0) {
      json_convert = JSON.parse(read_data_json);
    } else {
      json_convert = {};
    }

    const keys_length = Object.keys(json_convert);

    const find_constituency = json_convert[constituency];
    console.log("find_constituency", find_constituency)


    if (find_constituency) {
      Object.assign(find_constituency, {
        [epic]: public_key
      })

      json_convert[constituency] = find_constituency;


      fs.writeFileSync('voter.json', JSON.stringify(json_convert), 'utf-8');
    } else {
      Object.assign(json_convert, {
        [constituency]: {
          [epic]: public_key
        }
      })

      fs.writeFileSync('voter.json', JSON.stringify(json_convert), 'utf-8');
    }
  
    return {
      json_convert,
      keys_length: keys_length.length,
    };

    // The json file in candidate.json can be saved as "data" and can be
    // excessed using
    // for key in data:
    // print(key, ":", data[key])

  };
  

const candidatePage = (req, res) =>{
  res.render("candidate")
}

const addCandidate = (req, res) => {
  const candidatename = req.body.candidatename 
  const partyname = req.body.hisparty
  const consti = req.body.constituency

  let read_data_json = fs.readFileSync("candidate.json", "utf-8");

  let json_convert;
  if (read_data_json && read_data_json.trim().length > 0) {
    json_convert = JSON.parse(read_data_json);
  } else {
    json_convert = {};
  }
  // const keys_length = Object.keys(json_convert);

  const keys_length = Object.keys(json_convert);

  const find_constituency = json_convert[consti];
  console.log("find_constituency", find_constituency)


  if (find_constituency) {
    Object.assign(find_constituency, {
      [candidatename]: partyname
    })

    json_convert[consti] = find_constituency;


    fs.writeFileSync('candidate.json', JSON.stringify(json_convert), 'utf-8');
  } else {
    Object.assign(json_convert, {
      [consti]: {
        [candidatename]: partyname
      }
    })

    fs.writeFileSync('candidate.json', JSON.stringify(json_convert), 'utf-8');
  }

  res.redirect("/candidate")

  
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