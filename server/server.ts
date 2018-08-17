import * as express from 'express'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as path from 'path'
import * as winston from 'winston'
import * as morgan from 'morgan'
import { Config } from './config'
import { apiRoute, Route } from './api';
import * as mongoose from "mongoose";
import * as websocket from "websocket"
import * as session from "express-session"

const PUBLIC_ASSETS = path.join(__dirname, '../client/public')

interface secret {
    MONGO: {
        SERVER_IP: string;
        PORT: string;
        USERNAME: string;
        PASSWORD: string;
    }
}

const SECRET: secret = require("../secret.json")

export class Server {
    public app: express.Application
    server: http.Server
    wsServer: websocket.server
    public mongoDB: typeof mongoose

    constructor() {
    }

    async configure(config: Config): Promise<void> {
        await Promise.all([new Promise((resolve, reject) => {
            mongoose.connect("mongodb://" + SECRET.MONGO.USERNAME + ":" + SECRET.MONGO.PASSWORD + "@" + SECRET.MONGO.SERVER_IP + ":" + SECRET.MONGO.PORT).then(x => {
                this.mongoDB = x
                resolve()
            })
        }), new Promise((resolve, reject) => {
            this.app = express()
            this.app.use(bodyParser.json())
            this.app.use(cookieParser())
            this.app.use(session({ secret: "djsaiopdjsaiopdjasiofngjsfdiso" }))

            configureWinston(config, this.app)

            this.app.use(express.static(PUBLIC_ASSETS))
            winston.debug(`Server using config`, config.envName);

            const registerApi = (route: Route, path: string) => {
                if (route.isEnd) {
                    console.log("registered: " + path)
                    let handlers: express.RequestHandler[] = [(req, res, next) => {
                        //TODO: create authentication
                        console.log("the session is", req.session)
                        //req.session.gay = "123"
                        console.log(req.session.gay)
                        next()
                    }, ...route.exec]
                    this.app.post(path, handlers)
                }
                else {
                    route.children.forEach(x => {
                        registerApi(x, path + "/" + x.path)
                    })
                }
            }
            registerApi(apiRoute, "/" + apiRoute.path)
            resolve()
        })])
    }

    public start(port: number = 3000) {
        this.server = this.app.listen(port)
        winston.info(`Server listening in port ${port}`)

        //websocket server
        this.wsServer = new websocket.server({
            httpServer: this.server,
            autoAcceptConnections: true
        });

        this.wsServer.on("request", (request: websocket.request) => {

        })

        this.wsServer.on("connect", (conn: websocket.connection) => {
            console.log("connected")
            conn.on("message", (data: websocket.IMessage) => {
                console.log(data.utf8Data)
            })
            conn.on("close", (code: number, desc: string) => {

            })
            conn.on("frame", (frame: websocket.frame) => {

            })
            conn.on("error", (err: Error) => {

            })
        })

        this.wsServer.on("close", (conn: websocket.connection, reason: number, desc: string) => {

        })
    }

    public stop() {
        winston.info('Shutting down server')
        this.server.close()
    }
}

function configureWinston(config: Config, app: express.Application) {
    const logger = new winston.Logger({
        transports: [
            new (winston.transports.Console)({
                level: config.logLevel,
                json: false,
                colorize: true
            }),
            new (winston.transports.File)({
                filename: 'dev-log.log',
                level: config.logLevel
            })
        ]
    })

    const logStream = {
        write(text: string) {
            logger.info(text)
        }
    }

    app.use(morgan('dev', { stream: logStream }))
}
