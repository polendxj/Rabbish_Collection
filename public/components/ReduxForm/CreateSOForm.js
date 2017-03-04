/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateSOForm  = (props) => {
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>区域 ID</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="so_id" component="input" type="text"
                                       placeholder={'ID'} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>区域名称</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="so_name" component="input" type="text"
                                       placeholder={'名称'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>关键字</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="so_keyword" component="input" type="text"
                                       placeholder={'关键字'}/>
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

CreateSOForm = reduxForm({
    form: 'CreateSOForm'  // a unique identifier for this form
})(CreateSOForm)

export default CreateSOForm

