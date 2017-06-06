
import React from 'react';
import classnames from "classnames/index";
import { Button, Flex, InputItem ,Toast} from "antd-mobile";
// import {observable, computed, autorun} from "mobx";
import { Link, BrowserRouter  } from 'react-router-dom';
import "./index.less";
import { createBrowserHistory} from 'history';
const history = createBrowserHistory();

class Cpt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            userpw: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }



    handleClick = ()=> {
        const {username,userpw} = this.state;
        if (username==="lemon" & userpw === "123456"){
            //window.location.replace("/home")
            history.push('/home')
        }else {
            Toast.show("账号或密码错误",1)
        }
    }


    handleUsernameChange(username){
        this.setState({
            username: username
        })
    }
    handleUserpwChange(password){
        this.setState({
            userpw: password
        })
    }

    render () {
        return (
            <div>
                <div className="inputCell">
                    <div className="inputText">账号 :</div>
                    <div className="inputItem">
                        <InputItem  onChange={this.handleUsernameChange.bind(this)}/>
                    </div>

                </div>
                <div className="inputCell">
                    <div className="inputText">密码 :</div>
                    <div className="inputItem">
                        <InputItem  onChange={this.handleUserpwChange.bind(this)}/>
                    </div>

                </div>
                <div className="loginbutton" onClick={this.handleClick}>
                    <Button >
                        login
                    </Button>
                </div>

            </div>
        )
    }
}


export default Cpt;

