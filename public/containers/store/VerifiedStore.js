/**
 * Created by Captain on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal, ErrorModal, roleApplicationUse} from '../../components/Tool/Tool';
export default class VerifiedStore extends Component {
    constructor(props) {
        super(props);
        this.threshold = 100;
    }

    _detail(val) {
        this.props._detail(val);
    }

    _account(path, val) {
        browserHistory.push(path)
    }

    _delete(id, classConfName, weight) {
        this.props._delete(id, classConfName, weight)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.length > 0) {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">
                            <div className="thumbnail" style={{margin: "0 auto", width: "35px", padding: 0, border: 0}}>
                                <div className="thumb">
                                    <img src={val.logo} alt="" style={{height: "30px", width: "30px"}}/>
                                    <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={val.logo} data-popup="lightbox"
                                               className="btn" style={{height: "30px", width: "30px"}}></a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.name}</td>
                        <td className="text-center">{val.manager}</td>
                        <td className="text-center">{val.alipayAccount}</td>
                        <td className="text-center">{val.points == null ? 0 : val.points}</td>
                        <td className="text-center">{val.city}</td>
                        <td className="text-center">{val.county}</td>
                        <td className="text-center">{val.contact}</td>
                        <td className="text-center">{val.address}</td>
                        <td className="text-center">
                            <div className="text-muted text-size-small">
                                {val.points >= this.threshold ? <span className="label bg-success">{"可兑换"}</span> :
                                    ""}
                            </div>
                        </td>
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
                                        <li style={{display: val.points >= this.threshold ? 'block' : "none"}}
                                            onClick={this._detail.bind(this, val)}>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#storeSettlementModal"><i className=" icon-office"></i>
                                                {"兑账"}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this))
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
                        <th className="col-md-1 text-bold text-center">{"负责人"}</th>
                        <th className="col-md-1 text-bold text-center">{"支付宝账号"}</th>
                        <th className="col-md-1 text-bold text-center">{"积分"}</th>
                        <th className="col-md-1 text-bold text-center">{"城市"}</th>
                        <th className="col-md-1 text-bold text-center">{"区县"}</th>
                        <th className="col-md-1 text-bold text-center">{"联系方式"}</th>
                        <th className="col-md-2 text-bold text-center">{"地址"}</th>
                        <th className="col-md-1 text-bold text-center">{"兑换状态"}</th>
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