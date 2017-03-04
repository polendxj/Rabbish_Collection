/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {roleApplicationUse} from '../../components/Tool/Tool'

let UpdateCSEFormForApplication  = (props) => {
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>应用ID</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="appId" component="input" type="text"
                                       disabled="disabled" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>应用名称</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="appName" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>启动地址</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="webUrl" component="input" type="text"
                                       />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>视频（宽*高）</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="videoWidthHeight" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>启用音频</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="audio" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>加载时间</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="loadTime" component="input" type="text"
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

UpdateCSEFormForApplication = reduxForm({
    form: 'UpdateCSEFormForApplication'  // a unique identifier for this form
})(UpdateCSEFormForApplication)

UpdateCSEFormForApplication = connect(
    state => ({
        initialValues: state.cseDetail.application // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateCSEFormForApplication)

export default UpdateCSEFormForApplication

