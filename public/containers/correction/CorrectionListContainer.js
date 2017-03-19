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
    CORRECTION_LIST_START,
    CORRECTION_LIST_END,
    ORGANIZATION_LIST_START,
    ORGANIZATION_LIST_END
} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class CorrectionListContainer extends Component {
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
        this._search = this._search.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: 20};
        var organizationParams = {page: 0, size: 10000};
        this.props.dispatch(getListByMutilpCondition(params, CORRECTION_LIST_START, CORRECTION_LIST_END, correction_list));
        this.props.dispatch(getListByMutilpCondition(organizationParams, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按单位/小区搜索") {
                self.searchColumn = "ORGANIZATION";
            } else {
                self.searchColumn = "TIMERANGER";
            }
            self._startRefresh();
        });
        $('.daterange-organization').daterangepicker({
            maxDate : moment(), //最大时间
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            ranges: rangesLocale,
            locale: dateLocale
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _search() {
        var params = "";
        if (this.searchColumn == "ORGANIZATION") {
            params = {
                page: 0,
                size: 20,
                organizationid: $("#organizationSelect").val()
            };
        } else {
            var rangeTime = $(".daterange-organization").val();
            params = {
                page: 0,
                size: 20,
                startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
                endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
            };
        }
        this.props.dispatch(getListByMutilpCondition(params, CORRECTION_LIST_START, CORRECTION_LIST_END, correction_list));
    }

    _delete(id, name) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + name + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0, that.searchColumn, $("#search_value").val()))
        })

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
        const {fetching, data, organizationList} =this.props;
        var organizationOptions = [];
        if (organizationList) {
            if (organizationList.status) {
                organizationList.data.content.forEach(function (organization, idx) {
                    organizationOptions.push(
                        <option key={"organization-" + idx} value={organization.id}>{organization.name}</option>
                    )
                })
            }
        }
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid'}}>
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false" style={{
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    fontWeight: 'bold',
                                    color: '#193153'
                                }}><span
                                    style={{color: '#193153'}} id="search_way">{"按单位/小区搜索"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按单位/小区搜索"}</a></li>
                                    <li><a href="#">{"按时间范围搜索"}</a></li>
                                </ul>
                            </li>

                            <li style={{display:this.searchColumn == "ORGANIZATION"?"inline-block":"none" }}>
                                <select id="organizationSelect" className="form-control" style={{width: "250px"}}>
                                    {organizationOptions}
                                </select>
                            </li>
                            <li style={{display:this.searchColumn == "ORGANIZATION"?"none":"inline-block" }}>
                                <div className="input-group" style={{width: "250px"}}>
                                    <input type="text" className="form-control daterange-organization"/>
                                    <span className="input-group-addon"><i
                                        className="icon-calendar22"></i></span>
                                </div>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)}
                                        style={{marginLeft: '30px'}} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"纠错记录列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.content.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <CorrectionListComponent data={data} fetching={fetching}
                                                 _delete={this._delete}
                                                 _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class CorrectionListComponent extends Component {
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
        if (data) {
            if (data.data.content.length > 0) {
                data.data.content.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{val.type}</td>
                        <td className="text-center">{val.weight}</td>
                        <td className="text-left">{val.description}</td>
                        <td className="text-center">{timeStamp2Time(val.createTime)}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li style={{display: 'block'}}
                                            onClick={this._detail.bind(this, '/DataManage/RubbishClass/ModifyRubbishClass/:' + val.id)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {"修改"}</a></li>
                                        <li style={{display: 'block'}}
                                            onClick={this._delete.bind(this, val.id, val.name)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {"删除"}</a></li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this));
            } else {
                tb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            }
        } else {
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var tableHeight = ($(window).height() - 240);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom: '85px'}}>
                    <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold text-center">{"错误类型"}</th>
                        <th className="col-md-2 text-bold text-center">{"重量"}</th>
                        <th className="col-md-5 text-bold text-left">{"错误描述"}</th>
                        <th className="col-md-3 text-bold text-center">{"创建时间"}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tb}
                    </tbody>
                </table>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {getOrganizationList, getCorrectionList, commonReducer}=state;
    return {
        fetching: getCorrectionList.fetching,
        data: getCorrectionList.data,
        organizationList: getOrganizationList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(CorrectionListContainer)