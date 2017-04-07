/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal, ErrorModal, roleApplicationUse,timeStamp2Time} from '../../components/Tool/Tool'
import {STORESETTLEMENT_LIST_START, STORESETTLEMENT_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';

export default class StoreSettlementListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "兑账记录", link: ''},
            {text: "兑账记录列表", link: ''}
        ];
        this.operation = [
            {icon: "", text: "", action: ""}
        ];
        this.searchColumn = "TYPE";
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, STORESETTLEMENT_LIST_START, STORESETTLEMENT_LIST_END, storeSettlement_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按单位/小区搜索") {
                self.searchColumn = "TYPE";
            } else {
                self.searchColumn = "ADMIN_NAME";
            }
        })
    }

    _search() {

    }

    _delete(id, name) {
        var that = this;
        if (sessionStorage['adminId'] == id) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.accountOperating);
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + name + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0, that.searchColumn, $("#search_value").val()))
        })

    }

    _changePage(page) {
        this.page = page;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, STORESETTLEMENT_LIST_START, STORESETTLEMENT_LIST_END, storeSettlement_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, STORESETTLEMENT_LIST_START, STORESETTLEMENT_LIST_END, storeSettlement_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, STORESETTLEMENT_LIST_START, STORESETTLEMENT_LIST_END, storeSettlement_list));
    }

    render() {
        const {fetching, data} =this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-coin-yen'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"兑账记录列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <StoreSettlementListComponent data={data} fetching={fetching}
                                                      _delete={this._delete}
                                                      _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class StoreSettlementListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id, name) {
        this.props._delete(id, name)
    }

    render() {
        const {data, fetching}=this.props;
        console.log("storeSettlement",data);
        let tb = [];
        if (data) {
            if (data.data.content.length > 0) {
                data.data.content.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{val.storeName}</td>
                        <td className="text-center">{val.city}</td>
                        <td className="text-center">{val.county}</td>
                        <td className="text-center">{val.points}</td>
                        <td className="text-center">{val.amount}</td>
                        <td className="text-center">{timeStamp2Time(val.settletime)}</td>
                        <td className="text-center">{val.manager}</td>
                    </tr>)
                }.bind(this));
            }else{
                tb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        }else {
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var tableHeight = ($(window).height() - 180);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom: '85px'}}>
                    <thead>
                        <tr style={{fontWeight: 'bold'}}>
                            <th className="text-center" style={{width: "20px"}}></th>
                            <th className="col-md-2 text-bold text-center">{"商铺名称"}</th>
                            <th className="col-md-2 text-bold text-center">{"城市"}</th>
                            <th className="col-md-2 text-bold text-center">{"行政区"}</th>
                            <th className="col-md-1 text-bold text-center">{"结算积分"}</th>
                            <th className="col-md-1 text-bold text-center">{"结算金额"}</th>
                            <th className="col-md-2 text-bold text-center">{"结算时间"}</th>
                            <th className="col-md-2 text-bold text-center">{"负责人"}</th>
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

function mapStateToProps(state) {
    const {getStoreSettlementList}=state;
    return {
        fetching: getStoreSettlementList.fetching,
        data: getStoreSettlementList.data
    }
}


export default connect(mapStateToProps)(StoreSettlementListContainer)