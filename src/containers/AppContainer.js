import React from "react";
import {Link} from "react-router-dom";
class AppContainer extends React.Component {
    render(){
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/Login'>login</Link>
                    </li>
                    <li>
                        <Link  to="/home">home</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default AppContainer;