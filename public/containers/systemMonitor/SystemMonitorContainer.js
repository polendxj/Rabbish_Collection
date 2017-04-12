/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {
    Loading,
    NoData,
    ConfirmModal,
    ErrorModal,
    roleApplicationUse,
    timeStamp2Time
} from '../../components/Tool/Tool';
import {
    OPERATION_MONITOR_START,
    OPERATION_MONITOR_END,
    OPERATION_ORGANIZATION_START,
    OPERATION_ORGANIZATION_END
} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class SystemMonitorContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "纠错记录", link: ''},
            {text: "纠错记录列表", link: ''}
        ];
        this.operation = [
            {icon: "", text: "", action: ""}
        ];
        this.searchColumn = "ORGANIZATION";
        this._startRefresh = this._startRefresh.bind(this);
    }

    componentDidMount() {
        var self = this;
        var monitorParams = {origin:1};
        this.props.dispatch(getListByMutilpCondition(monitorParams, OPERATION_MONITOR_START, OPERATION_MONITOR_END, operation_monitor));
        this.props.dispatch(getListByMutilpCondition({}, OPERATION_ORGANIZATION_START, OPERATION_ORGANIZATION_END, operation_organization_total));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));

    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _changePage(page) {
        this.page = page;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _prePage(page) {
        this.page = this.page - 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    render() {
        const {fetching, data, organizationMonitorData} =this.props;
        var organizationOptions = [];
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"运营数据区"}</legend>
                        <SystemMonitorComponent data={data} fetching={fetching}
                                                 _delete={this._delete}
                                                 _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class SystemMonitorComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id, name) {
        this.props._delete(id, name)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        var tableHeight = ($(window).height() - 240);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>

            </div>

        )
    }
}

function mapStateToProps(state) {
    const {getOrganizationMonitor, getOperationMonitor, commonReducer}=state;
    return {
        fetching: getOperationMonitor.fetching,
        data: getOperationMonitor.data,
        organizationMonitorData: getOrganizationMonitor.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(SystemMonitorContainer)