import { user, userModel, comparePassword } from "./model/user";

function isAuthenticated(id: string): Promise<userModel | null> {
    return new Promise((resolve, reject) => {
        user.find({ _id: id }, (err, res) => {
            if (err) {
                reject(err)
                console.error(err)
            }
            if (res.length === 0) resolve(null)
            resolve(res[0] as userModel)
        })
    })
}

function authenticate(username: string, password: string): Promise<userModel | string> {
    return new Promise((resolve, reject) => {
        user.find({ username: username }, (err, res: userModel[]) => {
            if (err) {
                reject(err)
                console.error(err)
            }
            if (res.length === 0) resolve("user doesn't exist")
            comparePassword(password, res[0].password, (err, isMatch) => {
                if(isMatch){
                    resolve(res[0])
                }
                else[
                    resolve("password doesnt match")
                ]
            })
        })
    })
}

export { isAuthenticated, authenticate }