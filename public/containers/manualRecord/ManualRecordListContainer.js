/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal,ErrorModal,roleApplicationUse,timeStamp2Time} from '../../components/Tool/Tool';
import {MANUALRECORD_LIST_START, MANUALRECORD_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';

export default class ManualRecordListContainer extends Component {
    constructor(props) {
        super(props);
        this.page=0;
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "垃圾称量", link: ''},
            {text: "垃圾称量列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/DataManage/ManualRecord/Register"}
        ];
        this.searchColumn="DRIVER";
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);

    }

    componentDidMount() {
        var params = {page: 0, size: page_size,sort:"start_time,desc"};
        this.props.dispatch(getListByMutilpCondition(params, MANUALRECORD_LIST_START, MANUALRECORD_LIST_END, manualRecord_list));
    }

    _delete(id,classConfName,weight) {
        var that = this;
        if(sessionStorage['adminId']==id){
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.accountOperating);
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + classConfName + "（"+weight+"）" + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0,that.searchColumn, $("#search_value").val()))
        })

    }

    _search(){
        var sort = $("#sortSelect").val()+","+$("#descOrAscSelect").val();
        var params = {
            page: this.page,
            size: page_size,
            sort: sort
        };
        this.props.dispatch(getListByMutilpCondition(params, MANUALRECORD_LIST_START, MANUALRECORD_LIST_END, manualRecord_list));
    }

    _changePage(page) {
        this.page = page;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, MANUALRECORD_LIST_START, MANUALRECORD_LIST_END, manualRecord_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, MANUALRECORD_LIST_START, MANUALRECORD_LIST_END, manualRecord_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, MANUALRECORD_LIST_START, MANUALRECORD_LIST_END, manualRecord_list));
    }

    render() {
        const {fetching, data} =this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-piggy-bank'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>
                            <li>
                                <select id="sortSelect" className="form-control">
                                    <option value={"start_time"}>按起始时间排序</option>
                                    <option value={"end_time"}>按结束时间排序</option>
                                </select>
                            </li>
                            <li>
                                <select id="descOrAscSelect" className="form-control">
                                    <option value={"desc"}>递减</option>
                                    <option value={"asc"}>递增</option>
                                </select>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"垃圾称量列表区"}</legend>
                        <div style={{marginTop:'-80px'}}>
                            <Pagenation counts={data ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <ManualRecordListComponent data={data} fetching={fetching}
                                            _delete={this._delete}
                                            _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class ManualRecordListComponent extends Component{
    constructor(props) {
        super(props);
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id,classConfName,weight) {
        this.props._delete(id,classConfName,weight)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.data.content.length > 0) {
                data.data.content.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor:key%2==0?"#F8F8F8":""}}>
                        <td className="text-center">{key+1}</td>
                        <td className="text-center">{val.classConf.name}</td>
                        <td className="text-center">{val.weight}</td>
                        <td className="text-center">{timeStamp2Time(val.startTime)}</td>
                        <td className="text-center">{timeStamp2Time(val.endTime)}</td>
                        <td className="text-center">{val.description}</td>
                    </tr>)
                }.bind(this))
            }else{
                tb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            }
        }else{
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var tableHeight = ($(window).height()-240);
        return (
            <div className="table-responsive" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom:'85px'}}>
                    <thead>
                    <tr style={{fontWeight:'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold text-center">{"分类名称"}</th>
                        <th className="col-md-2 text-bold text-center">{"重量（吨）"}</th>
                        <th className="col-md-2 text-bold text-center">{"起始时间"}</th>
                        <th className="col-md-2 text-bold text-center">{"结束时间"}</th>
                        <th className="col-md-4 text-bold text-center">{"详情描述"}</th>
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
    const {getManualRecordList}=state;
    return {
        fetching: getManualRecordList.fetching,
        data: getManualRecordList.data
    }
}


export default connect(mapStateToProps)(ManualRecordListContainer)