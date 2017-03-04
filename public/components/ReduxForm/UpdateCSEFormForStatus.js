/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {roleApplicationUse} from '../../components/Tool/Tool'

let UpdateCSEFormForStatus  = (props) => {
    var options=[]
    if(props.areaList.areaList){
        props.areaList.areaList.forEach(function (area,key) {
            options.push(<option key={key} value={area.areaId}>{area.areaName}</option>)
        })
    }
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>区域名称</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="areaName" component="select">
                                    {options}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>位置</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="location" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>分组ID</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="groupId" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>设备状态</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="status" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>注册日期</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="regDate" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="text-right" style={{display: roleApplicationUse('cssWrite') ? 'block' : 'none'}}>
                            <button type="button" className="btn btn-primary" onClick={props._save}>应用配置</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

UpdateCSEFormForStatus = reduxForm({
    form: 'UpdateCSEFormForStatus'  // a unique identifier for this form
})(UpdateCSEFormForStatus)

UpdateCSEFormForStatus = connect(
    state => ({
        initialValues: state.cseDetail.status // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateCSEFormForStatus)

export default UpdateCSEFormForStatus

