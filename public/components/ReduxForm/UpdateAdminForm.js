/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let UpdateAdminForm  = (props) => {
    const {placeholder}=props
    var tableHeight = ($(window).height()-130);
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row" style={{height:tableHeight+"px",overflowY:"scroll"}}>
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>管理员姓名</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminName" component="input" type="text"
                                       placeholder={'姓名'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>账 号</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminId" component="input" type="text"
                                       placeholder={'账号'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>联系电话</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="phoneNumber" component="input" type="text"
                                       placeholder={'联系电话'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>权 限</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="permissionId" component="select">
                                    <option value={'SV'}>管理员（SV）</option>
                                    <option value={'MSO_OP'}>MSO管理员（MSO OP）</option>
                                    <option value={'SO_OP'}>SO管理员（SO OP）</option>
                                    <option value={'GU'}>普通用户（GU）</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>默认启用</label>
                            <div className="col-lg-9">
                                {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                 <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                <label className="radio-inline">
                                    <span><Field name="useYN" component="input" type="radio" value="Y"  /></span>
                                    是
                                </label>

                                <label className="radio-inline">
                                    <span><Field  name="useYN" component="input" type="radio" value="N" /></span>
                                    否
                                </label>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="btn btn-primary" onClick={props._save}>保 存</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

UpdateAdminForm = reduxForm({
    form: 'UpdateAdminForm'  // a unique identifier for this form
})(UpdateAdminForm)

// You have to connect() to any reducers that you wish to connect to yourself
UpdateAdminForm = connect(
    state => ({
        initialValues: state.adminDetail.data.adminVo // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateAdminForm)

export default UpdateAdminForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
