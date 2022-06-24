'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const ccpPath = path.resolve(__dirname,'..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);
        const walletPath = path.join(process.cwd(), 'wallet');

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const viewerIdentity = await wallet.get("viewer");
        if (viewerIdentity) {
            console.log('An identity for the user "viewer" already exists in the wallet');
            return viewerIdentity;
        }

        const rootIdentity = await wallet.get('root');
        if (!rootIdentity) {
            console.log('An identity for the root user "root" does not exist in the wallet');
            console.log('Run the enrollroot.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(rootIdentity.type);
        const rootUser = await provider.getUserContext(rootIdentity, 'root');


        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: 'viewer',
            role: 'client',
        }, rootUser);

        const enrollment = await ca.enroll({
            enrollmentID: 'viewer',
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
        await wallet.put('viewer', x509Identity);
        console.log(`Successfully registered and enrolled viewer user and imported it into the wallet`);
        return x509Identity;
    } catch (error) {
        console.error(`Failed to register viewer : ${error}`);
        process.exit(1);
    }
}

main();
