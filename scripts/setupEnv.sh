export CONTRACT_PATH=../../../Kinto-storage-contract/
export CONTRACT_NAME=kinto

./network.sh down
./network.sh up createChannel

cd $CONTRACT_PATH
npm install

cd ../hyperledger/fabric-samples/test-network
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
peer version

#../asset-transfer-$CONTRACT_NAME/chaincode-javascript/
ls
echo peer lifecycle chaincode package $CONTRACT_NAME.tar.gz --path $CONTRACT_PATH --lang node --label "$CONTRACT_NAME-1"
peer lifecycle chaincode package $CONTRACT_NAME.tar.gz --path $CONTRACT_PATH --lang node --label "$CONTRACT_NAME-1"
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
peer lifecycle chaincode install $CONTRACT_NAME.tar.gz

export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051
peer lifecycle chaincode install $CONTRACT_NAME.tar.gz

peer lifecycle chaincode queryinstalled
