"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const middleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const test_get_1 = require("./test_get");
const save_user_1 = require("./save_user");
class server {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(middleware.eventContext());
        this.routes();
    }
    get getApp() {
        return this.app;
    }
    routes() {
        this.app.get('/users/test', (req, res) => new test_get_1.get_test(req, res));
        this.app.post('/users/new_user', (req, res) => new save_user_1.save_user(req, res));
    }
    listener(port) {
        this.app.listen(port);
        console.log(`listening on http://localhost:${port}`);
    }
}
exports.server = server;
