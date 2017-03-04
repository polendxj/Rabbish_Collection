/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, roleApplicationUse, ListMiddleModal} from '../../Tool/Tool'

export default class CseGroupListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
        this._detail = this._detail.bind(this)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    componentDidMount() {

    }

    render() {
        const {data, fetching}=this.props
        var result = ""
        if (fetching) {
            result = <tr>
                <td colSpan="6"><Loading/></td>
            </tr>
        } else {
            if (data.areaList && data.areaList.length > 0) {
                result = []
                data.areaList.forEach(function (val, key) {
                    var sgids = []
                    if (val.sgid) {
                        val.sgid.split(',').forEach(function (sg, k) {
                            sgids.push(
                                <span key={'key' + key + ',' + k} className="label label-default"
                                      style={{marginTop: '5px', marginRight: '10px'}}>{sg}</span>
                            )
                        })
                    }

                    result.push(
                        <tr key={key}>
                            <td className="text-center">
                                {key + 1}
                            </td>
                            <td>
                                <div className="media-left">
                                    <div style={{fontSize: "14px"}}>
                                        <a onClick={this.props._detail.bind(this, val.seq)} data-toggle="modal"
                                           data-target="#ListModal" href="javascript:void(0)">{val.areaName}</a>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {sgids}
                            </td>
                            <td className="text-center">
                                {val.description}
                            </td>
                            <td className="text-center">
                                {val.regDate}
                            </td>
                            <td className="text-center">
                                {roleApplicationUse()?<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li onClick={this._detail.bind(this, '/SysManager/Platform/ServiceGroup/Detail/:' + val.seq)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {Current_Lang.label.detail}</a></li>
                                            <li onClick={this.props._delete.bind(this, val.seq, val.areaName)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {Current_Lang.label.delete}</a></li>
                                        </ul>
                                    </li>
                                </ul>:"- -"}

                            </td>
                        </tr>
                    )
                }.bind(this))

            } else {
                result = <tr>
                    <td colSpan="6"><NoData/></td>
                </tr>
            }
        }
        /*detail sgid info*/
        var detail = ""
        if (this.props.detail.serviceAreaVo) {
            var sgids = this.props.detail.serviceAreaVo.sgid ? this.props.detail.serviceAreaVo.sgid.split(',') : []
            var sgidRangeItems = []
            sgids.forEach(function (val, key) {
                var lastTR = $(".sgid" + key.toString())
                sgidRangeItems.push(
                    <tr key={'sgid' + key.toString()} className={'sgid' + key.toString()}>
                        <td className="text-center">
                            {key + 1}
                        </td>
                        <td className="text-center">
                            {sgids[key].split('-')[0]}
                        </td>
                        <td className="text-center">
                            <i className="icon-arrow-resize7"></i>
                        </td>
                        <td className="text-center">
                            {sgids[key].split('-')[1]}
                        </td>
                    </tr>
                )
            }.bind(this))
            detail = <div className="row">
                <div className="col-md-12">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.basicServiceAreaInfo}
                        </legend>
                        <div className="form-group">
                            <label className="col-lg-2 control-label"
                                   style={{textAlign: 'center', marginTop: '8px'}}>{Current_Lang.tableTitle.name}</label>
                            <div className="col-lg-9">
                                <input disabled="true" id="name" type="text" className="form-control" placeholder={Current_Lang.tableTitle.name}
                                       autoComplete="off" defaultValue={this.props.detail.serviceAreaVo.areaName}/>
                            </div>
                        </div>

                        <div className="form-group" style={{marginTop: '50px'}}>
                            <label className="col-lg-2 control-label"
                                   style={{textAlign: 'center', marginTop: '8px'}}>{Current_Lang.tableTitle.description}</label>
                            <div className="col-lg-9">
                                    <textarea disabled="true" id="description" rows="5" cols="5"
                                              className="form-control"
                                              placeholder=""
                                              defaultValue={this.props.detail.serviceAreaVo.description}></textarea>
                            </div>
                        </div>

                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.SASGIDRange}
                        </legend>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th className="text-center" style={{width: '20px', color: '#2196F3'}}>#</th>
                                    <th className="text-center" style={{color: '#2196F3'}}>{Current_Lang.tableTitle.SGIDRangeStart}</th>
                                    <th className="text-center" style={{}}></th>
                                    <th className="text-center" style={{color: '#2196F3'}}>{Current_Lang.tableTitle.SGIDRangeEnd}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sgidRangeItems}
                                </tbody>
                            </table>
                        </div>

                    </fieldset>

                </div>

            </div>
        } else {
            detail = <Loading/>
        }
        var tableHeight = ($(window).height() - 240);

        return (
            <div>
                <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th className="text-center" style={{width: "20px"}}></th>
                            <th className="col-md-2"><span style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.serviceAreaName}</span>
                            </th>
                            <th className="col-md-5" style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.serviceAreaSGIDRange}</th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.description}</th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.registeredDate}</th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {result}
                        </tbody>
                    </table>
                </div>

                <ListMiddleModal content={detail}
                                 doAction={this._detail.bind(this, '/SysManager/Platform/ServiceGroup/Detail/:' + (this.props.detail.serviceAreaVo ? this.props.detail.serviceAreaVo.seq : ''))}
                                 tip={""}/>

            </div>
        )
    }
}