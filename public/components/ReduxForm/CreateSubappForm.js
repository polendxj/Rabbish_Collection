/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateSubappForm = (props) => {
    var options = []
    props.data.appIdList.forEach(function (app, key) {
        if (key == 0) {
            options.push(<option key={'app' + key} value={app}>{app}</option>)

        } else {
            options.push(<option key={'app' + key} value={app}>{app}</option>)
        }
    })
    var select =
        <Field className="form-control" name="app_id" component="select">
            {options}
        </Field>
    return (
        <div className="row">
            <form className="form-horizontal" action="#">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>子级App ID</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="subapp_id" component="input" type="text"
                                       placeholder={'ID'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>子级App 名称</label>
                            <div className="col-lg-9">
                                <Field className="form-control" name="subapp_name" component="input" type="text"
                                       placeholder={'名称'}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>父级App</label>
                            <div className="col-lg-9">
                                {select}
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

CreateSubappForm = reduxForm({
    form: 'CreateSubappForm'  // a unique identifier for this form
})(CreateSubappForm)

export default CreateSubappForm

