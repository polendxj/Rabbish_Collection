/**
 * Created by Captain on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal,ErrorModal,roleApplicationUse} from '../../components/Tool/Tool';
export default class UnauthorizedStore extends Component{
    constructor(props) {
        super(props);
    }

    _lockUser(){

    }

    _unlockUser(){

    }

    _resetPassword(){

    }

    _detail(path,val) {
        browserHistory.push(path)
    }
    _account(path,val){
        browserHistory.push(path)
    }

    _delete(id,classConfName,weight) {
        this.props._delete(id,classConfName,weight)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="8" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="8" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor:key%2==0?"#F8F8F8":""}}>
                        <td className="text-center">{key+1}</td>
                        <td className="text-center">
                            <div className="thumbnail" style={{margin:"0 auto",width:"35px",padding:0,border:0}}>
                                <div className="thumb">
                                    <img src={val.logo} alt="" style={{height:"30px",width:"30px"}}/>
                                    <div className="caption-overflow" style={{width:"auto"}}>
                                        <span style={{top:0,marginTop:0}}>
                                            <a href={val.logo} data-popup="lightbox"
                                               className="btn" style={{height:"30px",width:"30px"}}></a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.storeName}</td>
                        <td className="text-center">{val.alipayAccount}</td>
                        <td className="text-center">{val.city}</td>
                        <td className="text-center">{val.country}</td>
                        <td className="text-center">{val.manager}</td>
                        <td className="text-center">{val.contact}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#detailModal"><i className=" icon-office"></i>
                                                {"详情"}</a>
                                        </li>
                                        <li style={{display:'block'}} onClick={this._delete.bind(this, val.id,val.classConfName,val.weight)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {"删除"}</a></li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height()-240);
        return (
            <div className="table-responsive" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom:'85px'}}>
                    <thead>
                    <tr style={{fontWeight:'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-1 text-bold text-center">{"店铺图标"}</th>
                        <th className="col-md-2 text-bold text-center">{"店铺名称"}</th>
                        <th className="col-md-2 text-bold text-center">{"支付宝账号"}</th>
                        <th className="col-md-1 text-bold text-center">{"城市"}</th>
                        <th className="col-md-2 text-bold text-center">{"区县"}</th>
                        <th className="col-md-2 text-bold text-center">{"负责人"}</th>
                        <th className="col-md-2 text-bold text-center">{"联系方式"}</th>
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