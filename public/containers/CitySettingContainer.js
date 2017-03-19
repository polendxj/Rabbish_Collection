/**
 * Created by Administrator on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal, ListMiddleModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import {getListByMutilpCondition} from '../actions/CommonActions'
import {CITY_LIST_START, CITY_LIST_END} from '../constants/index.js'
import classnames from 'classnames'

export default class CitySettingContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "区域设置", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: "添加城市", action: "/DataManage/CitySetting/Register"}
        ]
    }

    _search() {

    }

    _changePage(page) {
        this.page = page
    }

    _prePage(page) {
        this.page = this.page - 1
    }

    _nextPage(page) {
        this.page = this.page + 1
    }

    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
    }

    render() {
        const {fetching, data}=this.props;
        console.log("citySetting",data);
        var countryInfo = <div>
            <ul className="nav nav-tabs">
                <li
                    className="active"
                    style={{fontWeight: 'bold'}}><a
                    href="#justified-right-icon-tab1" data-toggle="tab"><i
                    className="icon-office position-left"></i> {"行政区列表"}</a>
                </li>
                <li
                    style={{fontWeight: 'bold'}}><a
                    href="#justified-right-icon-tab2"
                    data-toggle="tab"><i
                    className=" icon-database-add position-left"></i> {"新增行政区"}</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active"
                     id="justified-right-icon-tab1">
                    <table className="table table-bordered table-striped text-center">
                        <thead>
                        <tr style={{color: "black"}}>
                            <th className="text-center text-bold" style={{width: "50px"}}>{"#"}</th>
                            <th className="text-center  text-bold" style={{width: "150px"}}>{"行政区名称"}</th>
                            <th className="text-center text-bold">{"描 述"}</th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>崇阳</td>
                            <td>这是一个垃圾非常多的地方，需要重点推广我们的App市场...</td>
                            <td>
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            {/*<li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                             <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                             账户详情</a></li>*/}
                                            <li>
                                                <a href="javascript:void(0)"><i className=" icon-trash"></i>
                                                    {"删除行政区"}</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div className="tab-pane"
                     id="justified-right-icon-tab2">
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"基本信息"}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"行政区名称"}</label>
                                <div className="col-lg-9">
                                    <input id="name" type="text" className="form-control" placeholder="行政区名称"
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"描 述"}</label>
                                <div className="col-lg-9">
                                    <textarea id="name" type="text" className="form-control" placeholder="描 述"
                                              autoComplete="off"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-9">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary">{Current_Lang.label.save}
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </fieldset>
                    </div>

                </div>
            </div>
        </div>

        var organizationInfo = <div>
            <ul className="nav nav-tabs">
                <li
                    className="active"
                    style={{fontWeight: 'bold'}}><a
                    href="#justified-right-icon-tab3" data-toggle="tab"><i
                    className="icon-office position-left"></i> {"小区列表"}</a>
                </li>
                <li
                    style={{fontWeight: 'bold'}}><a
                    href="#justified-right-icon-tab4"
                    data-toggle="tab"><i
                    className=" icon-database-add position-left"></i> {"新增小区"}</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane active"
                     id="justified-right-icon-tab3">
                    <table className="table table-bordered table-striped text-center">
                        <thead>
                        <tr style={{color: "black"}}>
                            <th className="text-center text-bold" style={{width: "50px"}}>{"#"}</th>
                            <th className="text-center  text-bold" style={{width: "150px"}}>{"小区名称"}</th>
                            <th className="text-center  text-bold" style={{width: "150px"}}>{"小区类型"}</th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>金源世家</td>
                            <td>居民小区</td>
                            <td>
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            {/*<li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                             <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                             账户详情</a></li>*/}
                                            <li>
                                                <a href="javascript:void(0)"><i className=" icon-trash"></i>
                                                    {"删除小区"}</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
                <div className="tab-pane"
                     id="justified-right-icon-tab4">
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"基本信息"}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"小区名称"}</label>
                                <div className="col-lg-9">
                                    <input id="name" type="text" className="form-control" placeholder="名称"
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="control-label col-lg-2" style={{textAlign: 'center'}}>{"小区类型"}</label>
                                <div className="col-lg-9">
                                    <label className="radio-inline">
                                        <input id="whitelistBtn" className="radio-access"
                                               type="radio" value={1}
                                               name="accesscontrol" defaultChecked="true"/>
                                        {"居民小区"}
                                    </label>

                                    <label className="radio-inline">
                                        <input id="blacklistBtn" className="radio-access" type="radio" value={2}
                                               name="accesscontrol"/>
                                        {"政府/学校"}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"描 述"}</label>
                                <div className="col-lg-9">
                                    <textarea id="name" type="text" className="form-control" placeholder="描 述"
                                              autoComplete="off"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-9">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary">{Current_Lang.label.save}
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </fieldset>
                    </div>

                </div>
            </div>
        </div>
        return (
            <div>
                <BreadCrumbs breadCrumbs={this.breadCrumbs}
                             icon={'icon-dribbble3'}
                             operation={this.operation}/>
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid', marginRight: '10px'}}>
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false" style={{
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    fontWeight: 'bold',
                                    color: '#193153'
                                }}>{Current_Lang.label.deviceStatus}：<span
                                    style={{color: '#193153'}} id="cse_status_text">{Current_Lang.label.all}</span>
                                    <span
                                        className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#"> {Current_Lang.label.all}</a></li>
                                    <li><a href="#"> {Current_Lang.status.online}</a></li>
                                    <li><a href="#"> {Current_Lang.status.offline}</a></li>
                                    <li><a href="#"> {Current_Lang.status.stopped}</a></li>
                                </ul>
                            </li>
                            <li>
                                <input id="hostname" style={{
                                    border: '0 red solid',
                                    borderRadius: '0'
                                }} type="text" className="form-control"
                                       placeholder={Current_Lang.tableTitle.CSEName}
                                       data-popup="tooltip"
                                       title={Current_Lang.tableTitle.CSEName}
                                       data-html="true"/>
                            </li>
                            <li>
                                <input id="ip" style={{
                                    border: '0 red solid',
                                    borderRadius: '0'
                                }} type="text" className="form-control" placeholder={Current_Lang.label.CSEIP}
                                       data-popup="tooltip"
                                       title={Current_Lang.label.CSEIP}
                                       data-html="true"/>
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
                        <legend className="text-bold">{"区域设置列表"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <CitySettingComponent data={data}/>

                    </fieldset>
                </div>
                <ListMiddleModal id="countryModal" content={countryInfo}
                                 doAction={""}
                                 tip={"行政区设置 （崇州）"} actionText="行政区设置" hide="true" hideCancel="true"/>
                <ListMiddleModal id="homeModal" content={organizationInfo}
                                 doAction={""}
                                 tip={"小区设置 （崇州-崇阳区）"} actionText="小区设置" hide="true" hideCancel="true"/>

            </div>
        )
    }

}

