/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, ListMiddleModal, CustomeListMiddleModal, roleApplicationUse} from '../../Tool/Tool'

export default class VisitControlListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detailLink(path) {
        browserHistory.push(path)
    }

    _delete(soId, flag, name) {
        this.props._delete(soId, flag, name)
    }

    render() {
        const {data, fetching, visitControlList}=this.props;
        var content = "";
        if (visitControlList && visitControlList.whiteListList && visitControlList.whiteListList.length > 0) {
            content = [];
            visitControlList.whiteListList.forEach(function (val, key) {
                content.push(
                    <tr key={'visitControl' + key}>
                        <td>{key + 1}</td>
                        <td>{val.deviceName}</td>
                        <td>{val.deviceType}</td>
                        <td className="text-center">{val.useYn == 'Y' ?
                            <span className="label label-success">{Current_Lang.tableTitle.allow}</span> :
                            <span className="label label-danger">{Current_Lang.tableTitle.forbid}</span>}</td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            {roleApplicationUse() ? <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {/*<li onClick={this._detailLink.bind(this, '/SysManager/Service/Dedicated/Detail/:' + val.seq + ',c')}>
                                         <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                         编辑访问控制</a></li>*/}
                                        <li onClick={this._delete.bind(this, val.seq, 2, val.deviceName)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {Current_Lang.tableTitle.deleteAccessControl}</a></li>
                                    </ul>
                                </li>
                            </ul> : "- -"}
                        </td>
                    </tr>
                );
            }.bind(this));
        } else {
            content = <tr>
                <td colSpan="6"><NoData /></td>
            </tr>
        }
        var tableHeight = ($(window).height() - 360);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-4"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.deviceTypeName}</th>
                        <th className="col-md-4"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.deviceTypeInfo}</th>
                        <th className="col-md-2 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.status}</th>
                        <th className="col-md-2 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.registeredDate}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
            </div>


        )
    }
}