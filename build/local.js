"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("./framework");
let local_server = new framework_1.server();
local_server.listener(8080);
