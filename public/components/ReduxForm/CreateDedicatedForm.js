/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

let CreateDedicatedForm = (props) => {
    var sourceArea = [<option key={'sourceArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
    var targetArea = [<option key={'targetArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
    var cseOptions = [<option key={'css' + (-1)} value={'NONE'}>{'不使用'}</option>]
    var groupOption = [<option key={'group' + (-1)} value={'NONE'}>{'不使用'}</option>]
    props.areaSubInfo.area.areaList.forEach(function (area, key) {
        sourceArea.push(<option key={'sourceArea' + key} value={area.areaId}>{area.areaName}</option>)
        targetArea.push(<option key={'targetArea' + key} value={area.areaId}>{area.areaName}</option>)
    })
    props.areaSubInfo.subinfo.groupList.forEach(function (group, key) {
        console.log(group)
        groupOption.push(<option key={'group' + key} value={group}>{group}</option>)
    })
    props.areaSubInfo.subinfo.cssList.forEach(function (css, key) {
        cseOptions.push(<option key={'css' + key} value={css.serverIp}>{css.hostName} ({css.serverIp})</option>)
    })
    return (
        <form className="form-horizontal" action="#">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <fieldset className="content-group">
                        <legend className="text-bold">路由策略类型</legend>
                        <div className="form-group">
                            <label className="control-label col-lg-2">类型</label>
                            <div className="col-lg-10" id="routerType">
                                <label className="radio-inline">
                                    <input id="commonRouter" className="radio-test" type="radio"
                                           name="radio-unstyled-inline-left" value={0} defaultChecked="true"/>
                                    通用路由
                                </label>

                                <label className="radio-inline">
                                    <input id="dedicateRouter" className="radio-test" type="radio" value={1}
                                           name="radio-unstyled-inline-left"/>
                                    专用路由
                                </label>

                                <label className="radio-inline">
                                    <input id="visitControlRouter" className="radio-test" type="radio" value={2}
                                           name="radio-unstyled-inline-left"/>
                                    访问控制
                                </label>
                            </div>

                        </div>

                    </fieldset>
                    <div id="commonDIV">
                        <fieldset className="content-group">
                            <legend className="text-bold">通用路由设置
                                <div className="text-right" style={{marginTop: '-27px'}}>
                                    <button type="button" className="btn btn-default btn-xs">添加策略
                                    </button>
                                </div>
                            </legend>
                            <div className="table-responsive">
                                <table className="table table-bordered table-framed">
                                    <thead>
                                    <tr style={{color: 'rgb(33, 150, 243)'}}>
                                        <th style={{textAlign:'center',fontWeight:'bold'}}>
                                            区域
                                        </th>
                                        <th className="text-center" style={{fontWeight:'bold'}}>
                                            应用ID
                                        </th>
                                        <th className="text-center" style={{width:'30px',fontWeight:'bold'}}>

                                        </th>
                                        <th className="text-center" style={{fontWeight:'bold'}}>
                                            CSE引擎组
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Field className="form-control" name="sourceAreaId1" component="select">
                                                <option value={40}>{'TAICANG'}</option>
                                                <option value={41}>{'NANJING'}</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <Field className="form-control" name="sourceAreaId2" component="select">
                                                <option value={40}>{'JSCN-SAMPLE (40)'}</option>
                                                <option value={41}>{'JSCN-SAMPLE-SUPER (41)'}</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <i className="icon-arrow-right16"></i>
                                        </td>
                                        <td>
                                            <Field className="form-control" name="sourceAreaId3" component="select">
                                                <option value={40}>{'SUNAN'}</option>
                                                <option value={41}>{'SUBEI'}</option>
                                            </Field>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Field className="form-control" name="sourceAreaId4" component="select">
                                                <option value={40}>{'TAICANG'}</option>
                                                <option value={41}>{'NANJING'}</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <Field className="form-control" name="sourceAreaId5" component="select">
                                                <option value={40}>{'JSCN-SAMPLE (40)'}</option>
                                                <option value={41}>{'JSCN-SAMPLE-SUPER (41)'}</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <i className="icon-arrow-right16"></i>
                                        </td>
                                        <td>
                                            <Field className="form-control" name="sourceAreaId6" component="select">
                                                <option value={40}>{'SUNAN'}</option>
                                                <option value={41}>{'SUBEI'}</option>
                                            </Field>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </fieldset>


                        <div className="text-right">
                            <button type="button" className="btn btn-primary" onClick={props._save}>保 存</button>
                        </div>
                    </div>
                    <div id="dedicatedDIV" style={{display: 'none'}}>
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
                                        <span><Field name="dedicatedType" component="input" type="radio"
                                                     value="1"/></span>
                                            允许访问
                                        </label>

                                        <label className="radio-inline">
                                        <span><Field name="dedicatedType" component="input" type="radio"
                                                     value="2"/></span>
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
            </div>


        </form>
    )
}

CreateDedicatedForm = reduxForm({
    form: 'CreateDedicatedForm'  // a unique identifier for this form
})(CreateDedicatedForm)
CreateDedicatedForm = connect(
    state => ({
        initialValues: {dedicatedType: '1', sourceType: '1'} // pull initial values from account reducer
    })         // bind account loading action creator
)(CreateDedicatedForm)

export default CreateDedicatedForm

