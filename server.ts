import * as bridge from 'aws-serverless-express'
import {server} from './framework'

export class awsServer {

  private mineTypes: any
  private awsServerless: any
  private server: server
  private pass: any

  constructor(){
    this.mineTypes = [
      'application/octet-stream',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/jpeg',
      'image/png',
      'image/svg+xml'
    ];

    this.server = new server();
    this.createServer();

  }

  private createServer(){
    this.awsServerless = bridge.createServer(this.server.getApp, null, this.mineTypes);

  }

  public proxy(event: any, context: any){
    bridge.proxy(this.awsServerless, event, context);

  }
}
