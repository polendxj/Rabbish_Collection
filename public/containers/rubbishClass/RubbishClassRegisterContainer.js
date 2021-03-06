/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, serverStatus, ErrorModal, DecodeBase64, array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveObject} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class RubbishClassRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "垃圾分类", link: ''},
            {text: "垃圾分类注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回垃圾分类列表", action: "/DataManage/RubbishClass"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this)
    }

    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",classConf_register,"/DataManage/RubbishClass"));
    }

    render() {
        const {data, form,refresh}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterRubbishClassComponent _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class RegisterRubbishClassComponent extends Component{
    constructor(props) {
        super(props)
        this._save = this._save.bind(this)
    }

    _search() {
        this.props._startRefresh();
    }

    _save() {
        var formFields = $("#registerClassifyForm").serializeArray();
        var params = array2Json(formFields);
        if($("#registerClassifyForm").validate().form()){
            this.props._save(params);
        }
    }


    componentDidMount() {
        $("#registerClassifyForm").validate({
            ignore: 'input[type=hidden], .select2-input', // ignore hidden fields
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },

            validClass: "validation-valid-label",
            success: function(label) {
                label.addClass("validation-valid-label").text("Success.")
            },
            errorPlacement: function(error, element) {
                if(element.parent().hasClass("input-group")){
                    error.appendTo(element.parent().parent().parent().find(".errorShow"));
                }else{
                    error.appendTo(element.parent().parent().find(".errorShow"));
                }
            }
        });
    }

    render() {
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="registerClassifyForm" className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"垃圾分类基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"分类名称"}</label>
                                    <div className="col-lg-6">
                                        <input name="name" type="text" className="form-control"
                                               placeholder={"分类名称"} required="required"
                                               autoComplete="off"/>
                                    </div>
                                    <div className="col-lg-3 errorShow"></div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2" style={{textAlign: 'center'}}>{"奖励积分"}</label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input name="rewardPoints" type="number" className="form-control"
                                                   placeholder={"奖励积分"}
                                                   autoComplete="off" required="required"/>
                                            <span className="input-group-addon">每次/每千克</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 errorShow"></div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"计分方式"}</label>
                                    <div className="col-lg-6">
                                        <select name="pointsType" defaultValue={1} className="form-control">
                                            <option value={1}>按重量计分</option>
                                            <option value={2}>按次数计分</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"分类描述"}</label>
                                    <div className="col-lg-6">
                                    <textarea name="description" rows="5" cols="5" className="form-control"
                                              placeholder={"分类描述"}></textarea>
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
    const {commonReducer}=state
    return {
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(RubbishClassRegisterContainer)