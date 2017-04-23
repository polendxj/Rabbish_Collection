/**
 * Created by Captain on 2017/4/23.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal, ErrorModal, roleApplicationUse} from '../../components/Tool/Tool';
export default class WaitingVerifyStore extends Component {
    constructor(props) {
        super(props);
        this._detail = this._detail.bind(this);
    }

    _lockUser() {

    }

    _unlockUser() {

    }

    _resetPassword() {

    }

    _detail(val) {
        this.props._detail(val);
    }

    _showVerify(val) {
        this.props._showVerify(val);
    }

    _account(path, val) {
        browserHistory.push(path)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.length > 0) {
                data.forEach(function (val, key) {
                    var hasHttp = val.logo.indexOf("http") > -1;
                    tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">
                            <div className="thumbnail" style={{margin: "0 auto", width: "35px", padding: 0, border: 0}}>
                                <div className="thumb">
                                    <img
                                        src={val.logo ? (hasHttp ? val.logo : imgBaseUrl + val.logo) : "../assets/images/no_photo.gif"}
                                        alt="" style={{height: "30px", width: "30px"}}/>
                                    <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={val.logo ? (hasHttp ? val.logo : imgBaseUrl + val.logo) : "../assets/images/no_photo.gif"}
                                               data-popup="lightbox"
                                               className="btn" style={{height: "30px", width: "30px"}}></a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.name}</td>
                        <td className="text-center">{val.manager}</td>
                        <td className="text-center">{val.alipayAccount}</td>
                        <td className="text-center">{val.city}</td>
                        <td className="text-center">{val.county}</td>
                        <td className="text-center">{val.contact}</td>
                        <td className="text-center">{val.address}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#detailModal" onClick={this._detail.bind(this, val)}><i
                                                className=" icon-office"></i>
                                                {"详情"}</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#verifyModal" onClick={this._showVerify.bind(this, val)}><i
                                                className=" icon-office"></i>
                                                {"审核"}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this));
            } else {
                tb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            }
        } else {
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var tableHeight = ($(window).height() - 240);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom: '85px'}}>
                    <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-1 text-bold text-center">{"店铺图标"}</th>
                        <th className="col-md-2 text-bold text-center">{"店铺名称"}</th>
                        <th className="col-md-2 text-bold text-center">{"负责人"}</th>
                        <th className="col-md-1 text-bold text-center">{"支付宝账号"}</th>
                        <th className="col-md-1 text-bold text-center">{"城市"}</th>
                        <th className="col-md-1 text-bold text-center">{"区县"}</th>
                        <th className="col-md-2 text-bold text-center">{"联系方式"}</th>
                        <th className="col-md-2 text-bold text-center">{"地址"}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i>
                        </th>
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