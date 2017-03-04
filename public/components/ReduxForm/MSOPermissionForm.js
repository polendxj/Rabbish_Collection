/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let MSOPermissionForm = (props) => {

    return (
        <form className="form-horizontal" action="#">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <fieldset className="content-group">
                        <legend className="text-bold">基础服务权限管理</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>区域设置</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="areaList" component="input"
                                           type="checkbox"/>查询
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="areaWrite" component="input"
                                           type="checkbox"/>注册、删除
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>CSR 路由</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="csrList" component="input"
                                           type="checkbox"/>查询
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="csrWrite" component="input"
                                           type="checkbox"/>注册、修改
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>CSE 引擎</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="cssList" component="input"
                                           type="checkbox"/>查询
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="cssWrite" component="input"
                                           type="checkbox"/>注册、修改
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="cssDetail" component="input"
                                           type="checkbox"/>详情
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>SED 代理</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="sedList" component="input"
                                           type="checkbox"/>查询
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="sedDetail" component="input"
                                           type="checkbox"/>注册、修改
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="sedServerWrite" component="input"
                                           type="checkbox"/>详情
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>子级App</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="subAppList" component="input"
                                           type="checkbox"/>查询
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="subAppWrite" component="input"
                                           type="checkbox"/>注册、删除
                                </label>
                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="content-group">
                        <legend className="text-bold">报表权限管理</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>报表权限</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="statistics" component="input"
                                           type="checkbox"/>统计报表
                                </label>
                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="content-group">
                        <legend className="text-bold">权限配置管理</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>用户权限</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="adminList" component="input"
                                           type="checkbox"/>查询管理员
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="adminWrite" component="input"
                                           type="checkbox"/>注册管理员
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="adminDetail" component="input"
                                           type="checkbox"/>管理员修改、详情
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="permissionConfig" component="input"
                                           type="checkbox"/>权限配置页
                                </label>

                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="content-group">
                        <legend className="text-bold">任务记录权限管理</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2" style={{textAlign: 'center'}}>任务记录</label>
                            <div className="col-lg-10">
                                <label className="checkbox-inline">
                                    <Field name="jobHistoryList" component="input"
                                           type="checkbox"/>查询任务记录
                                </label>
                                <label className="checkbox-inline">
                                    <Field name="jobHistoryDetail" component="input"
                                           type="checkbox"/>任务记录详情
                                </label>
                            </div>
                        </div>

                    </fieldset>

                    <div className="text-right">
                        <button type="button" className="btn btn-primary" onClick={props._save.bind(this,'MSO_OP')}>保 存</button>
                    </div>
                </div>
            </div>


        </form>
    )
}

MSOPermissionForm = reduxForm({
    form: 'MSOPermissionForm'  // a unique identifier for this form
})(MSOPermissionForm)
MSOPermissionForm = connect(
    state => ({
        initialValues: state.getSysManagerPermissionList.data.permissionInfo // pull initial values from account reducer
    })         // bind account loading action creator
)(MSOPermissionForm)

export default MSOPermissionForm

