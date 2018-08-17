import * as React from 'react'
import './Home.css'
import { RouteComponentProps } from 'react-router-dom';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public ws: WebSocket
    constructor() {
        super();
        this.ws = new WebSocket("ws://127.0.0.1:3000")

    }
    render() {
        return (
            <div>
                <h1>home</h1>
                <p>suck your mum</p>
                <button onClick={() => { this.ws.send("your mom gay") }}>send stuff</button>
            </div>
        )
    }
}
