/**
 * Created by Captain on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal, ErrorModal, roleApplicationUse} from '../../components/Tool/Tool'

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
        this.dataList = [
            {
                id: "001",
                name: "付大海",
                title: "asfasd",
                content: "啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发啊发的发射点法法沙发",
                createTime: "2017-01-08 12:32:33",
                reply: {
                    name: "扫码员1",
                    content: "魔王副书记覅文件分类根据饿哦i个",
                    createTime: "2017-01-09 12:32:35"
                }
            },
            {
                id: "002",
                name: "寇建波",
                title: "afasdf",
                content: "没事佛啊佛为附件",
                createTime: "2017-01-06 11:22:33",
                reply: {
                    name: "扫码员2",
                    content: "魔王副书记覅文件分类根据饿哦i个",
                    createTime: "2017-01-09 12:32:33"
                }
            },
            {
                id: "003",
                name: "熊荣东",
                title: "asdfak",
                content: "吗我额就开机即可",
                createTime: "2017-02-02 13:11:23",
                reply: ""
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
                        <legend className="text-bold">{"评价列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={3} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <ReviewListComponent data={this.dataList} fetching={false}
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

    _delete(id, title) {
        this.props._delete(id, title)
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
                    tb.push(
                        <div key={key} className="panel panel-white text-left">
                            <div className="panel-heading" style={{padding:"15px 20px 10px 20px"}}>
                                <div className="panel-title">
                                    <div style={{paddingRight:"50px"}}>
                                        {"[" + val.title + "]" + val.content}
                                    </div>
                                    <div style={{height:"10px"}}></div>
                                    <small className="display-block" style={{fontSize: "6px"}}>
                                        {val.name}&nbsp;&nbsp;
                                        <i className="icon-alarm" style={{fontSize: "3px"}}/>
                                        &nbsp;
                                        {val.createTime}&nbsp;&nbsp;
                                        <a className="collapsed" data-toggle="collapse" href={"#collapse-" + val.id}>
                                            <i className="icon-bubble2" style={{fontSize: "4px"}}></i>
                                            &nbsp;
                                            {val.reply == "" ? "回复评论" : "收起评论"}</a>
                                    </small>
                                </div>
                                <div className="heading-elements" style={{height:"18px",top:"25px",right:"10px"}}>
                                    <i className="icon-cross" style={{fontSize: "18px",cursor:"pointer"}} onClick={this._delete.bind(this,val.id,val.title)}></i>
                                </div>
                            </div>
                            <div id={"collapse-" + val.id}
                                 className={val.reply == "" ? "panel-collapse collapse" : "panel-collapse collapse in"}
                                 style={{paddingLeft: val.reply == ""?0:"20px"}}>
                                <div className="panel-body" style={{padding:val.reply == ""?0:"15px 20px 10px 20px"}}>
                                    {val.reply == "" ?
                                        <div>
                                            <div className="form-group has-feedback" style={{margin:0}}>
                                                <input id="name" style={{border:0}} type="text" className="form-control"
                                                       placeholder={"回复该评论"} autoComplete="off"/>
                                                    <div className="form-control-feedback" style={{pointerEvents:"auto"}}>
                                                        <i className="icon-arrow-right8" style={{fontWeight:"bold",fontSize: "14px",cursor:"pointer"}} />
                                                    </div>
                                            </div>
                                        </div> :
                                        <div>
                                            <div>
                                                {val.reply.content}
                                            </div>
                                            <div style={{height:"10px"}}></div>
                                            <small className="display-block" style={{fontSize: "6px"}}>
                                                {val.reply.name}&nbsp;&nbsp;
                                                <i className="icon-alarm" style={{fontSize: "3px"}}></i>
                                                &nbsp;
                                                {val.reply.createTime}
                                            </small>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    )
                }.bind(this))
            }
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
    const {changeSearch1Type, form, getAdminList}=state;
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getAdminList.fetching,
        data: getAdminList.data
    }
}


export default connect(mapStateToProps)(ReviewListContainer)