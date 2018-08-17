import * as user from "./user/index";
import { RequestHandler } from "../../node_modules/@types/express";

export interface Route {
    isEnd: boolean;
    path: string;
    children?: Route[];
    exec?: RequestHandler[];
    needsAuthentication?: boolean;
}

const apiRoute: Route = {
    isEnd: false,
    path: "api",
    children: [
        user.userRoute
    ]
}
export { apiRoute }