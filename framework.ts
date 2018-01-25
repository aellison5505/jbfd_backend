import * as express from 'express'
import * as middleware from 'aws-serverless-express/middleware'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as compression from 'compression'
import {get_test} from './test_get'
import {save_user} from './save_user'

export class server {
  private app: express.Application;

  constructor(){
    this.app = express();
    this.config();

  }

  private config() {
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(middleware.eventContext());
    this.routes();
  }

  get getApp(){
    return this.app;
  }

  private routes(){
    this.app.get('/users/test', (req,res) => new get_test(req, res));
    this.app.post('/users/new_user', (req, res) => new save_user(req,res));
    
  }

  public listener(port: number){
    this.app.listen(port);
    console.log(`listening on http://localhost:${port}`);

  }

}
