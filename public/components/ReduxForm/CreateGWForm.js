/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateGWForm = (props) => {
    const {placeholder}=props
    var tableHeight = ($(window).height() - 175);
    return (
        <div>
            <fieldset className="content-group">
                <legend className="text-bold">
                    注册Gateway网关
                </legend>
                <ul className="list-inline list-inline-condensed no-margin-bottom"
                    style={{textAlign: 'right', marginTop: '-59px'}}>
                    <li>
                        <button type="button" className="btn btn-default btn-xs" onClick={props._save}
                                style={{marginLeft: '30px'}}>保 存
                        </button>
                    </li>
                </ul>
            </fieldset>
            <fieldset className="content-group">
                <form className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Gateway名称<span
                                    style={{color: 'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="gwId" component="input" type="text"
                                           placeholder={'名称'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器IP<span
                                    style={{color: 'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="serverIp" component="input" type="text"
                                           placeholder={'IP'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器Port<span
                                    style={{color: 'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="serverPort" component="input" type="text"
                                           placeholder={'Port'}/>
                                </div>
                            </div>
                            <div className="form-group" style={{display: 'none'}}>
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>配置信息</label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="config" component="textarea" rows="10"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </fieldset>
        </div>
    )
}

CreateGWForm = reduxForm({
    form: 'CreateGWForm'  // a unique identifier for this form
})(CreateGWForm)

// You have to connect() to any reducers that you wish to connect to yourself


export default CreateGWForm
