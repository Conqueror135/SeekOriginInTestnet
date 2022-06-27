#!/bin/bash
#Thang Dep Trai
set -e
export MSYS_NO_PATHCONV=1
pushd ./test-network
#./network.sh down
./network.sh up createChannel -c seekorigin -ca -s couchdb
./network.sh deployCC -ccn userchaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/user/
./network.sh deployCC -ccn pkichaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/pki/
./network.sh deployCC -ccn orgchaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/org/
./network.sh deployCC -ccn procedurechaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/procedure/
./network.sh deployCC -ccn mediachaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/media/
./network.sh deployCC -ccn camerachaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/camera/
./network.sh deployCC -ccn stepchaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/step/
./network.sh deployCC -ccn productchaincode -ccv 1 -c seekorigin -ccl javascript -ccp ../chaincode/product/
popd
#pushd ./test-network/addOrg3
#./addOrg3.sh up -c seekorigin
#popd