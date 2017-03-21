/**
 * Created by Captain on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal, ErrorModal, roleApplicationUs, timeStamp2Time} from '../../components/Tool/Tool';
import {REVIEW_LIST_START, REVIEW_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition, saveObject, deleteObject} from '../../actions/CommonActions';

export default class ReviewListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "评价管理", link: ''},
            {text: "评价列表", link: ''}
        ];
        this.operation = [
            {
                icon: "",
                text: "",
                action: ""
            }
        ];
        this.searchColumn = "DRIVER";
        this._reply = this._reply.bind(this);
        this._delete = this._delete.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, REVIEW_LIST_START, REVIEW_LIST_END, review_list));
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

    _reply(params) {
        var that = this;
        var listParams = {page: 0, size: 20};
        this.props.dispatch(saveObject(params, "", "", reply_register, "/CustomerService/ReviewManage", "noAlert", function () {
            that.props.dispatch(getListByMutilpCondition(listParams, REVIEW_LIST_START, REVIEW_LIST_END, review_list));
        }));
    }

    _delete(id, replyid, title) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + title + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteObject(replyid, "", "", "", "", "", "", "", reply_delete, review_list));
            that.props.dispatch(deleteObject(id, "", "", "", "", "", REVIEW_LIST_START, REVIEW_LIST_END, review_delete, review_list));
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
        const {fetching, data} =this.props;
        console.log("review", data);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"评价列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.status ? data.data.content.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <ReviewListComponent data={data} fetching={fetching}
                                             _reply={this._reply}
                                             _delete={this._delete}
                                             _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class ReviewListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _lockUser() {

    }

    _unlockUser() {

    }

    _resetPassword() {

    }

    _detail(path) {
        browserHistory.push(path)
    }

    _reply(id, userid) {
        var date = new Date().getTime();
        var params = {
            userid: userid,
            reviewid: id,
            content: $("#reply").val(),
            createTime: date
        };
        console.log("reply",$("#reply").val());
        this.props._reply(params);
    }

    _delete(id, replyid, title) {
        this.props._delete(id, replyid, title)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        var replyFlag = (val.reply == ""||typeof val.reply.replyContent=="undefined");
                        tb.push(
                            <div key={key} className="panel panel-white text-left">
                                <div className="panel-heading" style={{padding: "15px 20px 10px 20px"}}>
                                    <div className="panel-title">
                                        <div style={{paddingRight: "50px"}}>
                                            {"[" + val.title + "]" + val.content}
                                        </div>
                                        <div style={{height: "10px"}}></div>
                                        <small className="display-block" style={{fontSize: "6px"}}>
                                            {val.userName}&nbsp;&nbsp;
                                            <i className="icon-alarm" style={{fontSize: "3px"}}/>
                                            &nbsp;
                                            {timeStamp2Time(val.createTime)}&nbsp;&nbsp;
                                            <a className="collapsed" data-toggle="collapse"
                                               href={"#collapse-" + val.id}>
                                                <i className="icon-bubble2" style={{fontSize: "4px"}}></i>
                                                &nbsp;
                                                {replyFlag ? "回复评论" : "收起评论"}</a>
                                        </small>
                                    </div>
                                    <div className="heading-elements"
                                         style={{height: "18px", top: "25px", right: "10px"}}>
                                        <i className="icon-cross" style={{fontSize: "18px", cursor: "pointer"}}
                                           onClick={this._delete.bind(this, val.id, val.reply.id, val.title)}></i>
                                    </div>
                                </div>
                                <div id={"collapse-" + val.id}
                                     className={replyFlag ? "panel-collapse collapse" : "panel-collapse collapse in"}
                                     style={{paddingLeft: replyFlag ? 0 : "20px"}}>
                                    <div className="panel-body"
                                         style={{padding: replyFlag ? 0 : "15px 20px 10px 20px"}}>
                                        {replyFlag ?
                                            <div>
                                                <div className="form-group has-feedback" style={{margin: 0}}>
                                                    <input id="reply" style={{border: 0}} type="text"
                                                           className="form-control"
                                                           placeholder={"回复该评论"} autoComplete="off"/>
                                                    <div className="form-control-feedback"
                                                         style={{pointerEvents: "auto"}}
                                                         onClick={this._reply.bind(this, val.id, val.userid)}>
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
                                                    {val.reply.replyContent}
                                                </div>
                                                <div style={{height: "10px"}}></div>
                                                <small className="display-block" style={{fontSize: "6px"}}>
                                                    {val.reply.replyUserName}&nbsp;&nbsp;
                                                    <i className="icon-alarm" style={{fontSize: "3px"}}></i>
                                                    &nbsp;
                                                    {timeStamp2Time(val.reply.replyTime)}
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

        var tableHeight = ($(window).height() - 240);
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
    const {getReviewList}=state;
    return {
        fetching: getReviewList.fetching,
        data: getReviewList.data
    }
}


export default connect(mapStateToProps)(ReviewListContainer)