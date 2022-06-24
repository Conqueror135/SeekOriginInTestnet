
'use strict';

const { Contract } = require('fabric-contract-api');

class Userr extends Contract {
    async initLedger(ctx) {
        const user = [
            {
                username:"hsdhs",
                password:"jsjd",
                email:"dhsj",
                address:"hsjh",
                phone:"121245",
                org:"dgsd",
                role:"admin",
            }
        ];

        for (let i = 0; i < user.length; i++) {
            user[i].docType = 'user';
            await ctx.stub.putState( user[i].username, Buffer.from(JSON.stringify(user[i])));
        }
    }

    async createUser(ctx, username, password, email, address, phone, org, role) {
        const user = {
            username,
            password,
            email,
            address,
            phone,
            org,
            role,
            docType: 'user',
        };

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
    }

    async queryUsername(ctx, username) {
        const userAsBytes = await ctx.stub.getState(username);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        return JSON.stringify(user);
    }

    async queryAllUsers(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        return JSON.stringify(allResults);
    }

    async changePasswordUser(ctx, username, newPassword) {

        const userAsBytes = await ctx.stub.getState(username); 
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${username} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        user.password = newPassword;

        await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
    }
}

module.exports = Userr;
