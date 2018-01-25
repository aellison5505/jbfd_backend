import {awsServer} from './server'

const server = new awsServer();

exports.handler = (event, context) => server.proxy(event,context);
