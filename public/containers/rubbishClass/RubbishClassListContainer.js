/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal,ErrorModal,pointsType,timeStamp2Time} from '../../components/Tool/Tool';
import {CLASSCONF_LIST_START, CLASSCONF_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition, deleteObject} from '../../actions/CommonActions';

export default class RubbishClassListContainer extends Component {
    constructor(props) {
        super(props);
        this.page=0;
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "垃圾分类", link: ''},
            {text: "垃圾分类列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/DataManage/RubbishClass/Register"}
        ];
        this.searchColumn="TYPE";
        this._delete = this._delete.bind(this);
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_list));
    }

    _search(){

    }

    _delete(id,name) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + name + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteObject(id, "", "", "", "", "",CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_delete, classConf_list))
        })
    }

    _changePage(page) {
        this.page = page;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_list));
    }

    render() {
        const {fetching, data} =this.props;
        console.log("classify",data);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cabinet'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"垃圾分类列表区"}</legend>
                        <div style={{marginTop:'-80px'}}>
                            <Pagenation counts={data ? data.data.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <RubbishClassListComponent data={data} fetching={fetching}
                                            _delete={this._delete}
                                            _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class RubbishClassListComponent extends Component{
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id,name) {
        this.props._delete(id,name)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.data.length > 0) {
                data.data.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor:key%2==0?"#F8F8F8":""}}>
                        <td className="text-center">{key+1}</td>
                        <td className="text-center">{val.name}</td>
                        <td className="text-center">{val.rewardPoints}</td>
                        <td className="text-center">{pointsType(val.pointsType)}</td>
                        <td className="text-left">{val.description}</td>
                        <td className="text-center">{timeStamp2Time(val.updateTime)}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li style={{display:'block'}} onClick={this._detail.bind(this, '/DataManage/RubbishClass/Update/:' + val.id)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {"修改"}</a></li>
                                        <li style={{display:'block'}} onClick={this._delete.bind(this, val.id,val.name)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {"删除"}</a></li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this))
            }else{
                tb.push(
                    <tbody>
                    <tr>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData/>
                        </td>
                    </tr>
                    </tbody>
                )
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
                        <th className="col-md-2 text-bold text-center">{"奖励积分"}</th>
                        <th className="col-md-2 text-bold text-center">{"计分方式"}</th>
                        <th className="col-md-4 text-bold text-left">{"分类描述"}</th>
                        <th className="col-md-2 text-bold text-center">{"更新时间"}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
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
    const {getClassConfList}=state;
    return {
        fetching: getClassConfList.fetching,
        data: getClassConfList.data
    }
}


export default connect(mapStateToProps)(RubbishClassListContainer)