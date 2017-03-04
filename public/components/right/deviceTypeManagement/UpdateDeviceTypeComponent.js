/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading, ErrorModal} from '../../../components/Tool/Tool'

export default class UpdateDeviceTypeComponent extends Component {
    constructor(props) {
        super(props);
        this.oldObj = "";
    }

    _save() {
        if (!$("#deviceName").val()) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deviceTypeNameEmpty);
        } else if (!$("#deviceType").val()) {
            ErrorModal(Current_Lang.status.minor,  Current_Lang.alertTip.deviceTypeInfoEmpty);
        } else if($("#deviceType").val().indexOf("!") >= 0 || $("#deviceType").val().indexOf("@") >= 0 || $("#deviceType").val().indexOf("%") >= 0 || $("#deviceType").val().indexOf("&") >= 0){
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deviceTypeNameContainInvalidChar);
        }else if($("#deviceName").val().indexOf("!") >= 0 || $("#deviceName").val().indexOf("@") >= 0 || $("#deviceName").val().indexOf("%") >= 0 || $("#deviceName").val().indexOf("&") >= 0){
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deviceTypeInfoContainInvalidChar);
        } else {
            var params = {
                deviceName: $("#deviceName").val(),
                deviceType: $("#deviceType").val(),
                mode: 'modify',
                seq: this.props.data.serviceModelVo.seq
            };
            this.props._save(params, this.oldObj)
        }
    }

    render() {
        const {data}=this.props;
        var content = "";
        if (data && data.serviceModelVo) {
            this.oldObj = {deviceName: data.serviceModelVo.deviceName, deviceType: data.serviceModelVo.deviceType}
            content =
                <div className="col-md-6 col-md-offset-3">
                    <div className="form-group">
                        <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.deviceTypeName}</label>
                        <div className="col-lg-9">
                            <input id="deviceName" className="form-control" type="text"
                                   defaultValue={data.serviceModelVo.deviceName}
                                   placeholder={Current_Lang.tableTitle.deviceTypeName}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.deviceTypeInfo}</label>
                        <div className="col-lg-9">
                            <input id="deviceType" className="form-control" type="text"
                                   defaultValue={data.serviceModelVo.deviceType}
                                   placeholder={'iPanel2.0;HI3100;200.511.23000'}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row text-right">
                            <button style={{marginRight:"20px"}} type="button" className="btn btn-primary" onClick={this._save.bind(this)}>
                                {Current_Lang.label.save}
                            </button>
                        </div>

                    </div>
                </div>
        } else {
            content = <Loading/>
        }
        var tableHeight = ($(window).height() - 200);
        return (
            <div>
                <form className="form-horizontal" action="#">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.detail}
                        </legend>

                    </fieldset>
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <fieldset className="content-group">
                            {content}
                        </fieldset>
                    </div>
                </form>
            </div>
        )

    }
}