/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, ErrorModal, filterCityById, array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {
    CITY_LIST_START,
    CITY_LIST_END,
    ORGANIZATION_UPDATE_START,
    ORGANIZATION_UPDATE_END
} from '../../constants/index.js';
import {getListByMutilpCondition, saveObject, getDetail} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class OrganizationUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "小区单位管理", link: ''},
            {text: "小区单位修改", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text: "返回小区单位列表", action: "/CustomerService/OrganizationManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh = this._startRefresh.bind(this)
    }

    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        this.props.dispatch(getDetail(parseInt(this.props.params.id.substring(1)), ORGANIZATION_UPDATE_START, ORGANIZATION_UPDATE_END, organization_detail));
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _save(id,params) {
        this.props.dispatch(saveObject(params,"","",organization_update+"?id="+id,"/CustomerService/OrganizationManage","update"));
    }

    render() {
        const {cityList, data, fetching}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <UpdateOrganizationComponent cityList={cityList} data={data} _save={this._save} fetching={fetching}
                                                 _startRefresh={this._startRefresh}/>
                </div>
            </div>
        )
    }
}

class UpdateOrganizationComponent extends Component {
    constructor(props) {
        super(props);
        this.currentCityId = "";
        this.currentCity = "";
        this._save = this._save.bind(this);
        this._changeCity = this._changeCity.bind(this);
    }
    componentDidMount() {
        $("#updateOrganizationForm").validate({
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
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent().parent().find(".errorShow"));
            }
        });
    }
    _changeCity() {
        var citieid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.currentCityId = citieid;
        this.props._startRefresh();
    }

    _save(id) {
        var formFields = $("#updateOrganizationForm").serializeArray();
        var params = array2Json(formFields);
        if($("#updateOrganizationForm").validate().form()){
            this.props._save(id,params);
        }
    }

    render() {
        const {cityList, data, fetching}=this.props;
        var detail = "";
        var cityOptions = [];
        var countryOptions = [];
        var tableHeight = ($(window).height() - 130);
        if (data) {
            if (cityList) {
                if (cityList.status) {
                    cityList.data.forEach(function (city, idx) {
                        cityOptions.push(
                            <option key={"city-" + idx} value={city.id}>{city.name}</option>
                        )
                    });
                    if (this.currentCity == "") {
                        this.currentCity = filterCityById(cityList.data, data.data.cityid);
                    }
                    if (this.currentCity.country) {
                        this.currentCity.country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }

                }
            }
            if (this.currentCityId == "") {
                this.currentCityId = data.data.cityid;
            }
            detail =
                <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                    <div className="col-sm-8 col-sm-offset-2">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"垃圾分类基础信息"}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"城市"}</label>
                                <div className="col-lg-6">
                                    <select id="citySelect" className="form-control" name="cityid"
                                            value={this.currentCityId} onChange={this._changeCity}>
                                        {cityOptions}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"区县"}</label>
                                <div className="col-lg-6">
                                    <select id="coutrySelect" className="form-control" name="countyid" defaultValue={data.data.countyid}>
                                        {countryOptions}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center'
                                       }}>{"名称"}</label>
                                <div className="col-lg-6">
                                    <input name="name" type="text" className="form-control"
                                           defaultValue={data.data.name} required="required"
                                           autoComplete="off"/>
                                </div>
                                <div className="col-lg-3 errorShow"></div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"类型"}</label>
                                <div className="col-lg-6">
                                    <select id="typeSelect" className="form-control" name="type" defaultValue={data.data.type}>
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
                                <div className="col-lg-6">
                                    <input name="address" type="text" className="form-control"
                                           defaultValue={data.data.address} required="required"
                                           autoComplete="off"/>
                                </div>
                                <div className="col-lg-3 errorShow"></div>
                            </div>
                        </fieldset>

                        <div className="form-group">
                            <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                <button type="button" className="btn btn-primary"
                                        onClick={this._save.bind(this,data.data.id)}>{"保存"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
        } else {
            detail = <Loading/>
        }
        return (
            <form id="updateOrganizationForm" className="form-horizontal" action="#">
                {detail}
            </form>
        )

    }
}

function mapStateToProps(state) {
    const {getCityList,getOrganizationDetail, commonReducer}=state
    return {
        cityList: getCityList.data,
        data: getOrganizationDetail.data,
        fetching: getOrganizationDetail.fetching,
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(OrganizationUpdateContainer)