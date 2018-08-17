import { Route } from "..";
import login from "./login"
import register from "./register";

const userRoute: Route = {
    path: "user",
    isEnd: false,
    children: [
        login,
        register
    ],
}
export { userRoute }