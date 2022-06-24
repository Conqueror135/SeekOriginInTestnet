#!/bin/bash
#Thang Dep Trai
set -e
export MSYS_NO_PATHCONV=1
pushd ./test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC -ccn userchaincode -ccv 1 -cci initLedger -ccl javascript -ccp ../chaincode/user/
popd
#pushd ./test-network/addOrg3
#./addOrg3.sh up -c seekorigin
#popd