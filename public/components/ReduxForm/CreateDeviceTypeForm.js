/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateDeviceTypeForm  = (props) => {
    const {placeholder}=props
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>设备类型</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="browser" component="input" type="text"
                                       placeholder={'设备类型'} />
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

CreateDeviceTypeForm = reduxForm({
    form: 'CreateDeviceTypeForm'  // a unique identifier for this form
})(CreateDeviceTypeForm)

// You have to connect() to any reducers that you wish to connect to yourself
CreateDeviceTypeForm = connect(
    state => ({
        initialValues: {useYN:'Y'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateDeviceTypeForm)

export default CreateDeviceTypeForm
