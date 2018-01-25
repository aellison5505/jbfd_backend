"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bridge = require("aws-serverless-express");
const framework_1 = require("./framework");
class awsServer {
    constructor() {
        this.mineTypes = [
            'application/octet-stream',
            'font/eot',
            'font/opentype',
            'font/otf',
            'image/jpeg',
            'image/png',
            'image/svg+xml'
        ];
        this.server = new framework_1.server();
        this.createServer();
    }
    createServer() {
        this.awsServerless = bridge.createServer(this.server.getApp, null, this.mineTypes);
    }
    proxy(event, context) {
        bridge.proxy(this.awsServerless, event, context);
    }
}
exports.awsServer = awsServer;
