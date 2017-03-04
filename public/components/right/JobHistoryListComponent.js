/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from './breadCrumbs'
import {Loading, NoData} from '../Tool/Tool'

export default class JobHistoryListComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="6" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="6" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td>
                            {key+1}
                        </td>
                        <td>
                            {val.adminId}
                        </td>
                        <td className="text-center">{val.targetId}</td>
                        <td className="text-center">{val.jobCategory}</td>
                        <td>{val.jobDetail}</td>
                        <td className="text-center">{val.jobDate}</td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height()-240);
        return (
            <div className="table-responsive" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold">{Current_Lang.tableTitle.user}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.target}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.operationMode}</th>
                        <th className="col-md-4 text-bold">{Current_Lang.tableTitle.detail}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.operationTime}</th>
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