### Local setup

Requeriments

- docker
- node

Instructions

1. Install fabric samples from here https://hyperledger-fabric.readthedocs.io/en/latest/install.html
2. copy `setupEnv.sh` and `setupEnv2.sh` into `/fabric-samples/test-network`
3. run `./setupEnv.sh`
4. Get the Package id from the last console lines. Example: `kinto-1:ca209a456ec960fbcafa90cf3a8`
5. Open `setupEnv2.sh` and set `CC_PACKAGE_ID` with the package id from step 4. Example: `CC_PACKAGE_ID=kinto-1:ca209a456ec960fbcafa90cf3a8`
6. run `./setupEnv2.sh`

Execute queryes with the following command `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n $CONTRACT_NAME --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"queryAllFileOperations","Args":[]}'` Change **function value** from `queryAllFileOperations` to `queryAllFileOperations`
