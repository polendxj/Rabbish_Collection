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
        this.breadCrumbs = [];
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
        // this.props.dispatch(getListByMutilpCondition({cityid: 1}, STATISTICBYRANGEDATE_LIST_START, STATISTICBYRANGEDATE_LIST_END, statistic_settlement));
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
                <div className="content" style={{marginTop: '5px'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="panel bg-teal-400">
                                    <div className="panel-body">
                                        <h3 className="no-margin">3,450</h3>
                                        垃圾投放总量
                                        <div className="text-muted text-size-small">单位：吨</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>

                            <div className="col-lg-3  col-md-6">
                                <div className="panel bg-blue-400" style={{position: "static",zoom: "1"}}>
                                    <div className="panel-body">
                                        <h3 className="no-margin">18,390</h3>
                                        激活用户总数
                                        <div className="text-muted text-size-small">单位：个</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>

                            <div className="col-lg-3  col-md-6">
                                <div className="panel bg-pink-400">
                                    <div className="panel-body">

                                        <h3 className="no-margin">102563 / 296256</h3>
                                        兑换总金额 / 兑换总积分
                                        <div className="text-muted text-size-small">单位：元</div>
                                        <a className="heading-elements-toggle"><i class="icon-menu"></i></a></div>

                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="panel bg-grey-400">
                                    <div className="panel-body">

                                        <h3 className="no-margin">1028</h3>
                                        每日请求数
                                        <div className="text-muted text-size-small">单位：次/平均</div>
                                        <a className="heading-elements-toggle"><i class="icon-menu"></i></a></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{padding:"20px"}}>
                        <div className="tabbable">
                            <ul className="nav nav-tabs nav-justified nav-tabs-highlight">
                                <li className="active"><a href="#basic-justified-tab1" data-toggle="tab" aria-expanded="true">垃圾分类统计</a></li>
                                <li className=""><a href="#basic-justified-tab2" data-toggle="tab" aria-expanded="false">城市垃圾统计</a></li>
                                <li className=""><a href="#basic-justified-tab3" data-toggle="tab" aria-expanded="false">小区/单位垃圾统计</a></li>
                                <li className=""><a href="#basic-justified-tab4" data-toggle="tab" aria-expanded="false">结算记录统计</a></li>
                                <li className=""><a href="#basic-justified-tab5" data-toggle="tab" aria-expanded="false">总量数据统计</a></li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane active" id="basic-justified-tab1">
                                    Easily make tabs equal widths of their parent with <code>.nav-justified</code> className.
                                </div>

                                <div className="tab-pane" id="basic-justified-tab2">
                                    Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid laeggin.
                                </div>

                            </div>
                        </div>
                    </div>
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