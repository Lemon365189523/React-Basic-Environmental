
import React from 'react';
import style from "./component.css";
import classnames from "classnames/index";
import { Button, Flex, InputItem ,Toast} from "antd-mobile";
// import {observable, computed, autorun} from "mobx";


class Cpt extends React.Component {
    handleOnClick = ()=> {

    }
    render () {
        return (
            <div>
                <div className="inputCell">
                    <div className="inputText">账号 :</div>
                    <input type="text" />
                </div>
                <div className="inputCell">
                    <div className="inputText">密码 :</div>
                    <input type="text" />
                </div>
                <div className="loginbutton" onClick={this.handleOnClick.bind(this)}>
                    <Button >
                        login
                    </Button>
                </div>

            </div>
        )
    }
}

export default Cpt;


