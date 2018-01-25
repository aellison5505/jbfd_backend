import * as express from 'express'

export class get_test {
  constructor(req: express.Request, res: express.Response){
    res.json({
        "test":"worked"
    })
  }
}
