import * as express from 'express'
import * as crypto from 'crypto'
import * as unirest from 'unirest'

interface User {
  user: string;
  email: string;
  passwd: string;
}


export class save_user {
  private req: express.Request;
  private res: express.Response;
  user: User;

  constructor(req: express.Request, res: express.Response) {
    this.req = req;
    this.res = res;
    this.user = req.body;
    this.pharse();
    this.save_s3(this.user);
  }

  private pharse() {
    console.log(this.user.passwd);
    let hexMd5 = crypto.createHash('md5').update(this.user.passwd).digest('hex');
    this.user.passwd = new Buffer(hexMd5, 'hex').toString('base64');
  }

  private save_s3(send: any) {
    console.log(process.env['x-amz-server-side-encryption-customer-algorithm']);
    unirest.put('https://api.mobilewebapp.net/S3x101/user.bucket/'+this.user.email)
      .headers({
        'x-api-key': process.env['x-api-key'],
        'Content-Type':'application/json',
      'x-amz-server-side-encryption-customer-algorithm':process.env['x-amz-server-side-encryption-customer-algorithm'],
      'x-amz-server-side-encryption-customer-key':process.env['x-amz-server-side-encryption-customer-key'],
      'x-amz-server-side-encryption-customer-key-MD5':process.env['x-amz-server-side-encryption-customer-key-MD5']
      })
      .send(send)
      .end((response) => {
    //    console.log(response);
        this.done(response);
      });
  }

  private done(send: any) {
    this.res.json(send);
  }

}
