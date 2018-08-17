import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { routes } from './routes';
import { BrowserRouter } from 'react-router-dom';

const isDevelopment = process.env.NODE_ENV !== 'production'

render()

function render() {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter children={routes} />
        </AppContainer>,
        document.getElementById('app-container')
    )
}

if (isDevelopment && module && module.hot) {
    console.log('enabling hot load')
    module.hot.accept('./components/App', () => {
        render()
    })
}
