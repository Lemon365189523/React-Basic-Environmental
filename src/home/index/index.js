import React from "react";
import "./index.less";
import { Link } from 'react-router-dom';
import {NavBar, TabBar} from "antd-mobile";

export default class Index extends React.Component {
    render (){
        return (
            <div>
                <NavBar iconName="null">首页</NavBar>

                <ul>
                    <li><Link to="/login">去登陆</Link></li>
                </ul>
            </div>
        )
    }
}
