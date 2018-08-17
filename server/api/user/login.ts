import { Route } from "..";
import * as express from "express"

const login: Route = {
    isEnd: true,
    exec: [(req: express.Request, res: express.Response) => {
        res.send("something")
    
    }],
    path: "login"
}
export default login