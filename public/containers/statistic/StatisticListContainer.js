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
    filterCityById,
    getInitialCityIdx
} from '../../components/Tool/Tool';
import {
    STATISTICBYCLASSIFY_LIST_START,
    STATISTICBYCLASSIFY_LIST_END,
    STATISTICBYCITY_LIST_START,
    STATISTICBYCITY_LIST_END,
    STATISTICBYORGANIZATION_LIST_START,
    STATISTICBYORGANIZATION_LIST_END,
    STATISTICBYRANGEDATE_LIST_START,
    STATISTICBYRANGEDATE_LIST_END,
    STATISTIC_SETTLEMENT_START,
    STATISTIC_SETTLEMENT_END,
    CITY_ORGANIZATION_LIST_START,
    CITY_ORGANIZATION_LIST_END
} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class StatisticListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "统计分析", link: ''},
            {text: "垃圾投放", link: ''},
            {text: "垃圾投放列表", link: ''}
        ];
        this.operation = [
            {icon: "", text: "", action: ""}
        ];
        this.searchColumn = "CLASSIFY";
        this.currentCityId = 1;
        this.currentCity = "";
        this._search = this._search.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {cityid: 1, page: 0, size: 20};
        var cityParams = {page: 0, size: 10000};
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END, statisticByClassify_list));
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
        this.props.dispatch(getListByMutilpCondition({cityid: 1}, STATISTICBYRANGEDATE_LIST_START, STATISTICBYRANGEDATE_LIST_END, statisticByRangeDate_list));
        this.props.dispatch(getListByMutilpCondition({cityid: 1}, STATISTIC_SETTLEMENT_START, STATISTIC_SETTLEMENT_END, statistic_settlement));
        this.props.dispatch(getListByMutilpCondition(cityParams, CITY_ORGANIZATION_LIST_START, CITY_ORGANIZATION_LIST_END, cityOfOrganization_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            var text = $(this).find('a').text().trim();
            if (text == "按垃圾分类统计") {
                self.searchColumn = "CLASSIFY";
            } else if (text == "按单位/小区统计") {
                self.searchColumn = "ORGANIZATION";
            } else if (text == "按城市统计") {
                self.searchColumn = "CITY";
            } else {
                self.searchColumn = "TIMERANGER";
            }
            self._startRefresh();
        });
        $('.daterange-single').daterangepicker({
            singleDatePicker: true,
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            autoUpdateInput:false,
            locale: dateLocale
        });
        $('.daterange-organization').daterangepicker({
            maxDate: moment(), //最大时间
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            ranges: rangesLocale,
            startDate: '01/01/2016',
            endDate: moment(),
            locale: dateLocale
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _search() {
        if (this.searchColumn == "CLASSIFY") {
            var classifyParams = {
                page: 0,
                size: 20,
                cityid: $("#citySelect").val(),
                monthday: timeStamp2Time(new Date($('.daterange-single').val()))
            };
            this.props.dispatch(getListByMutilpCondition(classifyParams, STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END, statisticByClassify_list));
        } else if (this.searchColumn == "CITY") {
            var rangeTime = $(".daterange-organization").val();
            console.log(rangeTime);
            var cityParams = {
                page: 0,
                size: 20,
                cityid: $("#citySelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
        } else if (this.searchColumn == "ORGANIZATION") {
            var rangeTime = $(".daterange-organization").val();
            var organizationParams = {
                page: 0,
                size: 20,
                cityid: $("#citySelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(organizationParams, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
        } else {
            var rangeTime = $(".daterange-organization").val();
            var rangeDateParams = {
                page: 0,
                size: 20,
                cityid: $("#citySelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(rangeDateParams, STATISTICBYRANGEDATE_LIST_START, STATISTICBYRANGEDATE_LIST_END, statisticByRangeDate_list));
        }
    }

    _changeCity() {
        var citieid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.currentCityId = citieid;
        this._startRefresh();
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
        const {fetching, classifyData, cityData, organizationData, rangeDateData,settlementData, cityList} =this.props;
        console.log("rangeDateData", rangeDateData);
        console.log("settlementData", settlementData);
        var data = "";
        if (this.searchColumn == "CLASSIFY") {
            data = classifyData;
        } else if (this.searchColumn == "CITY") {
            data = cityData;
        } else if (this.searchColumn == "ORGANIZATION") {
            data = organizationData;
        } else {
            data = rangeDateData
        }
        console.log("statisticData", data);
        console.log("cityList", cityList);
        var cityOptions = [];
        var organizationOptions = [];
        if (cityList) {
            organizationOptions.push(
                <option key={"organization--1"} value={""}>{"所有"}</option>
            );
            if (cityList.status) {
                cityList.data.forEach(function (city, idx) {
                    cityOptions.push(
                        <option key={"city-" + idx} value={city.id}>{city.name}</option>
                    )
                });
                if (this.currentCity == "") {
                    var idx = getInitialCityIdx(this.currentCityId,cityList.data);
                    if (cityList.data[idx].organization.content.length > 0) {
                        cityList.data[idx].organization.content.forEach(function (val, index) {
                            organizationOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }
                } else {
                    if (this.currentCity.organization.content.length > 0) {
                        this.currentCity.organization.content.forEach(function (val, index) {
                            organizationOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }

                }
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
                                    style={{color: '#193153'}} id="search_way">{"按垃圾分类统计"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按垃圾分类统计"}</a></li>
                                    <li><a href="#">{"按城市统计"}</a></li>
                                    <li><a href="#">{"按单位/小区统计"}</a></li>
                                    <li><a href="#">{"按时间段统计"}</a></li>
                                </ul>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="citySelect" className="form-control"
                                        value={this.currentCityId} onChange={this._changeCity}>
                                    {cityOptions}
                                </select>
                            </li>
                            <li style={{display: this.searchColumn == "ORGANIZATION" ? "inline-block" : "none"}}>
                                <select id="organizationSelect" className="form-control">
                                    {organizationOptions}
                                </select>
                            </li>
                            <li style={{display: this.searchColumn == "CLASSIFY" ? "inline-block" : "none"}}>
                                <input type="text" className="form-control daterange-single"
                                       placeholder="选择日期"/>
                            </li>
                            <li style={{display: this.searchColumn == "CLASSIFY" ? "none" : "inline-block"}}>
                                <input type="text" className="form-control daterange-organization" style={{width:"175px"}}/>
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
                        <legend className="text-bold">{"垃圾投放统计列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.data ? data.data.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <StatisticListComponent data={data} fetching={fetching}
                                                searchColumn={this.searchColumn}
                                                _delete={this._delete}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class StatisticListComponent extends Component {
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
        const {data, searchColumn, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                var dataList = null;
                if (data.data) {
                    if (typeof data.data.content == "undefined") {
                        dataList = data.data;
                    } else {
                        dataList = data.data.content;
                    }
                }
                if (dataList && dataList.length > 0) {
                    dataList.forEach(function (val, key) {
                        if (searchColumn == "CLASSIFY") {
                            tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                                <td className="text-center">{key + 1}</td>
                                <td className="text-center">{val.className}</td>
                                <td className="text-center">{val.count}</td>
                                <td className="text-center">{val.weight}</td>
                            </tr>)
                        } else if (searchColumn == "CITY") {
                            tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                                <td className="text-center">{key + 1}</td>
                                <td className="text-center">{val.count}</td>
                                <td className="text-center">{val.weight}</td>
                                <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                            </tr>)
                        } else if (searchColumn == "ORGANIZATION") {
                            tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                                <td className="text-center">{key + 1}</td>
                                <td className="text-center">{val.organizationName}</td>
                                <td className="text-center">{val.count}</td>
                                <td className="text-center">{val.weight}</td>
                                <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                            </tr>)
                        } else {
                            tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                                <td className="text-center">{key + 1}</td>
                                <td className="text-center">{val.count}</td>
                                <td className="text-center">{val.weight}</td>
                            </tr>)
                        }

                    }.bind(this));
                } else {
                    tb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>

                    </tr>)
                }
            } else {
                tb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
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
                    <tr style={{fontWeight: 'bold', display: searchColumn == "CLASSIFY" ? "table-row" : "none"}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-4 text-bold text-center">{"垃圾分类名称"}</th>
                        <th className="col-md-4 text-bold text-center">{"投放次数"}</th>
                        <th className="col-md-4 text-bold text-center">{"投放重量"}</th>
                    </tr>
                    <tr style={{fontWeight: 'bold', display: searchColumn == "CITY" ? "table-row" : "none"}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-4 text-bold text-center">{"投放次数"}</th>
                        <th className="col-md-4 text-bold text-center">{"投放重量"}</th>
                        <th className="col-md-4 text-bold text-center">{"日期"}</th>
                    </tr>
                    <tr style={{fontWeight: 'bold', display: searchColumn == "ORGANIZATION" ? "table-row" : "none"}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-3 text-bold text-center">{"小区/单位名称"}</th>
                        <th className="col-md-3 text-bold text-center">{"投放次数"}</th>
                        <th className="col-md-3 text-bold text-center">{"投放重量"}</th>
                        <th className="col-md-3 text-bold text-center">{"日期"}</th>
                    </tr>
                    <tr style={{fontWeight: 'bold', display: searchColumn == "TIMERANGER" ? "table-row" : "none"}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-6 text-bold text-center">{"投放次数"}</th>
                        <th className="col-md-6 text-bold text-center">{"投放重量"}</th>
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
    const {
        getCityOfOrganizationList, getStatisticByClassifyList, getStatisticByCityList,
        getStatisticByOrganizationList, getStatisticByRangeDateList,getStatisticSettlementDate, commonReducer
    }=state;
    return {
        fetching: getStatisticByClassifyList.fetching,
        classifyData: getStatisticByClassifyList.data,
        cityData: getStatisticByCityList.data,
        organizationData: getStatisticByOrganizationList.data,
        rangeDateData: getStatisticByRangeDateList.data,
        settlementData:getStatisticSettlementDate.data,
        cityList: getCityOfOrganizationList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(StatisticListContainer)