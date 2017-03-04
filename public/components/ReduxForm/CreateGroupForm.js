/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';

export default class CreateGroupForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var areas = []
        var appIds = []
        this.props.data.area.areaList.forEach(function (obj, key) {
            areas.push(<option key={'area' + key} value={obj.areaId}>{obj.areaName}</option>)
        })
        this.props.data.app.appIdList.forEach(function (obj, key) {
            appIds.push(<option key={'app' + key} value={obj}>{obj}</option>)
        })
        return (
            <div className="row">
                <form className="form-horizontal" action="#">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>分组 ID</label>
                                <div className="col-lg-9">
                                    <input className="form-control" id="group_id" name="group_id" type="text"
                                           placeholder={'ID'}/>
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
                                                            className="btn btn-default"
                                                    >新 增
                                                    </button>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody id="areaAppList">
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <select className="form-control" id="area_0">
                                                        {areas}
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-control" id="app_0">
                                                        {appIds}
                                                    </select>
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>描述</label>
                                <div className="col-lg-9">
                                    <input id="group_description" className="form-control" name="group_description"
                                           type="text"
                                           placeholder={'描述'}/>
                                </div>
                            </div>
                            <div className="text-right">
                                <button type="button" className="btn btn-primary" onClick={this.props._save}>保 存</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
}


