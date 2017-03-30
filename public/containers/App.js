import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import Header from '../components/header/header'
import {changeTopMenu, changeLeftMenu} from '../actions/MenuAction'
import MainMenu from '../components/left/menu'
import Login from './Login'
import {commonRefresh} from '../actions/Common'
import {login} from '../actions/CommonActions';
import Home from '../containers/Home';

import {EncodeBase64, ErrorModal, deleteCookie, Loading} from '../components/Tool/Tool'


class App extends Component {
    constructor(props) {
        super(props);
        this._changeTopMenu = this._changeTopMenu.bind(this);
        this._checkAuth = this._checkAuth.bind(this);
        this._logOut = this._logOut.bind(this);
        this._changeLang = this._changeLang.bind(this);
        this.loadingLang = 2;
        // Current_Lang = window.navigator.language.indexOf("CN") >= 0 ? CN_Lang : EN_Lang;
        Current_Lang = CN_Lang;
    }

    _changeTopMenu(menu) {
        sessionStorage["currentMenu"] = menu;
        this.props.dispatch(changeTopMenu(menu))
    }

    _changeLang(type) {
        this.loadingLang = 1;
        switch (type) {
            case "CN":
                Current_Lang = CN_Lang;
                break;
            case "EN":
                Current_Lang = EN_Lang;
                break;
            case "KO":
                Current_Lang = KO_Lang;
                break;
        }
        this.props.dispatch(commonRefresh());

        setTimeout(function () {
            this.loadingLang = 0;
            this.props.dispatch(commonRefresh());
        }.bind(this), 1000)
    }

    _checkAuth(params) {
        this.props.dispatch(login(params, "", "", user_login, "/dashboard"));
    }

    _logOut() {
        sessionStorage['token'] = "";
        sessionStorage['check'] = false;
        deleteCookie("JSESSIONID");

        browserHistory.push('/login')
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        this.props.dispatch(changeTopMenu(sessionStorage["currentMenu"] ? parseInt(sessionStorage["currentMenu"]) : 0))
        node_service = document.location.origin;
        // sessionStorage['check'] = "";
        sessionStorage['timeout_time'] = 0;

    }


    render() {
        // sessionStorage['auth']=""

        const {fetching}=this.props
        var token = sessionStorage['token'];

        var result = "";
        if (token) {
            if (this.loadingLang == 2 || this.loadingLang == 0) {
                result =
                    <div>
                        <Header _changeLang={this._changeLang} changeTopMenu={this._changeTopMenu}
                                _logOut={this._logOut}/>
                        <ContentPanel selected={this.props.selected} dispatch={this.props.dispatch}
                                      breadCrumbs={this.props.breadCrumbs} children={this.props.children}/>
                    </div>
            } else {
                result =
                    <div>
                        <Header _changeLang={this._changeLang} changeTopMenu={this._changeTopMenu}
                                _logOut={this._logOut}/>
                    </div>
            }

        } else {
            // if(document.location.pathname!="/"){
            result = <Login _checkAuth={this._checkAuth} fetching={fetching}/>
            // }
            // else{
            //     result = <Home />
            // }
        }
        return (
            <div>
                {result}
            </div>
        )
    }
}

class ContentPanel extends Component {
    constructor(props) {
        super(props)
        this._changeLeftMenu = this._changeLeftMenu.bind(this);
    }

    _changeLeftMenu(menuArr) {
        this.props.dispatch(changeLeftMenu(menuArr))
    }

    render() {
        const {fetching, data}=this.props;
        var auth = sessionStorage['auth'];
        return (
            <div className="page-container" style={{height: "2000px"}}>
                <div className="page-content" style={{backgroundColor: "white"}}>
                    <div className="sidebar sidebar-main"
                         style={{borderRight: 'thin #F5F5F5 solid', width: this.props.selected != "" ? "200px" : 0}}>
                        <MainMenu selected={this.props.selected} _changeLeftMenu={this._changeLeftMenu}/>
                    </div>
                    <div className="content-wrapper">
                        {this.props.children}
                        <div className="footer text-muted" style={{
                            position: 'fixed',
                            bottom: '0',
                            backgroundColor: '#FCFCFC',
                            padding: '5px',
                            width: '100%'
                        }}>
                            <div style={{float: 'left', marginLeft: '14px'}}>
                                ⓒ 2017. <span style={{color: '#193153'}}>Copyright Powered</span> by <span
                                style={{color: '#193153'}}>ReuseSorting Co., Ltd. All Rights Reserved.</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeTopMenu, changeLeftMenu, login, commonReducer}=state
    return {
        selected: changeTopMenu.topSelected,
        breadCrumbs: changeLeftMenu.breadCrumbs,
        login: login.fetching,
        data: login.data,
        refresh: commonReducer.refresh,
    }
}

export default connect(mapStateToProps)(App)