
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import Cpt from './component';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    )
};
render(Cpt);

if (module.hot) {
    module.hot.accept('./component', () => {
        render(Cpt)
    });
}