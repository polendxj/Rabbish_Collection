/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {
    Loading,
    NoData,
    ConfirmModal,
    ErrorModal,
    roleApplicationUse,
    ListMiddleModal
} from '../../components/Tool/Tool';
import VerifiedStore from './VerifiedStore';
import UnauthorizedStore from './UnauthorizedStore';
import UnVerifiedStore from './UnVerifiedStore';

export default class StoreListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "加盟商管理", link: ''},
            {text: "加盟商列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/CustomerService/StoreManage/Register"}
        ];
        this.searchColumn = "DRIVER";
        this.dataList = [
            {
                id: "1",
                logo: "/assets/images/placeholder.jpg",
                storeName: "红旗超市",
                decription: "红旗超市",
                points: 1000,
                city: "成都市",
                country: "高新区",
                longitude: 104.23,
                latitude: 30.63,
                approved: "已通过",
                manager: "寇建博",
                license: "/assets/images/placeholder.jpg",
                contact: "15112023452",
                address: "成都市高新区",
                alipayAccount: "z12345678"
            },
            {
                id: "2",
                logo: "/assets/images/placeholder.jpg",
                storeName: "711连锁",
                decription: "711连锁",
                points: 200,
                city: "成都市",
                country: "高新区",
                longitude: 104.23,
                latitude: 30.63,
                approved: "已通过",
                manager: "寇建博",
                license: "/assets/images/placeholder.jpg",
                contact: "15112023452",
                address: "成都市高新区",
                alipayAccount: "z12345678"
            },
            {
                id: "3",
                logo: "/assets/images/placeholder.jpg",
                storeName: "博园外卖",
                decription: "博园外卖",
                points: 80,
                city: "成都市",
                country: "高新区",
                longitude: 104.23,
                latitude: 30.63,
                approved: "已通过",
                manager: "寇建博",
                license: "/assets/images/placeholder.jpg",
                contact: "15112023452",
                address: "成都市高新区",
                alipayAccount: "z12345678"
            }
        ];
    }

    componentDidMount() {
        var self = this;
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按姓名搜索") {
                self.searchColumn = "DRIVER";
            } else {
                self.searchColumn = "LINE";
            }
        })
    }

    _delete(id, classConfName, weight) {
        var that = this;
        if (sessionStorage['adminId'] == id) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.accountOperating)
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + classConfName + "（" + weight + "）" + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0, that.searchColumn, $("#search_value").val()))
        })

    }

    _search() {

    }

    _changePage(page) {
        this.page = page;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _prePage(page) {
        this.page = this.page - 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    render() {
        const {selected, form, fetching, data} =this.props;
        var detailStoreInfo = <div>
            <div className="form-horizontal">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {"详细信息"}
                    </legend>
                    <div className="form-group">
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"店铺图标"}</label>
                            <div className="col-lg-8">
                                <div className="thumbnail"
                                     style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                    <div className="thumb">
                                        <img src={"/assets/images/placeholder.jpg"} alt=""
                                             style={{height: "160px", width: "160px"}}/>
                                        <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={"/assets/images/placeholder.jpg"} data-popup="lightbox"
                                               className="btn" style={{height: "160px", width: "160px"}}></a>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"营业执照"}</label>
                            <div className="col-lg-8">
                                <div className="thumbnail"
                                     style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                    <div className="thumb">
                                        <img src={"/assets/images/placeholder.jpg"} alt=""
                                             style={{height: "160px", width: "160px"}}/>
                                        <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={"/assets/images/placeholder.jpg"} data-popup="lightbox"
                                               className="btn" style={{height: "160px", width: "160px"}}></a>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"店铺名称"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value="红旗超市" className="form-control"
                                       autoComplete="off"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"负责人"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value="寇建波" className="form-control" placeholder="行政区名称"
                                       autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"城市"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value="成都市" className="form-control" placeholder="行政区名称"
                                       autoComplete="off"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"区县"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value="高新区" className="form-control" placeholder="行政区名称"
                                       autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"地址"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value={"成都市高新区"} className="form-control"
                                       autoComplete="off"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"联系方式"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value={"15108453763"} className="form-control"
                                       autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"经度"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value={104.24} className="form-control" placeholder="行政区名称"
                                       autoComplete="off"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label className="col-lg-4 control-label"
                                   style={{textAlign: 'center'}}>{"纬度"}</label>
                            <div className="col-lg-8">
                                <input id="name" type="text" value={34.32} className="form-control" placeholder="行政区名称"
                                       autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-12">
                            <label className="col-lg-2 control-label"
                                   style={{textAlign: 'center'}}>{"描 述"}</label>
                            <div className="col-lg-10">
                                    <textarea id="name" type="text" className="form-control" placeholder="描 述"
                                              autoComplete="off"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}></label>
                        <div className="col-lg-9">
                            <div className="text-right">
                                <button type="button" className="btn btn-primary">{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                    </div>


                </fieldset>
            </div>

        </div>;
        var storeSettlementInfo = <div>
            <div className="form-horizontal">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {"兑账信息"}
                    </legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"商户名称"}</label>
                        <div className="col-lg-9">
                            <input id="name" type="text" value="红旗超市" className="form-control"
                                   autoComplete="off" disabled/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"结算金额"}</label>
                        <div className="col-lg-9">
                            <input id="name" type="text" className="form-control" placeholder="输入结算金额"
                                   autoComplete="off"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"结算积分"}</label>
                        <div className="col-lg-9">
                            <input id="name" type="text" className="form-control" placeholder="输入结算积分"
                                   autoComplete="off"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}></label>
                        <div className="col-lg-9">
                            <div className="text-right">
                                <button type="button" className="btn btn-primary">{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                    </div>


                </fieldset>
            </div>

        </div>;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <ul className="nav nav-tabs">
                    <li
                        className="active"
                        style={{fontWeight: 'bold'}}><a
                        href="#verifiedStore" data-toggle="tab">{"已通过审核列表"}</a>
                    </li>
                    <li
                        style={{fontWeight: 'bold'}}><a
                        href="#unauthorizedStore"
                        data-toggle="tab">{"未认证列表"}</a>
                    </li>
                    <li
                        style={{fontWeight: 'bold'}}><a
                        href="#unVerifiedStore"
                        data-toggle="tab">{"未通过审核列表"}</a>
                    </li>
                </ul>
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
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
                                    style={{color: '#193153'}} id="search_way">{"按姓名搜索"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按姓名搜索"}</a></li>
                                    <li><a href="#">{"按XXX搜索"}</a></li>
                                </ul>
                            </li>
                            <li>
                                <input id="search_value" style={{
                                    border: '0 red solid',
                                    borderRadius: '0'
                                }} type="text" className="form-control" placeholder={"请输入搜索内容"}/>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)}
                                        style={{marginLeft: '30px'}} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"扫码员列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={3} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane active"
                                 id="verifiedStore">
                                <VerifiedStore data={this.dataList} fetching={false}
                                               _delete={this._delete}
                                               _updateStatus={this._updateStatus}/>
                            </div>
                            <div className="tab-pane"
                                 id="unauthorizedStore">
                                <UnauthorizedStore data={this.dataList} fetching={false}
                                                   _delete={this._delete}
                                                   _updateStatus={this._updateStatus}/>
                            </div>
                            <div className="tab-pane"
                                 id="unVerifiedStore">
                                <UnVerifiedStore data={this.dataList} fetching={false}
                                                 _delete={this._delete}
                                                 _updateStatus={this._updateStatus}/>
                            </div>
                        </div>

                    </fieldset>
                    <ListMiddleModal id="detailModal" content={detailStoreInfo}
                                     doAction={""}
                                     tip={"加盟商信息"} actionText="加盟商详情" hide="true" hideCancel="true"/>
                    <ListMiddleModal id="storeSettlementModal" content={storeSettlementInfo}
                                     doAction={""}
                                     tip={"兑账信息"} actionText="兑账信息" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, getAdminList}=state;
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getAdminList.fetching,
        data: getAdminList.data
    }
}


export default connect(mapStateToProps)(StoreListContainer)