/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateAdminForm  = (props) => {
    const {placeholder}=props
    var tableHeight = ($(window).height()-130);
    return (
        <div >
            <form className="form-horizontal" action="#">
                <div className="row" style={{height:tableHeight+"px",overflowY:"scroll"}}>
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.userAccount}<span style={{color:'red'}}>*</span></label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminId" component="input" type="text"
                                       placeholder={Current_Lang.tableTitle.userAccount}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.administratorName}<span style={{color:'red'}}>*</span></label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminName" component="input" type="text"
                                       placeholder={Current_Lang.tableTitle.administratorName} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.password}<span style={{color:'red'}}>*</span></label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminPwd" component="input" type="password"
                                       placeholder={Current_Lang.tableTitle.password}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.confirmPassword}<span style={{color:'red'}}>*</span></label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="adminPwd2" component="input" type="password"
                                       placeholder={Current_Lang.tableTitle.confirmDataNeedWell}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.contactInfo}</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="phoneNumber" component="input" type="text"
                                       placeholder={Current_Lang.tableTitle.contactInfo}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.Permission}</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="permissionId" component="select">
                                    <option value={'SV'}>{Current_Lang.tableTitle.Administrator}（SV）</option>
                                    {/*<option value={'MSO_OP'}>MSO管理员（MSO OP）</option>
                                    <option value={'SO_OP'}>SO管理员（SO OP）</option>*/}
                                    <option value={'GU'}>{Current_Lang.tableTitle.normalUser}（GU）</option>
                                </Field>
                            </div>
                        </div>
                        <div className="form-group" style={{display:'none'}}>
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.startByDefault}</label>
                            <div className="col-lg-9">
                                {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                 <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                <label className="radio-inline">
                                    <span><Field name="useYN" component="input" type="radio" value="Y"  /></span>
                                    {Current_Lang.label.yes}
                                </label>

                                <label className="radio-inline">
                                    <span><Field  name="useYN" component="input" type="radio" value="N" /></span>
                                    {Current_Lang.label.no}
                                </label>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="btn btn-primary" onClick={props._save}>{Current_Lang.label.save}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

CreateAdminForm = reduxForm({
    form: 'CreateAdminForm'  // a unique identifier for this form
})(CreateAdminForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateAdminForm = connect(
    state => ({
        initialValues: {useYN:'Y',permissionId:'SV'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateAdminForm)

export default CreateAdminForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
