/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {
    Loading,
    ListModal,
    serverStatus,
    ErrorModal,
    DecodeBase64,
    streamingTemplateFilter
} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveServiceGroup} from '../../actions/SystemManagerServiceGroupAction';
import {commonRefresh} from '../../actions/Common';
import {CLASSCONF_LIST_START, CLASSCONF_LIST_END} from '../../constants/index.js';
import {getListByMutilpCondition, saveObject} from '../../actions/CommonActions';

export default class ManualRecordRegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "垃圾称量", link: ''},
            {text: "垃圾称量注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text: "返回垃圾称量列表", action: "/DataManage/ManualRecord"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh = this._startRefresh.bind(this)
    }

    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_list));
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveObject(params, "", "", manualRecord_register, "/DataManage/ManualRecord"));
    }

    render() {
        const {data}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterManualRecordComponent data={data} _save={this._save} _startRefresh={this._startRefresh}/>
                </div>
            </div>
        )
    }
}

class RegisterManualRecordComponent extends Component {
    constructor(props) {
        super(props);
        this._save = this._save.bind(this);
    }

    _save() {
        var rangeTime = $(".daterange-manuRecord").val();
        var params = {
            classid: parseInt($("#classify").val()),
            weight: parseInt($("#weight").val()),
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime(),
            description: $("#description").val()
        };
        if ($("#registerManualForm").validate().form()) {
            this.props._save(params);
        }
    }

    _appOnChange() {
        this.props._startRefresh();
    }

    componentDidMount() {
        var self = this;
        $('.daterange-manuRecord').daterangepicker({
            timePicker: true,
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            locale: dateLocale
        });
        $("#registerManualForm").validate({
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
                if(element.parent().hasClass("input-group")){
                    error.appendTo(element.parent().parent().parent().find(".errorShow"));
                }else{
                    error.appendTo(element.parent().parent().find(".errorShow"));
                }
            },
            rules: {
                weight: {
                    number:true
                }
            }
        });

    }

    render() {
        const {data}=this.props;
        const options = [];
        if (data) {
            if (data.status) {
                data.data.forEach(function (val, key) {
                    options.push(
                        <option key={"option" + key} value={val.id}>{val.name}</option>
                    )
                })
            }
        }
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="registerManualForm" className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"垃圾称量基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"分类"}</label>
                                    <div className="col-lg-6">
                                        <select id="classify" className="form-control">
                                            {options}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label col-lg-2" style={{textAlign: 'center'}}>{"重量"}</label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input id="weight" name="weight" type="text" className="form-control"
                                                   placeholder={"重量"} required="required"
                                                   autoComplete="off"/>
                                                <span className="input-group-addon">千克</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 errorShow"></div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"起止时间"}</label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input type="text" className="form-control daterange-manuRecord"/>
                                            <span className="input-group-addon"><i
                                                className="icon-calendar22"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"分类描述"}</label>
                                    <div className="col-lg-6">
                                        <textarea id="description" rows="5" cols="5" className="form-control"
                                              placeholder={"分类描述"}></textarea>
                                    </div>
                                </div>

                            </fieldset>

                            <div className="form-group">
                                <div className="col-lg-8 text-right" style={{marginTop: "50px"}}>
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
    const {getClassConfList}=state;
    return {
        data: getClassConfList.data
    }
}

export default connect(mapStateToProps)(ManualRecordRegisterContainer)