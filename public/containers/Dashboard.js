/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Highcharts from 'highcharts'
import SessionAndUsersChartsComponent from '../components/charts/SessionAndUsersChartsComponent'
import {commonRefresh} from '../actions/Common'

import {alarmTargetTypeFilter, warningLevelFilter, warningLevelColorFilter} from '../components/Tool/Tool'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.SessionAndUsersContainerTimer = ""
        this.ServerUseStatusContainerTimer = ""
        this.CSRMonitorStatusContainerTimer = ""
        this.CSMMonitorStatusContainerTimer = ""
        this.alarmHistoryContainerTimer = ""
        this.groups = []
        this.cseStatusInfo = {
            hadrwareTotalStatus: "",
            logicTotalStatus: "",
            performanceTotalStatus: ""
        }
        this.csrStatusInfo = {
            hadrwareTotalStatus: "",
            logicTotalStatus: "",
            serviceTotalStatus: ""
        }
        this.csmStatusInfo = {
            hadrwareTotalStatus: "",
            logicTotalStatus: "",
            serviceTotalStatus: ""
        }
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }


    componentDidMount() {


    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <div className="content" style={{marginTop: '20px'}}>
                    <div></div>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {commonReducer}=state
    return {
        refresh: commonReducer.refresh

    }
}


export default connect(mapStateToProps)(Dashboard)