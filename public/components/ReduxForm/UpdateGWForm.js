/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {NoData} from '../Tool/Tool'

let UpdateGWForm = (props) => {
    const {placeholder}=props
    var sessions = ""
    var sessionCount = 0
    console.log(props.data)
    if (props.data && props.data.stat && props.data.stat.sessionList) {
        var temp = []
        props.data.stat.sessionList.forEach(function (val, key) {
            temp.push(
                <li key={'session' + key} className="select2-search-choice">
                    <div>
                        <i className="icon-user"></i>
                        {val}
                    </div>
                </li>
            )
        })
        sessionCount = props.data.stat.currentCount
        sessions =
            <div
                className="select2-container select2-container-multi select2-container-disabled select-icons"
                id="s2id_autogen23" style={{width: '100%'}}>
                <ul className="select2-choices">
                    {temp}
                </ul>
            </div>
    } else {
        sessions = <NoData />
    }
    var tableHeight = ($(window).height() - 175);

    return (
        <div>
            <fieldset className="content-group">
                <legend className="text-bold">
                    编辑Gateway网关
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
                        <div className="col-md-6 col-md-offset-3">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>Gateway名称<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="gwId" component="input" type="text"
                                           placeholder={'ID'} disabled="disabled"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器IP<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="serverIp" component="input" type="text"
                                           placeholder={'IP'}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>服务器Port<span style={{color:'red'}}>*</span></label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="serverPort" component="input" type="text"
                                           placeholder={'Port'}/>
                                </div>
                            </div>
                            <div className="form-group" style={{display:'none'}}>
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>配置信息</label>
                                <div className="col-lg-9">
                                    <Field className="form-control" name="config" component="textarea" rows="10"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>状态</label>
                                <div className="col-lg-9">
                                    <div className="text-muted text-size-small" style={{marginTop:"7px"}}>
                                        {props.data.useYN == 'Y' ? <span className="label bg-success">使用中</span> : <span className="label bg-danger">已关闭</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-md-6">
                         <div className="form-group">
                         <div className="col-lg-12">
                         <div className="media-body">
                         <div className="text-muted text-size-small"><span
                         className="status-mark border-blue position-left"></span> 当前访问数 ： {sessionCount}
                         </div>
                         </div>
                         </div>
                         </div>
                         <div className="form-group">
                         <div className="col-lg-12">
                         {sessions}
                         </div>
                         </div>
                         </div>*/}
                    </div>
                </form>
            </fieldset>

        </div>
    )
}

UpdateGWForm = reduxForm({
    form: 'UpdateGWForm'  // a unique identifier for this form
})(UpdateGWForm)

// You have to connect() to any reducers that you wish to connect to yourself
UpdateGWForm = connect(
    state => ({
        initialValues: state.gwDetail.data // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateGWForm)

export default UpdateGWForm
