/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {commonRefresh} from '../../actions/Common';
import {
    Loading,
    NoData,
    ConfirmModal,
    ListMiddleModal,
    ErrorModal,
    filterCityById,
    timeStamp2Time,
    organizationType
} from '../../components/Tool/Tool';
import {ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, CITY_LIST_START, CITY_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition, saveObject} from '../../actions/CommonActions';

export default class OrganizationListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "小区单位管理", link: ''},
            {text: "小区单位列表", link: ''}
        ];
        this.operation = [
            {
                icon: "icon-add-to-list",
                text: Current_Lang.others.add,
                action: "/CustomerService/OrganizationManage/Register"
            }
        ];
        this.currentCity = "";
        this.currentCityId = 3;
        this.searchColumn = "TYPE";
        this.currentOrganization = "";
        this._generate = this._generate.bind(this);
        this._export = this._export.bind(this);
        this._showGenerateModal = this._showGenerateModal.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按类别搜索") {
                self.searchColumn = "TYPE";
            } else {
                self.searchColumn = "ADMIN_NAME";
            }
        })
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _changeCity() {
        var citieid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.currentCityId = citieid;
        this._startRefresh();
    }

    _search() {
        var params = {
            page: 0,
            size: 20,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }
    _showGenerateModal(val){
        this.currentOrganization = val;
        this._startRefresh();
    }
    _generate(id){
        var params={
            generateNum:parseInt($("#personAmount").val()),
            organizationid: id
        }
        this.props.dispatch(saveObject(params,"","",qrcode_generate,"/CustomerService/OrganizationManage"));
    }
    _export(id){
        var params={
            organizationid: id
        };
        this.props.dispatch(saveObject(params,"","",qrcode_export,"/CustomerService/OrganizationManage"));
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
        const {fetching, data, cityList} =this.props;
        console.log("cityList",cityList);
        var cityOptions = [];
        var countryOptions = [];
        if (cityList) {
            if (cityList.status) {
                cityList.data.forEach(function (city, idx) {
                    cityOptions.push(
                        <option key={"city-" + idx} value={city.id}>{city.name}</option>
                    )
                });
                if (this.currentCity == "") {
                    if (cityList.data[0].country) {
                        cityList.data[0].country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }
                } else {
                    if (this.currentCity.country) {
                        this.currentCity.country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }

                }
            }
        }
        var generateInfo = <div>
            <div className="form-horizontal">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {"批量生成二维码"}
                    </legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"小区名称"}</label>
                        <div className="col-lg-9">
                            <input id="organizationName" type="text" value={this.currentOrganization.name} className="form-control"
                                   autoComplete="off" disabled/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"预估人数"}</label>
                        <div className="col-lg-9">
                            <input id="personAmount" type="text" className="form-control" placeholder="输入预估人数"
                                   autoComplete="off"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}></label>
                        <div className="col-lg-9">
                            <div className="text-right">
                                <button type="button" className="btn btn-primary" onClick={this._generate.bind(this,this.currentOrganization.id)}>{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                    </div>


                </fieldset>
            </div>

        </div>;
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
                                    style={{color: '#193153'}} id="search_way">{"按城市搜索"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按城市搜索"}</a></li>
                                </ul>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="citySelect" className="form-control" style={{width: "150px"}}
                                        value={this.currentCityId} onChange={this._changeCity}>
                                    {cityOptions}
                                </select>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="countrySelect" className="form-control" style={{width: "150px"}}>
                                    {countryOptions}
                                </select>
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
                        <legend className="text-bold">{"垃圾分类列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.data ? data.data.content.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <OrganizationListComponent data={data} fetching={fetching}
                                                   _showGenerateModal={this._showGenerateModal}
                                                   _export={this._export}/>

                    </fieldset>
                    <ListMiddleModal id="generateModal" content={generateInfo}
                                     doAction={""}
                                     tip={"批量生成二维码"} actionText="批量生成二维码" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

class OrganizationListComponent extends Component {
    constructor(props) {
        super(props)
    }
    _detail(path) {
        browserHistory.push(path)
    }
    _showGenerateModal(val) {
        this.props._showGenerateModal(val);
    }

    _export(id) {
        this.props._export(id);
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data && data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.name}</td>
                            <td className="text-center">{organizationType(val.type)}</td>
                            <td className="text-center">{val.city}</td>
                            <td className="text-center">{val.county}</td>
                            <td className="text-center">{val.address}</td>
                            <td className="text-center">{timeStamp2Time(val.createTime)}</td>
                            <td className="text-center">{timeStamp2Time(val.updateTime)}</td>
                            <td className="text-center">
                                {<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li style={{display: 'block'}}
                                                onClick={this._detail.bind(this, '/CustomerService/OrganizationManage/Update/:' + val.id)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {"修改"}</a></li>
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#generateModal" onClick={this._showGenerateModal.bind(this,val)}><i
                                                    className=" icon-office"></i>
                                                    {"批量生成二维码"}</a>
                                            </li>
                                            <li style={{display: 'block'}} onClick={this._export.bind(this,val.id)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {"批量导出二维码"}</a></li>
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
                    <tr style={{fontWeight: 'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold text-center">{"名称"}</th>
                        <th className="col-md-1 text-bold text-center">{"组织类型"}</th>
                        <th className="col-md-1 text-bold text-center">{"所在城市"}</th>
                        <th className="col-md-1 text-bold text-center">{"所在区县"}</th>
                        <th className="col-md-3 text-bold text-center">{"地址"}</th>
                        <th className="col-md-2 text-bold text-center">{"创建时间"}</th>
                        <th className="col-md-2 text-bold text-center">{"修改时间"}</th>
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
    const {getOrganizationList, getCityList, commonReducer}=state;
    return {
        fetching: getOrganizationList.fetching,
        data: getOrganizationList.data,
        cityList: getCityList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(OrganizationListContainer)