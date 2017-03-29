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

import {EncodeBase64, ErrorModal, deleteCookie, Loading} from '../components/Tool/Tool'


class Home extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        location.href=node_service+"/resues-sorting-home/index.html";
    }


    render() {
        // sessionStorage['auth']=""

        return (
            <div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {}=state
    return {

    }
}

export default connect(mapStateToProps)(Home)