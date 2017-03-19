/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveObject} from '../../actions/CommonActions';

export default class TransitLineRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "车辆运输", link: ''},
            {text: "车辆运输注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回车辆运输列表", action: "/DataManage/TransitLine"}
        ];
        this._save = this._save.bind(this);
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",transitLine_register,"/DataManage/TransitLine"));
    }

    render() {
        const {data, form}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterTransitLineComponent _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class RegisterTransitLineComponent extends Component{
    constructor(props) {
        super(props);
        this._save = this._save.bind(this)
    }

    _save() {
        var formFields = $("#transitLineForm").serializeArray();
        var params = array2Json(formFields);
        this.props._save(params);
    }

    componentDidMount() {

    }

    render() {

        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="transitLineForm" className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"车辆运输基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                               marginTop: '8px'
                                           }}>{"车牌号"}</label>
                                    <div className="col-lg-9">
                                        <input id="licensePlateNum" name="licensePlateNum" type="text" className="form-control"
                                               placeholder={"车牌号"}
                                               autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"司机姓名"}</label>
                                    <div className="col-lg-9">
                                        <input id="driver" name="driver" type="text" className="form-control"
                                               placeholder={"司机姓名"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"联系方式"}</label>
                                    <div className="col-lg-9">
                                        <input id="contact" name="contact" type="text" className="form-control"
                                               placeholder={"联系方式"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"驾照"}</label>
                                    <div className="col-lg-9">
                                        <input id="drivingLicenseNum" name="drivingLicenseNum" type="text" className="form-control"
                                               placeholder={"驾照"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"起点"}</label>
                                    <div className="col-lg-9">
                                        <input id="startLocation" name="startLocation" type="text" className="form-control"
                                               placeholder={"起点"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"经停地点"}</label>
                                    <div className="col-lg-9">
                                        <input id="stoppedLocation" name="stoppedLocation" type="text" className="form-control"
                                               placeholder={"经停地点"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"终点"}</label>
                                    <div className="col-lg-9">
                                        <input id="endLocation" name="endLocation" type="text" className="form-control"
                                               placeholder={"终点"}
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
    const {changeSearch1Type, form, adminSave,commonReducer}=state
    return {
        form: form,
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(TransitLineRegisterContainer)