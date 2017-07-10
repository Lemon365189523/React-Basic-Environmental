
import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'
// AppContainer is a necessary wrapper component for HMR

import App from "./components/index"
const Root = document.getElementById( 'app' )
import Test from "./components/test/index";

const isDev = !(process.env.NODE_ENV === 'development')



let render = () => {

    ReactDOM.render(
        <AppContainer>
            <div>
                <App/>
                <Test/>
            </div>
        </AppContainer>, Root)
}

if ( isDev ) {
    if ( window.devToolsExtension ) {
        window.devToolsExtension.open()
    }
}


if ( module.hot ) {
    // Setup hot module replacement
    module.hot.accept()
}
render()