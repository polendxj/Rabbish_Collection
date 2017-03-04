/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, alarmTargetTypeFilter} from '../../Tool/Tool'

export default class ThresholdListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id,name) {
        this.props._delete(id,name)
    }

    _start(id) {
        this.props._updateStatus(id, 'Y')
    }

    _stop(id) {
        this.props._updateStatus(id, 'N')
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (this.firstLoad) {
            this.firstLoad = false;
            tb.push(<tr key={'loading'}>
                <td colSpan="9" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="9" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td>
                            <div className="media-left media-middle">
                                {val.thresholdName}
                            </div>
                        </td>
                        <td className="text-center">{alarmTargetTypeFilter(val.targetType)}</td>
                        <td className="text-center">{val.minor}%</td>
                        <td className="text-center">{val.major}%</td>
                        <td className="text-center">{val.critical}%</td>
                        <td className="text-center">{val.fatal}%</td>
                        <td className="text-center">
                            {val.useYn == 'Y' ? <span className="label bg-success">{Current_Lang.tableTitle.enable}</span> :
                                <span className="label bg-danger">{Current_Lang.tableTitle.disabled}</span>}
                        </td>
                        <td className="text-center">
                            {val.regDate}
                        </td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this._detail.bind(this, '/Monitor/Alarm/Threshold/Detail/:' + val.seq)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {Current_Lang.tableTitle.editThreshold}</a></li>
                                        <li onClick={this._delete.bind(this, val.seq,val.thresholdName)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {Current_Lang.tableTitle.deleteThreshold}</a></li>
                                        {val.useYn == 'Y' ?
                                            <li onClick={this._stop.bind(this, val)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>{Current_Lang.tableTitle.disableThreshold}</a></li> :
                                            <li onClick={this._start.bind(this, val)}><a
                                                href="javascript:void(0)"><i className="icon-play3"></i>{Current_Lang.tableTitle.enableThreshold}</a></li>}
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height()-240);
        return (
            <div className="table-responsive" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                <table className="table table-bordered" style={{marginBottom:'110px'}}>
                    <thead>
                    <tr style={{fontWeifht:'bold'}}>
                        <th className="col-md-2 text-bold">{Current_Lang.tableTitle.alarmThresholdName}</th>
                        <th className="col-md-2 text-center text-bold">{Current_Lang.tableTitle.alarmType}</th>
                        <th className="col-md-1 text-center text-bold">{Current_Lang.tableTitle.minorThreshold}</th>
                        <th className="col-md-1 text-center text-bold">{Current_Lang.tableTitle.majorThreshold}</th>
                        <th className="col-md-1 text-center text-bold">{Current_Lang.tableTitle.criticalThreshold}</th>
                        <th className="col-md-2 text-center text-bold">{Current_Lang.tableTitle.fatalThreshold}</th>
                        <th className="col-md-1 text-center text-bold">{Current_Lang.tableTitle.status}</th>
                        <th className="col-md-2 text-center text-bold">{Current_Lang.tableTitle.registeredDate}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tb}
                    </tbody>
                </table>
            </div>
        )
    }
}