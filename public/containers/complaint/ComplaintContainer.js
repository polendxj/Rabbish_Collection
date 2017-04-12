/**
 * Created by Captain on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal, ErrorModal, roleApplicationUse, timeStamp2Time} from '../../components/Tool/Tool'
import {COMPLAINT_LIST_START, COMPLAINT_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition, saveObject} from '../../actions/CommonActions';

export default class ComplaintContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "投诉举报", link: ''},
            {text: "投诉举报列表", link: ''}
        ];
        this.operation = [
            {
                icon: "",
                text: "",
                action: ""
            }
        ];
        this.searchColumn = "DRIVER";
        this._deal = this._deal.bind(this);
        this._changePage = this._changePage.bind(this);
        this._prePage = this._prePage.bind(this);
        this._nextPage = this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, COMPLAINT_LIST_START, COMPLAINT_LIST_END, complaint_list));
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

    _deal(id, params) {
        var that = this;
        var listParams = {page: 0, size: page_size};
        this.props.dispatch(saveObject(params, "", "", complaint_update + "?id=" + id, "/CustomerService/ComplaintManage", "noAlert", function () {
            that.props.dispatch(getListByMutilpCondition(listParams, COMPLAINT_LIST_START, COMPLAINT_LIST_END, complaint_list));
        }));
    }

    _delete(id, title) {
        var that = this;
        if (sessionStorage['adminId'] == id) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.accountOperating)
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + title + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0, that.searchColumn, $("#search_value").val()))
        })

    }

    _changePage(page) {
        this.page = page;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, COMPLAINT_LIST_START, COMPLAINT_LIST_END, complaint_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, COMPLAINT_LIST_START, COMPLAINT_LIST_END, complaint_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, COMPLAINT_LIST_START, COMPLAINT_LIST_END, complaint_list));
    }

    render() {
        const {fetching, data} =this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={' icon-map4'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"投诉举报列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.status ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <ComplaintListComponent data={data} fetching={fetching}
                                                _delete={this._delete}
                                                _deal={this._deal}
                                                _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class ComplaintListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _resetPassword() {

    }

    _deal(id) {
        var params = {
            suggestion: $("#suggestion" + id).val()
        };
        this.props._deal(id, params);
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id, title) {
        this.props._delete(id, title)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        var dealFlag = (val.suggestion == "" || val.suggestion == null);
                        var hasHttp = val.photo.indexOf("http") > -1;
                        tb.push(
                            <div key={key} className="panel panel-white text-left">
                                <div className="panel-heading" style={{padding: "15px 20px 10px 20px"}}>
                                    <table style={{width: "100%"}}>
                                        <tr>
                                            <td>
                                                <div className="panel-title">
                                                    <div style={{paddingRight: "10px"}}>
                                                        {"[" + val.title + "] " + val.content}
                                                    </div>
                                                    <div style={{height: "10px"}}></div>
                                                    <small className="display-block" style={{fontSize: "6px"}}>
                                                        {val.userName}&nbsp;&nbsp;
                                                        <i className="icon-alarm" style={{fontSize: "3px"}}/>
                                                        &nbsp;
                                                        {timeStamp2Time(val.commitTime)}&nbsp;&nbsp;
                                                        <a className="collapsed" data-toggle="collapse"
                                                           href={"#collapse-" + val.id}>
                                                            <i className="icon-bubble2" style={{fontSize: "4px"}}></i>
                                                            &nbsp;
                                                            {dealFlag ? "回复投诉举报" : "已处理"}</a>
                                                    </small>
                                                </div>
                                            </td>
                                            <td style={{width: "85px"}}>
                                                <div>
                                                    <div >
                                                        <div className="thumbnail"
                                                             style={{marginBottom: 0, width: "85px"}}>
                                                            <div className="thumb">
                                                                <img
                                                                    src={val.photo ? (hasHttp ? val.photo : imgBaseUrl + val.photo) : "../assets/images/no_photo.gif"}
                                                                    alt="" style={{height: "80px", width: "80px"}}/>
                                                                <div className="caption-overflow">
                                                                <span style={{top: 0, marginTop: 0}}>
                                                                    <a href={val.photo ? (hasHttp ? val.photo : imgBaseUrl + val.photo) : "../assets/images/no_photo.gif"}
                                                                       data-popup="lightbox"
                                                                       className="btn"
                                                                       style={{height: "80px", width: "100px"}}></a>
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div id={"collapse-" + val.id}
                                     className={dealFlag ? "panel-collapse collapse" : "panel-collapse collapse in"}
                                     style={{paddingLeft: dealFlag ? 0 : "20px"}}>
                                    <div className="panel-body"
                                         style={{padding: dealFlag ? 0 : "15px 20px 10px 20px"}}>
                                        {dealFlag ?
                                            <div>
                                                <div className="form-group has-feedback" style={{margin: 0}}>
                                                    <input id={"suggestion" + val.id} style={{border: 0}} type="text"
                                                           className="form-control"
                                                           placeholder={"回复该投诉"} autoComplete="off"/>
                                                    <div className="form-control-feedback"
                                                         style={{pointerEvents: "auto"}}
                                                         onClick={this._deal.bind(this, val.id)}>
                                                        <i className="icon-arrow-right8" style={{
                                                            fontWeight: "bold",
                                                            fontSize: "14px",
                                                            cursor: "pointer"
                                                        }}/>
                                                    </div>
                                                </div>
                                            </div> :
                                            <div>
                                                <div>
                                                    {val.suggestion}
                                                </div>
                                                <div style={{height: "10px"}}></div>
                                                <small className="display-block" style={{fontSize: "6px"}}>
                                                    {val.dealUserName}&nbsp;&nbsp;
                                                    <i className="icon-alarm" style={{fontSize: "3px"}}></i>
                                                    &nbsp;
                                                    {timeStamp2Time(val.dealTime)}
                                                </small>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        )
                    }.bind(this));
                } else {
                    tb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            } else {
                tb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"))
            }
        } else {
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var tableHeight = ($(window).height() - 180);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <div style={{marginBottom: '85px'}}>
                    {tb}
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {getComplaintList}=state;
    return {
        fetching: getComplaintList.fetching,
        data: getComplaintList.data
    }
}


export default connect(mapStateToProps)(ComplaintContainer)