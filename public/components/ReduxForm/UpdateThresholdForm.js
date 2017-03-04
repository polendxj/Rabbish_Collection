/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let UpdateThresholdForm = (props) => {
    const {placeholder}=props
    var options = []
    for (var i = 0; i <= 99; i++) {
        options.push(<option key={i} value={i}>{i + '%'}</option>)
    }
    var tableHeight = ($(window).height() - 175);
    return (
        <div>
            <fieldset className="content-group">
                <legend className="text-bold">
                    {Current_Lang.tableTitle.registerAlarmThreshold}
                </legend>
            </fieldset>
            <fieldset className="content-group">
                <form className="form-horizontal" action="#">
                    <div className="row" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                        <div className="col-md-4 col-md-offset-4">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.alarmThresholdName}</label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="thresholdName" component="input" type="text"
                                           placeholder={Current_Lang.tableTitle.alarmThresholdName}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.thresholdType}</label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="targetType" component="select">
                                        <option value={1}>CPU</option>
                                        <option value={2}>Memory</option>
                                        <option value={3}>Network</option>
                                        <option value={4}>Disk</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.status.minor}</label>
                                <div className="col-lg-5">
                                    <Field className="form-control" name="minor" component="select">
                                        {options}
                                    </Field>
                                </div>
                                <div className="col-lg-4">
                                    <label className="checkbox-inline">
                                        <Field name="minorNotiYn" component="input"
                                               type="checkbox"/>{Current_Lang.label.autoNotify}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.status.major}</label>
                                <div className="col-lg-5">
                                    <Field className="form-control" name="major" component="select">
                                        {options}
                                    </Field>
                                </div>
                                <div className="col-lg-4">
                                    <label className="checkbox-inline">
                                        <Field name="majorNotiYn" component="input"
                                               type="checkbox"/>{Current_Lang.label.autoNotify}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.status.critical}</label>
                                <div className="col-lg-5">
                                    <Field className="form-control" name="critical" component="select">
                                        {options}
                                    </Field>
                                </div>
                                <div className="col-lg-4">
                                    <label className="checkbox-inline">
                                        <Field name="criticalNotiYn" component="input"
                                               type="checkbox"/>{Current_Lang.label.autoNotify}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.status.fatal}</label>
                                <div className="col-lg-5">
                                    <Field className="form-control" name="fatal" component="select">
                                        {options}
                                    </Field>
                                </div>
                                <div className="col-lg-4">
                                    <label className="checkbox-inline">
                                        <Field name="fatalNotiYn" component="input"
                                               type="checkbox"/>{Current_Lang.label.autoNotify}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{Current_Lang.tableTitle.startByDefault}</label>
                                <div className="col-lg-9">
                                    {/*<Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>
                                     <Field className="form-control"  name="csr_status" component="input" type="radio" placeholder={'IP'}/>*/}
                                    <label className="radio-inline">
                                        <span><Field name="useYn" component="input" type="radio" value="Y"/></span>
                                        {Current_Lang.label.yes}
                                    </label>

                                    <label className="radio-inline">
                                        <span><Field name="useYn" component="input" type="radio" value="N"/></span>
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

UpdateThresholdForm = reduxForm({
    form: 'UpdateThresholdForm'  // a unique identifier for this form
})(UpdateThresholdForm)

// You have to connect() to any reducers that you wish to connect to yourself
UpdateThresholdForm = connect(
    state => ({
        initialValues: state.thresholdDetail.data.thresholdVo// pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateThresholdForm)

export default UpdateThresholdForm
/*
 {
 /!*<div>
 /!*<!/

 </div>*!/
 }*/
