
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function AddUser(id, username, password, phone, email, address, avatarUrl, orgId, role, status) {
    try {
        const ccpPath = path.resolve(__dirname,'..','..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const walletPath = path.join(process.cwd(),'src','fabric','wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('viewer');
        if (!identity) {
            console.log('An identity for the user "viewer" does not exist in the wallet');
            console.log('Run the enrollViewer.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'viewer', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');

        const contract = network.getContract('userchaincode');
        await contract.submitTransaction('createUser',  username, password, email, address, phone, orgId, role);
        console.log('Register is success!');
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
async function getUserById(id) {
    try {
        const ccpPath = path.resolve(__dirname,'..','..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const walletPath = path.join(process.cwd(),'src','fabric', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('viewer');
        if (!identity) {
            console.log('An identity for the user "viewer" does not exist in the wallet');
            console.log('Run the enrollViewer.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'viewer', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');

        const contract = network.getContract('userchaincode');
        const result = await contract.evaluateTransaction('queryUsername',  id);
        await gateway.disconnect();
        return result;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
module.exports = {AddUser, getUserById};
