/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let UpdateDedicatedForm = (props) => {
    var sourceArea = [<option key={'sourceArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
    var targetArea = [<option key={'targetArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
    var cseOptions = [<option key={'css' + (-1)} value={'NONE'}>{'不使用'}</option>]
    var groupOption = [<option key={'group' + (-1)} value={'NONE'}>{'不使用'}</option>]
    props.areaSubInfo.area.areaList.forEach(function (area, key) {
        sourceArea.push(<option key={'sourceArea' + key} value={area.areaId}>{area.areaName}</option>)
        targetArea.push(<option key={'targetArea' + key} value={area.areaId}>{area.areaName}</option>)
    })
    props.areaSubInfo.subinfo.groupList.forEach(function (group, key) {
        groupOption.push(<option key={'group' + key} value={area.groupId}>{area.groupName}</option>)
    })
    props.areaSubInfo.subinfo.cssList.forEach(function (css, key) {
        cseOptions.push(<option key={'css' + key} value={css.serverIp}>{css.hostName} ({css.serverIp})</option>)
    })
    return (
        <form className="form-horizontal" action="#">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <fieldset className="content-group">
                        <legend className="text-bold">专访机顶盒设置</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2">机顶盒ID</label>
                            <div className="col-lg-10">
                                <Field className="form-control" name="stbId" component="input" type="text"
                                       placeholder={'ID'}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2">机顶盒IP</label>
                            <div className="col-lg-10">
                                <Field className="form-control" name="stbIp" component="input" type="text"
                                       placeholder={'IP'}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2">区域设置</label>
                            <div className="col-lg-10">
                                <Field className="form-control" name="sourceAreaId" component="select">
                                    {sourceArea}
                                </Field>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2">机顶盒ID匹配方式</label>
                            <div className="col-lg-10">
                                <label className="radio-inline">
                                    <span><Field name="sourceType" component="input" type="radio" value="1"/></span>
                                    精确匹配
                                </label>

                                <label className="radio-inline">
                                    <span><Field name="sourceType" component="input" type="radio" value="2"/></span>
                                    通配符匹配<span style={{color: 'red'}}>（注意：机顶盒ID的模糊设置部分用 * 代替）</span>
                                </label>
                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="content-group">
                        <legend className="text-bold">访问策略设置</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2">专访限制</label>
                            <div className="col-lg-10">
                                <div className="input-group">
                                    <label className="radio-inline">
                                        <span><Field name="dedicatedType" component="input" type="radio" value="1"/></span>
                                        允许访问
                                    </label>

                                    <label className="radio-inline">
                                        <span><Field name="dedicatedType" component="input" type="radio" value="2"/></span>
                                        禁止访问
                                    </label>
                                </div>
                            </div>
                        </div>

                    </fieldset>

                    <fieldset className="content-group">
                        <legend className="text-bold">访问目标设置</legend>

                        <div className="form-group">
                            <label className="control-label col-lg-2">CSS服务器</label>
                            <div className="col-lg-10">
                                <Field className="form-control" name="cssIp" component="select">
                                    {cseOptions}
                                </Field>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2">组设置</label>
                            <div className="col-lg-10">
                                <Field className="form-control" name="groupId" component="select">
                                    {groupOption}
                                </Field>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-lg-2">区域设置</label>
                            <div className="col-lg-10">
                                <Field className="form-control" name="targetAreaId" component="select">
                                    {targetArea}
                                </Field>
                            </div>
                        </div>

                    </fieldset>

                    <div className="text-right">
                        <button type="button" className="btn btn-primary" onClick={props._save}>保 存</button>
                    </div>
                </div>
            </div>


        </form>
    )
}

UpdateDedicatedForm = reduxForm({
    form: 'UpdateDedicatedForm'  // a unique identifier for this form
})(UpdateDedicatedForm)
UpdateDedicatedForm = connect(
    state => ({
        initialValues: state.dedicatedDetail.data.dedicatedVo // pull initial values from account reducer
    })         // bind account loading action creator
)(UpdateDedicatedForm)

export default UpdateDedicatedForm

