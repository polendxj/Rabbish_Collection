/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {roleApplicationUse} from '../../components/Tool/Tool'

let UpdateCSEFormForEngine  = (props) => {
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>引擎版本</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="cssVersion" component="input" type="text"
                                       disabled="disabled" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务类型</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="serviceType" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>端口号</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="serverPort" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>最大访问者</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="maxConnect" component="input" type="text"
                                       />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>目标码率</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="targetBitrate" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>视频码率</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="videoBitrate" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>帧率</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="frameRate" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>音频编码</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="audioCodec" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>视频编码</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="videoCodec" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Gop 大小</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="gopSize" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>ERM IP:PORT</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="ermIpPort" component="input" type="text"
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

UpdateCSEFormForEngine = reduxForm({
    form: 'UpdateCSEFormForEngine'  // a unique identifier for this form
})(UpdateCSEFormForEngine)

UpdateCSEFormForEngine = connect(
    state => ({
        initialValues: state.cseDetail.engine // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateCSEFormForEngine)

export default UpdateCSEFormForEngine

