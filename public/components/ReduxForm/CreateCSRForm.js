/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateCSRForm  = (props) => {
    const {placeholder}=props
    var tableHeight = ($(window).height() - 175);
    return (
        <div>
            <fieldset className="content-group">
                <legend className="text-bold">
                    注册SR路由
                </legend>
                <ul className="list-inline list-inline-condensed no-margin-bottom"
                    style={{textAlign: 'right', marginTop: '-59px'}}>
                    <li>
                        <button type="button" className="btn btn-default btn-xs" onClick={props._saveCSR}
                                style={{marginLeft: '30px'}}>保 存
                        </button>
                    </li>
                </ul>
            </fieldset>
            <fieldset className="content-group">
                <form className="form-horizontal" action="#">
                    <div className="row" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>SR 服务名<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="csr_name" component="input" type="text"
                                           placeholder={'服务名'} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>SR IP<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="csr_ip" component="input" type="text"
                                           placeholder={'IP'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>SR 端口<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="csr_port" component="input" type="text"
                                           placeholder={'Port'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>默认启用</label>
                                <div className="col-lg-9">
                                    {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                     <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                    <label className="radio-inline">
                                        <span><Field name="csr_status" component="input" type="radio" value="Y"  /></span>
                                        是
                                    </label>

                                    <label className="radio-inline">
                                        <span><Field  name="csr_status" component="input" type="radio" value="N" /></span>
                                        否
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </fieldset>

        </div>
    )
}

CreateCSRForm = reduxForm({
    form: 'CreateCSRForm'  // a unique identifier for this form
})(CreateCSRForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateCSRForm = connect(
    state => ({
        initialValues: {csr_status:'Y'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateCSRForm)

export default CreateCSRForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
