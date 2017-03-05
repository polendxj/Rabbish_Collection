/**
 * Created by Administrator on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal, ListMiddleModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'

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

    render() {
        const {data}=this.props;
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
                                    <input  id="name" type="text" className="form-control" placeholder="行政区名称"
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"描 述"}</label>
                                <div className="col-lg-9">
                                    <textarea  id="name" type="text" className="form-control" placeholder="描 述"
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
                                    <input  id="name" type="text" className="form-control" placeholder="名称"
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
                                    <textarea  id="name" type="text" className="form-control" placeholder="描 述"
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
                            <Pagenation counts={data ? data.length : 3} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <CitySettingComponent />

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
    render() {
        var tableHeight = ($(window).height() - 240);

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
                    <tbody>
                    <tr>
                        <td style={{textAlign: 'center'}}>
                            崇州
                        </td>
                        <td style={{verticalAlign: "top"}}>
                            <div className="table-responsive">
                                <table className="table text-center table-hover">
                                    <tbody>
                                    <tr className="active">
                                        <td style={{borderTop: "0 red solid", cursor: "pointer"}}>田家庵</td>
                                    </tr>
                                    <tr>
                                        <td style={{cursor: "pointer"}}>重阳</td>
                                    </tr>
                                    <tr>
                                        <td style={{cursor: "pointer"}}>谢家集</td>
                                    </tr>
                                    <tr>
                                        <td style={{cursor: "pointer"}}>金牛区</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td>
                            <div className="table-responsive pre-scrollable">
                                <table className="table table-bordered table-striped text-center">
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>金源世家</td>
                                        <td>居民小区</td>
                                        <td>成都市武侯区大四喜街道9002号38弄</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
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
                    <tbody>
                    <tr>
                        <td style={{textAlign: 'center'}}>
                            崇州
                        </td>
                        <td style={{verticalAlign: "top"}}>
                            <div className="table-responsive">
                                <table className="table text-center table-hover">
                                    <tbody>
                                    <tr className="active">
                                        <td style={{borderTop: "0 red solid", cursor: "pointer"}}>田家庵</td>
                                    </tr>
                                    <tr>
                                        <td style={{cursor: "pointer"}}>重阳</td>
                                    </tr>
                                    <tr>
                                        <td style={{cursor: "pointer"}}>谢家集</td>
                                    </tr>
                                    <tr>
                                        <td style={{cursor: "pointer"}}>金牛区</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td>
                            <div className="table-responsive pre-scrollable">
                                <table className="table table-bordered table-striped text-center">
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>金源世家</td>
                                        <td>居民小区</td>
                                        <td>成都市武侯区大四喜街道9002号38弄</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>西南交通大学</td>
                                        <td>政府机构</td>
                                        <td>成都市郫县西南交通大学犀浦校区10000号，三山街交汇处</td>
                                    </tr>
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
                </table>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {}=state
    return {}
}


export default connect(mapStateToProps)(CitySettingContainer)