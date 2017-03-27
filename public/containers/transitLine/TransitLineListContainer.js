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
import {TRANSITLINE_LIST_START, TRANSITLINE_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';

export default class TransitLineListContainer extends Component {
    constructor(props) {
        super(props);
        this.page=0;
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "车辆运输", link: ''},
            {text: "车辆运输列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/DataManage/TransitLine/Register"}
        ];
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, TRANSITLINE_LIST_START, TRANSITLINE_LIST_END, transitLine_list));
    }

    _delete(id,name) {
        var that = this;
        if(sessionStorage['adminId']==id){
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.accountOperating)
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + name + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0,that.searchColumn, $("#search_value").val()))
        })

    }

    _search(){

    }

    _changePage(page) {
        this.page = page;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, TRANSITLINE_LIST_START, TRANSITLINE_LIST_END, transitLine_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, TRANSITLINE_LIST_START, TRANSITLINE_LIST_END, transitLine_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, TRANSITLINE_LIST_START, TRANSITLINE_LIST_END, transitLine_list));
    }

    render() {
        const {fetching, data} =this.props;
        console.log("transitData",data);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={' icon-truck'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"车辆运输列表区"}</legend>
                        <div style={{marginTop:'-80px'}}>
                            <Pagenation counts={data&&data.status ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <TransitLineListComponent data={data} fetching={fetching}
                                            _delete={this._delete}/>
                    </fieldset>
                </div>
            </div>
        )
    }
}

class TransitLineListComponent extends Component{
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
            if(data.status){
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        tb.push(<tr key={key} style={{backgroundColor:key%2==0?"#F8F8F8":""}}>
                            <td className="text-center">{key+1}</td>
                            <td className="text-center">{val.licensePlateNum}</td>
                            <td className="text-center">{val.driver}</td>
                            <td className="text-center">{val.contact}</td>
                            <td className="text-center">{val.drivingLicenseNum}</td>
                            <td className="text-center">{val.startLocation}</td>
                            <td className="text-center">{val.stoppedLocation}</td>
                            <td className="text-center">{val.endLocation}</td>
                            <td className="text-center">{timeStamp2Time(val.createTime)}</td>
                        </tr>)
                    }.bind(this));
                }else{
                    tb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            }else{
                tb.push(ErrorModal(Current_Lang.status.minor,"获取数据错误"))
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
                        <th className="col-md-1 text-bold text-center">{"车牌号"}</th>
                        <th className="col-md-2 text-bold text-center">{"司机姓名"}</th>
                        <th className="col-md-2 text-bold text-center">{"联系方式"}</th>
                        <th className="col-md-2 text-bold text-center">{"驾照"}</th>
                        <th className="col-md-1 text-bold text-center">{"起点"}</th>
                        <th className="col-md-1 text-bold text-center">{"经停地点"}</th>
                        <th className="col-md-1 text-bold text-center">{"终点"}</th>
                        <th className="col-md-2 text-bold text-center">{"记录时间"}</th>
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
    const {getTransitLineList}=state;
    return {
        fetching: getTransitLineList.fetching,
        data: getTransitLineList.data
    }
}


export default connect(mapStateToProps)(TransitLineListContainer)