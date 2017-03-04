/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let UpdateCSEFormForServer  = (props) => {
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>主机名</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="hostName" component="input" type="text"
                                       disabled="disabled" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器IP</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="serverIp" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>操作系统</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="osType" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>CPU型号</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="cpuInfo" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>GPU型号</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="gpuInfo" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>内存大小</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="memory" component="input" type="text"
                                       disabled="disabled"/>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

UpdateCSEFormForServer = reduxForm({
    form: 'UpdateCSEFormForServer'  // a unique identifier for this form
})(UpdateCSEFormForServer)

UpdateCSEFormForServer = connect(
    state => ({
        initialValues: state.cseDetail.server // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateCSEFormForServer)

export default UpdateCSEFormForServer

