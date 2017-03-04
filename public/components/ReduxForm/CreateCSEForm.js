/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateCSEForm = (props) => {
    const {placeholder}=props
    var tableHeight = ($(window).height() - 200);

    return (
        <div>
            <fieldset className="content-group">
                <legend className="text-bold">
                    {Current_Lang.label.cseRegister}
                </legend>
            </fieldset>
            <fieldset className="content-group">
                <form className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.label.serverIP}<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="cse_ip" component="input" type="text"
                                           placeholder={'IP'} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.port}<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="cse_port" component="input" type="text"
                                           placeholder={'Port'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.location}</label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="cse_location" component="input" type="text"
                                           placeholder={Current_Lang.tableTitle.location}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.startByDefault}</label>
                                <div className="col-lg-9">
                                    {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                     <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                    <label className="radio-inline">
                                        <span><Field name="cse_status" component="input" type="radio" value="Y"  /></span>
                                        {Current_Lang.label.yes}
                                    </label>

                                    <label className="radio-inline">
                                        <span><Field  name="cse_status" component="input" type="radio" value="N" /></span>
                                        {Current_Lang.label.no}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row text-right">
                                    <button type="button" className="btn btn-primary" onClick={props._save}>{Current_Lang.label.save}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </fieldset>


        </div>
    )
}

CreateCSEForm = reduxForm({
    form: 'CreateCSEForm'  // a unique identifier for this form
})(CreateCSEForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateCSEForm = connect(
    state => ({
        initialValues: {cse_status: 'Y'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateCSEForm)

export default CreateCSEForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
