#!/bin/bash
#Thang Dep Trai
set -e
#export MSYS_NO_PATHCONV=1
#CC_SRC_PATH="../chaincode/tcoin/"
pushd ./test-network
./network.sh down
./network.sh up createChannel -c seekorigin -ca -s couchdb
#./network.sh deployCC -ccn utxo -ccv 1 -cci InitLedger -ccl javascript -ccp ${CC_SRC_PATH}
popd
pushd ./test-network/addOrg3
./addOrg3.sh up -c seekorigin
popd