/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';

export default class UpdateGroupForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.data)
        var trs = []
        this.props.data.detail.groupInfo.groupAppList.forEach(function (trObj, trIndex) {
            var areas = []
            var appIds = []
            this.props.data.areaAndApp.area.areaList.forEach(function (obj, key) {
                if (trObj.areaId == obj.areaId) {
                    areas.push(<option key={'area' + trIndex + key} value={obj.areaId}
                                       selected="selected">{obj.areaName}</option>)
                } else {
                    areas.push(<option key={'area' + trIndex + key} value={obj.areaId}>{obj.areaName}</option>)
                }
            })
            this.props.data.areaAndApp.app.appIdList.forEach(function (obj, key) {
                if (trObj.appId == obj) {
                    appIds.push(<option key={'app' + trIndex + key} value={obj} selected="selected">{obj}</option>)
                } else {
                    appIds.push(<option key={'app' + trIndex + key} value={obj}>{obj}</option>)
                }
            })
            trs.push(
                <tr key={'tr' + trIndex}>
                    <td>1</td>
                    <td>
                        <select className="form-control">
                            {areas}
                        </select>
                    </td>
                    <td>
                        <select className="form-control">
                            {appIds}
                        </select>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger remove">移 除</button>
                    </td>
                </tr>
            )

        }.bind(this))

        return (
            <div className="row">
                <form className="form-horizontal" action="#">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>分组 ID</label>
                                <div className="col-lg-9">
                                    <input className="form-control" id="group_id" name="group_id" type="text"
                                           placeholder={'ID'} defaultValue={this.props.data.detail.groupInfo.groupId}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>区域-App服务</label>
                                <div className="col-lg-9">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th style={{width: '30px'}}>#</th>
                                                <th style={{textAlign: 'center'}}>区域</th>
                                                <th style={{textAlign: 'center'}}>App服务</th>
                                                <th style={{width: '30px'}}>
                                                    <button id="areaAppListBtn" type="button"
                                                            className="btn btn-default">新 增
                                                    </button>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody id="areaAppList">
                                            {trs}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>描述</label>
                                <div className="col-lg-9">
                                    <input id="group_description" className="form-control" name="group_description"
                                           type="text" defaultValue={this.props.data.detail.groupInfo.description}
                                           placeholder={'描述'}/>
                                </div>
                            </div>
                            <div className="text-right">
                                <button type="button" className="btn btn-primary" onClick={this.props._save}>保 存
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
}


