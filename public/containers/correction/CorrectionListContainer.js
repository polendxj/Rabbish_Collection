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
    timeStamp2Time,
    correctionType,
    recordType
} from '../../components/Tool/Tool';
import {
    CORRECTION_LIST_START,
    CORRECTION_LIST_END,
    CORRECTIONITEMS_START,
    CORRECTIONITEMS_END,
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
        this._changePage = this._changePage.bind(this);
        this._prePage = this._prePage.bind(this);
        this._nextPage = this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: page_size,startTime: new Date("2016-01-01").getTime(),endTime:new Date().getTime()};
        var organizationParams = {page: 0, size: 10000};
        this.props.dispatch(getListByMutilpCondition(params, CORRECTION_LIST_START, CORRECTION_LIST_END, correction_list));
        this.props.dispatch(getListByMutilpCondition(organizationParams, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
        this.props.dispatch(getListByMutilpCondition(organizationParams, CORRECTIONITEMS_START, CORRECTIONITEMS_END, correction_items));
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
            maxDate: moment(), //最大时间
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            startDate: '2016/01/01',
            endDate: moment(),
            ranges: rangesLocale,
            locale: dateLocale
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _search() {
        var rangeTime = $(".daterange-organization").val();
        var params = {
            page: 0,
            size: page_size,
            organizationid: $("#organizationSelect").val(),
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
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
        var rangeTime = $(".daterange-organization").val();
        var params = {
            page: this.page,
            size: page_size,
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
        this.props.dispatch(getListByMutilpCondition(params, CORRECTION_LIST_START, CORRECTION_LIST_END, correction_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var rangeTime = $(".daterange-organization").val();
        var params = {
            page: this.page,
            size: page_size,
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
        this.props.dispatch(getListByMutilpCondition(params, CORRECTION_LIST_START, CORRECTION_LIST_END, correction_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var rangeTime = $(".daterange-organization").val();
        var params = {
            page: this.page,
            size: page_size,
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
        this.props.dispatch(getListByMutilpCondition(params, CORRECTION_LIST_START, CORRECTION_LIST_END, correction_list));
    }

    render() {
        const {fetching, data, correctionItems, organizationList} =this.props;
        var organizationOptions = [];
        if (organizationList) {
            organizationOptions.push(
                <option key={"organization--1"} value={""}>{"所有小区"}</option>
            );
            if (organizationList.status) {
                organizationList.data.content.forEach(function (organization, idx) {
                    organizationOptions.push(
                        <option key={"organization-" + idx} value={organization.id}>{organization.name}</option>
                    )
                })
            }
        }
        var style = {width:"175px"};
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={' icon-alarm-cancel'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>

                            <li>
                                <select id="organizationSelect" className="form-control">
                                    {organizationOptions}
                                </select>
                            </li>
                            <li>
                                <input type="text" className="form-control daterange-organization" style={style}/>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"纠错记录列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <CorrectionListComponent data={data} fetching={fetching}
                                                 correctionItems={correctionItems}
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
        const {data,correctionItems, fetching}=this.props;
        let tb = [];
        if (data&&correctionItems) {
            if (data.data&&data.data.content.length > 0) {
                data.data.content.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{val.userName}</td>
                        <td className="text-center">{correctionType(correctionItems,val.type)}</td>
                        <td className="text-center">{recordType(val.recordType)}</td>
                        <td className="text-center">{val.weight?val.weight.toFixed(2):"0.00"}</td>
                        <td className="text-left">{val.description}</td>
                        <td className="text-center">{timeStamp2Time(val.createTime)}</td>
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
                        <th className="col-md-2 text-bold text-center">{"纠错用户"}</th>
                        <th className="col-md-2 text-bold text-center">{"错误类型"}</th>
                        <th className="col-md-2 text-bold text-center">{"记录类型"}</th>
                        <th className="col-md-1 text-bold text-center">{"重量（吨）"}</th>
                        <th className="col-md-3 text-bold text-left">{"错误描述"}</th>
                        <th className="col-md-2 text-bold text-center">{"创建时间"}</th>
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
    const {getOrganizationList, getCorrectionList,getCorrectionItems, commonReducer}=state;
    return {
        fetching: getCorrectionList.fetching,
        data: getCorrectionList.data,
        correctionItems: getCorrectionItems.data,
        organizationList: getOrganizationList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(CorrectionListContainer)