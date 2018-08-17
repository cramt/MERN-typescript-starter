import { Route } from "..";
import * as express from "express"
import { registerUser, userModel, user } from "../../model/user";

const register: Route = {
    isEnd: true,
    exec: [(req: express.Request, res: express.Response) => {
        user.create({ email: req.headers.email as string, username: req.headers.username as string, password: req.headers.password as string, id: "test" }).then(x => {
            registerUser(x as userModel, (err: any, product: userModel) => {
                res.send(JSON.stringify(err));
            })
        })
    }],
    path: "register"
}
export default register