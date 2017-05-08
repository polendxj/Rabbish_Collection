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
        this._prePage = this._prePage.bind(this);
        this._changePage = this._changePage.bind(this);
        this._nextPage = this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: page_size};
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

    _delete(id, title) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + title + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteObject(id, "", "", "", "", "", REVIEW_LIST_START, REVIEW_LIST_END, review_delete, review_list));
        })
    }

    _search() {

    }

    _changePage(page) {
        this.page = page;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, REVIEW_LIST_START, REVIEW_LIST_END, review_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, REVIEW_LIST_START, REVIEW_LIST_END, review_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {page: this.page, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, REVIEW_LIST_START, REVIEW_LIST_END, review_list));
    }

    render() {
        const {fetching, data} =this.props;
        console.log("review", data);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={' icon-feed'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"评价列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.status ? data.data.totalElements : 0} page={this.page}
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
            content: $("#reply" + id).val(),
            createTime: date
        };
        this.props._reply(params);
    }

    _delete(id, title) {
        this.props._delete(id, title)
    }

    componentWillUpdate() {
        $(".colpText").on("click", function () {
            if ($(this).text() == "收起评论") {
                $(this).text("展开评论");
            } else if ($(this).text() == "展开评论") {
                $(this).text("收起评论");
            }
        });
    }

    generateStars(score) {
        var fullStars = Math.floor(score);
        var halfStars = score % 1 === 0 ? 0 : 1;
        var emptyStars = 5 - fullStars - halfStars;
        var full = [];
        var half = [];
        var empty = [];
        if (fullStars >= 1) {
            for (var i = 0; i < fullStars; i++) {
                full.push(
                    <icon key={"full-"+i} className="icon icon-star-full2" style={{color:"#FDAA01"}}></icon>
                )
            }
        }
        if (halfStars == 1) {
            half.push(
                <icon key={"half-1"} className="icon icon-star-half" style={{color:"#FDAA01"}}></icon>
            )
        }
        if (emptyStars >= 1) {
            for (var j = 0; j < emptyStars; j++) {
                empty.push(
                    <icon key={"empty-"+j} className="icon icon-star-empty3" style={{color:"#CFCFCF"}}></icon>
                )
            }
        }
        return (
            <div>
                {full}
                {half}
                {empty}
            </div>
        )
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        var replyFlag = (val.replyUserid == null || val.replyUserid == "");
                        var overallScore = this.generateStars(val.overallScore);
                        var score1Stars = this.generateStars(val.score1);
                        var score2Stars = this.generateStars(val.score2);
                        var score3Stars = this.generateStars(val.score3);
                        tb.push(
                            <div key={key} className="panel panel-white text-left">
                                <div className="panel-heading" style={{padding: "15px 20px 10px 20px"}}>
                                    <table style={{width: "100%"}}>
                                        <tr>
                                            <td>
                                                <div className="panel-title">
                                                    {"[" + val.title + "]" + val.content}
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
                                                            <span className="colpText">{replyFlag ? "回复评论" : "已回复"}</span></a>
                                                    </small>
                                                </div>
                                            </td>
                                            <td style={{width: "250px"}}>
                                                <div>
                                                    <div className="row"><label style={{width:"100px",float:"left",textAlign:"right"}}>整体评分：</label><div style={{float:"left"}}>{overallScore}</div></div>
                                                    <div className="row"><label style={{width:"100px",float:"left",textAlign:"right"}}>回收频率评分：</label><div style={{float:"left"}}>{score1Stars}</div></div>
                                                    <div className="row"><label style={{width:"100px",float:"left",textAlign:"right"}}>礼品兑换评分：</label><div style={{float:"left"}}>{score2Stars}</div></div>
                                                    <div className="row"><label style={{width:"100px",float:"left",textAlign:"right"}}>袋子发放评分：</label><div style={{float:"left"}}>{score3Stars}</div></div>
                                                </div>
                                                <div className="heading-elements"
                                                     style={{height: "18px", top: "25px", right: "10px"}}>
                                                    <i className="icon-cross" style={{fontSize: "18px", cursor: "pointer"}}
                                                       onClick={this._delete.bind(this, val.id, val.title)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                </div>
                                <div id={"collapse-" + val.id}
                                     className={replyFlag ? "panel-collapse collapse" : "panel-collapse collapse in"}
                                     style={{paddingLeft: replyFlag ? 0 : "20px"}}>
                                    <div className="panel-body"
                                         style={{padding: replyFlag ? 0 : "15px 20px 10px 20px"}}>
                                        {replyFlag ?
                                            <div>
                                                <div className="form-group has-feedback" style={{margin: 0}}>
                                                    <input id={"reply" + val.id} style={{border: 0}} type="text"
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
                                                    {val.replyContent}
                                                </div>
                                                <div style={{height: "10px"}}></div>
                                                <small className="display-block" style={{fontSize: "6px"}}>
                                                    {val.replyUserName}&nbsp;&nbsp;
                                                    <i className="icon-alarm" style={{fontSize: "3px"}}></i>
                                                    &nbsp;
                                                    {timeStamp2Time(val.replyTime)}
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
    const {getReviewList}=state;
    return {
        fetching: getReviewList.fetching,
        data: getReviewList.data
    }
}


export default connect(mapStateToProps)(ReviewListContainer)