
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Login from './login/App';
import Home from './home/App';
import { createBrowserHistory } from 'history';
import AppContainer from "./containers/AppContainer";
const history = createBrowserHistory();



const render = () => {
    ReactDOM.render(
        <Router history={history}>
            {/*Router下只能有一个元素 所以需要一个div吧Route包含起来*/}
            <div >
                <Route exact path='/' component={AppContainer} />
                <Route path='/login' component={Login} />
                <Route path='/home' component={Home}/>
            </div>
        </Router>,
        document.getElementById('app')
    )
};

render();

if (module.hot) {
    module.hot.accept();
}





