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
    }

    componentDidMount() {
        var self=this;
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, MANUALRECORD_LIST_START, MANUALRECORD_LIST_END, manualRecord_list));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if($(this).find('a').text().trim()=="按垃圾分类搜索"){
                self.searchColumn="DRIVER";
            }else{
                self.searchColumn="LINE";
            }
        })
    }

    _delete(id,classConfName,weight) {
        var that = this;
        if(sessionStorage['adminId']==id){
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.accountOperating)
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + classConfName + "（"+weight+"）" + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0,that.searchColumn, $("#search_value").val()))
        })

    }

    _search(){

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
        const {fetching, data} =this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right',marginTop:'-59px'}}>
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid'}}>
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false" style={{
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    fontWeight: 'bold',
                                    color: '#193153'
                                }}><span
                                    style={{color: '#193153'}} id="search_way">{"按垃圾分类搜索"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按垃圾分类搜索"}</a></li>
                                    <li><a href="#">{"按路线搜索"}</a></li>
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
                        <legend className="text-bold">{"垃圾称量列表区"}</legend>
                        <div style={{marginTop:'-80px'}}>
                            <Pagenation counts={data ? data.data.content.length : 0} page={this.page}
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
        console.log("recordData",data);
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
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li style={{display:'block'}} onClick={this._detail.bind(this, '/DataManage/TransitLine/ModifyTransitLine/:' + val.id)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {"修改"}</a></li>
                                        <li style={{display:'block'}} onClick={this._delete.bind(this, val.id,val.classConf.name,val.weight)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {"删除"}</a></li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
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
                        <th className="col-md-2 text-bold text-center">{"重量"}</th>
                        <th className="col-md-2 text-bold text-center">{"起始时间"}</th>
                        <th className="col-md-2 text-bold text-center">{"结束时间"}</th>
                        <th className="col-md-4 text-bold text-center">{"错误描述"}</th>
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

function mapStateToProps(state) {
    const {getManualRecordList}=state;
    return {
        fetching: getManualRecordList.fetching,
        data: getManualRecordList.data
    }
}


export default connect(mapStateToProps)(ManualRecordListContainer)