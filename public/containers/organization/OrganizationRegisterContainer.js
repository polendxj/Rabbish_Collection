/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, ErrorModal, filterCityById,array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {CITY_LIST_START, CITY_LIST_END} from '../../constants/index.js';
import {getListByMutilpCondition,saveObject} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class OrganizationRegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "小区单位管理", link: ''},
            {text: "小区单位注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回小区单位列表", action: "/CustomerService/OrganizationManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this)
    }
    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
    }
    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",organization_register,"/CustomerService/OrganizationManage"));
    }

    render() {
        const {cityList}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterOrganizationComponent cityList={cityList} _save={this._save} _startRefresh={this._startRefresh}/>
                </div>
            </div>
        )
    }
}

class RegisterOrganizationComponent extends Component{
    constructor(props) {
        super(props);
        this.currentCityId = 3;
        this.currentCity = "";
        this._save = this._save.bind(this);
        this._changeCity = this._changeCity.bind(this);
    }
    componentDidMount() {
        $("#organizationForm").validate({
            ignore: 'input[type=hidden], .select2-input', // ignore hidden fields
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },

            validClass: "validation-valid-label",
            success: function (label) {
                label.addClass("validation-valid-label").text("Success.")
            }
        });
    }
    _changeCity() {
        var citieid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.currentCityId = citieid;
        this.props._startRefresh();
    }
    _save() {
        var formFields = $("#organizationForm").serializeArray();
        var params = array2Json(formFields);
        if($("#organizationForm").validate().form()){
            this.props._save(params);
        }

    }

    render() {
        const {cityList}=this.props;
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
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="organizationForm" className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"小区单位基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"城市"}</label>
                                    <div className="col-lg-9">
                                        <select id="citySelect" className="form-control" name="cityid" value={this.currentCityId} onChange={this._changeCity}>
                                            {cityOptions}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"区县"}</label>
                                    <div className="col-lg-9">
                                        <select id="coutrySelect" className="form-control" name="countyid">
                                            {countryOptions}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"名称"}</label>
                                    <div className="col-lg-9">
                                        <input name="name" type="text" className="form-control"
                                               placeholder={"名称"} required="required"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"类型"}</label>
                                    <div className="col-lg-9">
                                        <select id="typeSelect" className="form-control" name="type">
                                            <option value={1}>小区</option>
                                            <option value={2}>政府机构/学校</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"地址"}</label>
                                    <div className="col-lg-9">
                                        <input name="address" type="text" className="form-control"
                                               placeholder={"地址"} required="required"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group" >
                                <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._save.bind(this)}>{"保存"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {getCityList,commonReducer}=state
    return {
        cityList: getCityList.data,
        fetching: getCityList.fetching,
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(OrganizationRegisterContainer)