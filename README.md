<div align="center">

  <img src="assets/logo.png" alt="logo" width="200" height="auto" />
  <h1>Kinto Storage Contract</h1>
  
  <h5>
    UADE Informatics Engineering thesis project - 2022   
  </h5>

  <p>
    Kinto hyperledger blockchain contract for storage operations 
  </p>
   
<h4>
    <a href="https://github.com/K-nto/Kinto-storage-contract/">Documentation</a>
  <span> · </span>
    <a href="https://github.com/K-nto/Kinto-storage-contract/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/K-nto/Kinto-storage-contract/issues/">Request Feature</a>
  </h4>
</div>

<br />

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)
  - [Deployment](#triangular_flag_on_post-deployment)
- [Usage](#eyes-usage)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

## :star2: About the Project

### :space_invader: Tech Stack

  <ul>
    <li><a href="https://nodejs.org/">Node</a></li>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://www.hyperledger.org/use/fabric">Hyperledger fabric</a></li>
    <li><a href="https://www.docker.com/">Docker</a></li>
  </ul>

### :dart: Features

- Create WRITE, READ, DELETE, SHARE transactions in the blockchain
- Fetch existing blocks for a specific wallet

## :toolbox: Getting Started

### :bangbang: Prerequisites

This project uses node and npm as package manager, make sure it is installed

```bash
 node -v
 npm -v
```

### :running: Run Locally

Clone the project

```bash
  git clone https://github.com/K-nto/Kinto-storage-contract.git
```

Go to the project directory

```bash
  cd Kinto-storage-contract
```

Install dependencies

```bash
  npm install
```

Compile

```bash
  npm run build
```

Start

```bash
  npm run start
```

### :triangular_flag_on_post: Deployment

To deploy this contract into hyperledger blockchain head to `scripts/SETUP_LOCAL.md` for further instructions

## :eyes: Usage

Once the contract is deployed into the blockchain. With the proper security configurations, these are the available querys

- Initialize storage ledger

```json
{"function": "initLedger", "Args": []}
```

- get all file operations

```json
{"function": "queryAllFileOperations", "Args": []}
```

- create a transaction

```json
{"function": "createFileOperation", "Args": ["FILEHASH_1", "WALLET_1", "WRITE"]}
```

- Modify operation

```json
{"function": "modifyFile", "Args": ["TRANSACTION_ID", "FILE_HASH"]}
```

**Example** Using [hyperledger fabric Peer Cli](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) on a test network

```bash
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n $CONTRACT_NAME --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"createFileOperation","Args":["FILEHASH_2", "WALLET_2", "READ"]}'
```

**Example** Using typescript

```javascript
import {contract} from '@hyperledger/fabric-gateway';

// You need to connect to the network and generate a gateway connection

//Execute transaction
const transactionResultBytes = await contract.evaluateTransaction(
  'createFileOperation',
  'FILEHASH_2',
  'WALLET_2',
  'READ'
);

const resultJson = new TextDecoder().decode(transactionResultBytes);
```

## :warning: License

Distributed under the no License. See LICENSE.txt for more information.

<!-- Contact -->

## :handshake: Contact

Federico Javier Parodi - Fedejp - [@linkedin_handle](https://www.linkedin.com/in/fedejp) [@github_handle](https://github.com/Fedejp)

Carlos Santiago Yanzon - Bizk - [@linkedin_handle](https://www.linkedin.com/in/carlos-santiago-yanzon/) [@github_handle](https://github.com/bizk)

Project Link: [https://github.com/K-nto](https://github.com/K-nto)

## :gem: Acknowledgements

We thank and aknowledge the authors of these resources for their work.

- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#travel--places)
- [Readme Template](https://github.com/othneildrew/Best-README-Template)