class CitySettingComponent extends Component {
    componentDidMount() {
        var tBodyTimer = setInterval(function () {
            if (this.props.data) {
                console.log(this.props.data)
                clearInterval(tBodyTimer);
            }

        }.bind(this), 500)
    }

    render() {
        const {data}=this.props;
        var tableHeight = ($(window).height() - 240);
        var tbody = [];
        if (data) {
            if (data.data.length > 0) {
                data.data.forEach(function (val, key) {
                    var country = [];
                    var organization=[];
                    if(val.country){
                        val.country.forEach(function (c, ck) {
                            country.push(
                                <tr key={"city" + key+"country" + ck} className={classnames({active: ck == 0})}>
                                    <td style={{borderTop: "0 red solid", cursor: "pointer"}}>{c.name}</td>
                                </tr>
                            )
                        })
                        if(val.country[val.countryIndex].organization){
                            console.log(val.country[val.countryIndex])
                            val.country[val.countryIndex].organization.content.forEach(function (o, ok) {
                                organization.push(
                                    <tr>
                                        <td style={{width:"50px"}}>{ok+1}</td>
                                        <td style={{width:"200px"}}>{o.name}</td>
                                        <td style={{width:"150px"}}>{o.type}</td>
                                        <td>{o.address}</td>
                                    </tr>
                                )
                            })
                        }else{
                            organization.push(
                                <tr>
                                    <td colSpan="20"><NoData text="无任何小区信息"/></td>
                                </tr>
                            )
                        }
                    }else{
                        country.push(
                            <tr key={"city" + key+"country" + "none"} >
                                <td style={{borderTop: "0 red solid", cursor: "pointer"}}>
                                    <NoData text="无行政区" />
                                </td>
                            </tr>
                        )
                        organization.push(
                            <tr>
                                <td colSpan="20"><NoData text="无任何小区信息"/></td>
                            </tr>
                        )
                    }
                    tbody.push(
                        <tbody key={"city" + key}>
                        <tr>
                            <td style={{textAlign: 'center'}}>
                                {val.name}
                            </td>
                            <td style={{verticalAlign: "top"}}>
                                <div className="table-responsive">
                                    <table className="table text-center table-hover">
                                        <tbody>
                                        {country}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                            <td>
                                <div className="table-responsive pre-scrollable">
                                    <table className="table table-bordered  text-center">
                                        <tbody>
                                        {organization}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                            <td>
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            {/*<li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                             <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                             账户详情</a></li>*/}
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#countryModal"><i className=" icon-office"></i>
                                                    {"行政区设置"}</a></li>
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#homeModal"><i className="icon-home4"></i>
                                                    {"小区设置"}</a></li>
                                            <li>
                                                <a href="javascript:void(0)"><i className=" icon-trash"></i>
                                                    {"删除城市"}</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    )
                })

            } else {
                tbody.push(
                    <tbody key={"loading"}>
                    <tr>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData/>
                        </td>
                    </tr>
                    </tbody>
                )
            }
        } else {
            tbody.push(
                <tbody key={"nodata"}>
                <tr>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <Loading/>
                    </td>
                </tr>
                </tbody>
            )
        }


        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered">
                    <thead>
                    <tr style={{color: "black"}}>
                        <th className="text-center text-bold" style={{width: "200px"}}>{"城 市"}</th>
                        <th className="text-center  text-bold" style={{width: "150px"}}>{"行政区"}</th>
                        <th className="text-center text-bold">{"小 区"}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    {tbody}
                </table>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {getCityList}=state
    return {
        fetching: getCityList.fetching,
        data: getCityList.data
    }
}


export default connect(mapStateToProps)(CitySettingContainer)