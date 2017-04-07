/**
 * Created by Administrator on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal, ListMiddleModal, organizationType} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import {getListByMutilpCondition, saveObject, deleteObject} from '../actions/CommonActions'
import {CITY_LIST_START, CITY_LIST_END} from '../constants/index.js'
import classnames from 'classnames'
import {commonRefresh} from '../actions/Common';

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
        ];
        this.selectedCity = "";
        this.selectedCountry = "";
        this.cityCountry = [];
        this.CountryOrg = [];

        this._selectObj = this._selectObj.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._changeCountry = this._changeCountry.bind(this);
        this._deleteCity = this._deleteCity.bind(this);
        this._deleteCountry=this._deleteCountry.bind(this);
        this._deleteOrz=this._deleteOrz.bind(this);
    }

    _search() {

    }

    _addOrz() {
        var self=this;
        var params = {
            cityid: this.selectedCity.id,
            countyid: this.selectedCountry.id,
            name: $("#orgName").val(),
            address: $("#description").val(),
            type: $("#orgType").val()
        }
        this.props.dispatch(saveObject(params, "", "", organization_register, "", "add", function () {
            var params = {page: 0, size: page_size};
            $("#orgName").val("");
            $("#description").val("");
            self.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        }));
    }

    _deleteOrz(id) {
        var params = {
            cityid: this.selectedCity.id,
            countyid:this.selectedCountry.id,
            id: id
        }
        this.props.dispatch(deleteObject(params,0,"","","","",CITY_LIST_START, CITY_LIST_END,organization_delete,city_list));
        setTimeout(function () {
            $("#homeModal").modal("hide");
        },1000);


    }

    _deleteCountry(id) {
        var params = {
            cityid: this.selectedCity.id,
            id: id
        }
        this.props.dispatch(deleteObject(params,0,"","","","",CITY_LIST_START, CITY_LIST_END,country_delete,city_list));
        setTimeout(function () {
            $("#countryModal").modal("hide");
        },1000);
    }

    _deleteCity(id) {
        var self=this;
        var params = {
            id: id
        }
        ConfirmModal("告警！","确认删除该城市吗？",function () {
            self.props.dispatch(deleteObject(params,0,"","","","",CITY_LIST_START, CITY_LIST_END,city_delete,city_list));
        });

    }
    _changeCountry(city, country) {
        var self = this;
        this.props.data.data.forEach(function (val, key) {
            if (val.id == city.id) {
                self.props.data.data[key].country.forEach(function (v, k) {
                    if (v.id == country.id) {
                        self.props.data.data[key].countryIndex = k;
                    }
                });
            }
        });
        this._startRefresh();
    }

    _addCountry() {
        var params = {
            cityid: this.selectedCity.id,
            name: $("#countryName").val(),
            description: $("#countryDescription").val()
        }
        var self = this;
        this.props.dispatch(saveObject(params, "", "", country_register, "", "add", function () {
            var params = {page: 0, size: page_size};
            $("#countryName").val("");
            $("#countryDescription").val("");
            self.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        }));
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

    _selectObj(city, country, flag) {
        var self = this;
        this.selectedCity = city;
        this.selectedCountry = country;
        console.log("---")
        console.log(this.selectedCity)
        this._startRefresh();
        if (flag == 0) {
            this.props.data.data.forEach(function (val, key) {
                if (val.id == city.id) {
                    self.cityCountry = self.props.data.data[key];
                }
            });

        } else if (flag == 1) {
            this.props.data.data.forEach(function (val, key) {
                if (val.id == city.id) {
                    self.props.data.data[key].country.forEach(function (v, k) {
                        if (v.id == country.id) {
                            self.CountryOrg = self.props.data.data[key].country[k];
                        }
                    });
                }
            });
        }
        console.log("selectedCity", self.cityCountry);
        console.log("selectedCountry", self.CountryOrg);
    }

    componentDidMount() {
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    render() {
        const {fetching, data}=this.props;
        var loginUserType = sessionStorage['type'];
        console.log("citySetting", data);
        var countryTRS = [];
        var self=this;
        if (this.cityCountry && this.cityCountry.country) {
            this.cityCountry.country.forEach(function (c, ck) {
                countryTRS.push(
                    <tr key={"country-detail" + ck}>
                        <td>{ck + 1}</td>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td style={{display:loginUserType==10? 'block':'none'}}>
                            <ul className="icons-list" style={{display:loginUserType==10? 'block':'none'}}>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" onClick={self._deleteCountry.bind(this,c.id)}><i className=" icon-trash"></i>
                                                {"删除行政区"}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                );
            });
        }
        var orgTRS = [];
        if (this.CountryOrg && this.CountryOrg.organization && this.CountryOrg.organization.content.length > 0) {
            this.CountryOrg.organization.content.forEach(function (v, k) {
                orgTRS.push(
                    <tr key={"detail-org-" + k}>
                        <td>{k + 1}</td>
                        <td>{v.name}</td>
                        <td>{organizationType(v.type)}</td>
                        <td>
                            <ul className="icons-list" style={{display:loginUserType==10? 'block':'none'}}>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {/*<li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                         <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                         账户详情</a></li>*/}
                                        <li>
                                            <a href="javascript:void(0)" onClick={self._deleteOrz.bind(self,v.id)}><i className=" icon-trash"></i>
                                                {"删除小区"}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                );
            });
        }
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
                        {countryTRS}
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
                                    <input id="countryName" type="text" className="form-control" placeholder="行政区名称"
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"描 述"}</label>
                                <div className="col-lg-9">
                                    <textarea id="countryDescription" type="text" className="form-control"
                                              placeholder="描 述"
                                              autoComplete="off"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-9">
                                    <div className="text-right">
                                        <button onClick={this._addCountry.bind(this)} type="button"
                                                className="btn btn-primary">{Current_Lang.label.save}
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
                        {orgTRS}

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
                                    <input id="orgName" type="text" className="form-control" placeholder="名称"
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="control-label col-lg-2" style={{textAlign: 'center'}}>{"小区类型"}</label>
                                <div className="col-lg-9">
                                    <label className="radio-inline">
                                        <input id="orgType" className="radio-access"
                                               type="radio" value={1}
                                               name="orgType" defaultChecked="true"/>
                                        {"居民小区"}
                                    </label>

                                    <label className="radio-inline">
                                        <input id="blacklistBtn" className="radio-access" type="radio" value={2}
                                               name="orgType"/>
                                        {"政府/学校"}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"地 址"}</label>
                                <div className="col-lg-9">
                                    <textarea id="description" type="text" className="form-control" placeholder="地 址"
                                              autoComplete="off"></textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-9">
                                    <div className="text-right">
                                        <button onClick={this._addOrz.bind(this)} type="button"
                                                className="btn btn-primary">{Current_Lang.label.save}
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
                             icon={'icon-city'}
                             operation={this.operation}/>
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>

                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"区域设置列表"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <CitySettingComponent data={data} _selectObj={this._selectObj}
                                              _changeCountry={this._changeCountry}
                                              _deleteCity={this._deleteCity}
                        />

                    </fieldset>
                </div>
                <ListMiddleModal id="countryModal" content={countryInfo}
                                 doAction={""}
                                 tip={"行政区设置 （" + this.selectedCity.name + "）"} actionText="行政区设置" hide="true"
                                 hideCancel="true"/>
                <ListMiddleModal id="homeModal" content={organizationInfo}
                                 doAction={""}
                                 tip={"小区设置 （" + this.selectedCity.name + "-" + this.selectedCountry.name + "）"}
                                 actionText="小区设置" hide="true" hideCancel="true"/>

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
        const {data, _changeCountry,_deleteCity}=this.props;
        var self = this;
        var loginUserType = sessionStorage['type'];
        var tableHeight = ($(window).height() - 240);
        var tbody = [];
        var count = 0;
        if (data) {
            if (data.data.length > 0) {
                data.data.forEach(function (val, key) {
                    var country = [];
                    var organization = [];
                    if (val.country) {
                        val.country.forEach(function (c, ck) {
                            country.push(
                                <tr onClick={_changeCountry.bind(self, val, c)} key={"city" + key + "country" + ck}
                                    className={classnames({active: ck == val.countryIndex})}>
                                    <td style={{borderTop: "0 red solid", cursor: "pointer"}}>{c.name}</td>
                                </tr>
                            )
                        })
                        if (val.country[val.countryIndex].organization.content.length > 0) {
                            console.log(val.country[val.countryIndex])
                            val.country[val.countryIndex].organization.content.forEach(function (o, ok) {
                                organization.push(
                                    <tr key={"city" + key + "country" + val.countryIndex + "org" + ok + (count++)}>
                                        <td style={{width: "50px"}}>{ok + 1}</td>
                                        <td style={{width: "200px"}}>{o.name}</td>
                                        <td style={{width: "150px"}}>{organizationType(o.type)}</td>
                                        <td>{o.address}</td>
                                    </tr>
                                )
                            })
                        } else {
                            organization.push(
                                <tr key={"no_org"}>
                                    <td colSpan="20"><NoData text="无任何小区信息"/></td>
                                </tr>
                            )
                        }
                    } else {
                        country.push(
                            <tr key={"city" + key + "country" + "none"}>
                                <td style={{borderTop: "0 red solid", cursor: "pointer"}}>
                                    <NoData text="无行政区"/>
                                </td>
                            </tr>
                        )
                        organization.push(
                            <tr key={"no_org"}>
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
                            <td style={{verticalAlign: "top"}}>
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
                                                   data-target="#countryModal"
                                                   onClick={self.props._selectObj.bind(self, val, val.country ? val.country[val.countryIndex] : -1, 0)}><i
                                                    className=" icon-office"></i>
                                                    {"行政区设置"}</a></li>
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#homeModal"
                                                   onClick={self.props._selectObj.bind(self, val, val.country ? val.country[val.countryIndex] : -1, 1)}><i
                                                    className="icon-home4"></i>
                                                    {"小区设置"}</a></li>
                                            <li style={{display:loginUserType==10? 'block':'none'}}>
                                                <a href="javascript:void(0)" onClick={_deleteCity.bind(self,val.id)}><i className=" icon-trash"></i>
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
    const {getCityList, commonReducer}=state
    return {
        fetching: getCityList.fetching,
        data: getCityList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(CitySettingContainer)