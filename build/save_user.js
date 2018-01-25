"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const unirest = require("unirest");
class save_user {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.user = req.body;
        this.pharse();
        this.save_s3(this.user);
    }
    pharse() {
        console.log(this.user.passwd);
        let hexMd5 = crypto.createHash('md5').update(this.user.passwd).digest('hex');
        this.user.passwd = new Buffer(hexMd5, 'hex').toString('base64');
    }
    save_s3(send) {
        console.log(process.env['x-amz-server-side-encryption-customer-algorithm']);
        unirest.put('https://api.mobilewebapp.net/S3x101/user.bucket/' + this.user.email)
            .headers({
            'x-api-key': process.env['x-api-key'],
            'Content-Type': 'application/json',
            'x-amz-server-side-encryption-customer-algorithm': process.env['x-amz-server-side-encryption-customer-algorithm'],
            'x-amz-server-side-encryption-customer-key': process.env['x-amz-server-side-encryption-customer-key'],
            'x-amz-server-side-encryption-customer-key-MD5': process.env['x-amz-server-side-encryption-customer-key-MD5']
        })
            .send(send)
            .end((response) => {
            //    console.log(response);
            this.done(response);
        });
    }
    done(send) {
        this.res.json(send);
    }
}
exports.save_user = save_user;
