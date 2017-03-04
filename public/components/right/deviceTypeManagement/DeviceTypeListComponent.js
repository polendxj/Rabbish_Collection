/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, roleApplicationUse} from '../../Tool/Tool'

export default class DeviceTypeListComponent extends Component {
    constructor(props) {
        super(props)
        this.searchColumn = "DEVICE_NAME"
        this.searchValue = ""
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id, name) {
        this.props._delete(id, name)
    }

    _search() {
        this.props._search(this.searchColumn, $("#searchValue").val());
    }

    componentDidMount() {
        var self = this;
        $("#search_status_text").parent().parent().on('click', 'li', function () {
            $("#search_status_text").text($(this).find('a').text())
            if ($("#search_status_text").text().trim() == Current_Lang.tableTitle.searchingBasedOnDeviceName) {
                self.searchColumn = "DEVICE_NAME";
                self.searchValue = $("#searchValue").val();
            } else if ($("#search_status_text").text().trim() == Current_Lang.tableTitle.searchingBasedonDeviceType) {
                self.searchColumn = "DEVICE_TYPE";
                self.searchValue = $("#searchValue").val();
            } else {
                self.searchColumn = "ALL";
                self.searchValue = "";
            }

        })


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
        } else {
            if (data && data.length > 0) {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td>{key + 1}</td>
                        <td>{val.deviceName}</td>
                        <td>{val.deviceType}</td>
                        <td className="text-center">
                            {roleApplicationUse()?<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li
                                            onClick={this._detail.bind(this, '/SystemManager/Platform/DeviceType/Detail/:' + val.seq)}>
                                            <a
                                                href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {Current_Lang.label.detail}</a></li>
                                        <li
                                            onClick={this._delete.bind(this, val.seq, val.deviceName)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {Current_Lang.label.delete}</a></li>
                                    </ul>
                                </li>
                            </ul>:"- -"}

                        </td>
                    </tr>)
                }.bind(this))
            } else {
                tb.push(<tr key={'noData'}>
                    <td colSpan="6" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        }
        var tableHeight = ($(window).height() - 230);

        return (
            <div>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.tableTitle.deviceTypeList}
                    </legend>
                    <ul className="list-inline list-inline-condensed no-margin-bottom"
                        style={{textAlign: 'right', marginTop: '-59px'}}>
                        <li className="dropdown"
                            style={{borderBottom: '0 lightgray solid'}}>
                            <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                               data-toggle="dropdown" aria-expanded="false" style={{
                                paddingLeft: '0',
                                paddingRight: '0',
                                fontWeight: 'bold',
                                color: '#193153'
                            }}><span
                                style={{color: '#193153'}} id="search_status_text">{Current_Lang.tableTitle.searchingBasedOnDeviceName}</span> <span
                                className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a href="#"> {Current_Lang.tableTitle.searchingBasedOnDeviceName}</a></li>
                                <li><a href="#"> {Current_Lang.tableTitle.searchingBasedonDeviceType}</a></li>
                            </ul>
                        </li>
                        <li>
                            <input id="searchValue" style={{
                                border: '0 red solid',
                                borderRadius: '0'
                            }} type="text" className="form-control" placeholder={Current_Lang.tableTitle.pleaseInputTheSearchString}/>
                        </li>
                        <li>
                            <button onClick={this._search.bind(this)}
                                    style={{marginLeft: '30px'}} type="button"
                                    className="btn btn-primary btn-icon"><i
                                className="icon-search4"></i></button>
                        </li>

                    </ul>
                </fieldset>

                <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                    <table className="table table-bordered table-hover" style={{marginBottom: '110px'}}>
                        <thead>
                        <tr style={{color: "black"}}>
                            <th className="text-center text-bold" style={{width: "20px"}}></th>
                            <th className="col-md-5 text-bold">{Current_Lang.tableTitle.deviceTypeName}</th>
                            <th className="col-md-7 text-bold">{Current_Lang.tableTitle.deviceTypeInfo}</th>
                            <th className="text-center text-bold" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tb}
                        </tbody>
                    </table>
                </div>


            </div>

        )
    }
}