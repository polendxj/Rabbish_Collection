/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, audioCodes, roleApplicationUse} from '../../Tool/Tool'

export default class SubappListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="10" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="10" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td className="text-center">
                            {val.appId}
                        </td>
                        <td className="text-center">{val.appName}</td>
                        <td className="text-center">{val.videoWidth + '*' + val.videoHeight}</td>
                        <td className="text-center">
                            <span className="text-semibold">
                                <span className={classnames({
                                    'label': true,
                                    'label-success': val.audio == 1,
                                    'label-default': val.audio != 1
                                })}>{val.audio == 1 ? Current_Lang.tableTitle.enable : Current_Lang.tableTitle.disabled}</span>
                            </span>
                        </td>
                        <td className="text-center">{val.webUrl}</td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height() - 240);

        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr style={{color: "black"}}>
                        <th className="col-md-2 text-center text-bold">{Current_Lang.tableTitle.APPID}</th>
                        <th className="col-md-3 text-center text-bold">{Current_Lang.tableTitle.APPName}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.label.resolution}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.enableAudio}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.label.serviceUrl}</th>
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