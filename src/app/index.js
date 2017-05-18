import ReactDom from 'react-dom';
import React from "react";
import App from "./containers/home/App.js";
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
    ReactDom.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(App);

