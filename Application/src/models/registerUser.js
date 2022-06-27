'use strict';
const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

const createIdentity = async (name, role)=>{
    try {
        const ccpPath = path.resolve(__dirname,'..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);
        const walletPath = path.join(process.cwd(),'src','models', 'wallet');
        
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        const rootIdentity = await wallet.get('root');
        if (!rootIdentity) {
            console.log('An identity for the admin user "root" does not exist in the wallet');
            return;
        }
        const provider = wallet.getProviderRegistry().getProvider(rootIdentity.type);
        const rootUser = await provider.getUserContext(rootIdentity, 'root');
        let registerAttrs = [];
        let registerAttribute = {
        name: "role",
        value: role,
        ecert: true
        };
        registerAttrs.push(registerAttribute);
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: name,
            role: 'client',
            attrs: registerAttrs
        }, rootUser);
        const res={
            caURL: caURL,
            secret : secret
        }
        const enrollment = await ca.enroll({
            enrollmentID: name,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        console.log(`Successfully registered and enrolled admin user "${name}" and imported it into the wallet`);
        return JSON.stringify(x509Identity);
        
    } catch (error) {
        console.error(`Failed to register user "${name}": ${error}`);
        process.exit(1);
    }
}
module.exports = {createIdentity};