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
    ListModal,
    timeStamp2Time,
    noticeType
} from '../../components/Tool/Tool';
import {
    NOTICE_LIST_START,
    NOTICE_LIST_END,
    NOTICE_DETAIL_START,
    NOTICE_DETAIL_END
} from '../../constants/index.js'
import {getListByMutilpCondition, deleteObject} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class NoticeListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "系统通知", link: ''},
            {text: "新闻政策", link: ''},
            {text: "新闻政策列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: "发 布", action: "/SystemNotice/NoticeManage/Register"}
        ];
        this.searchColumn = "ORGANIZATION";
        this.detailData = "";
        this._search = this._search.bind(this);
        this._detail = this._detail.bind(this);
        this._delete = this._delete.bind(this);
        this._changePage = this._changePage.bind(this);
        this._prePage = this._prePage.bind(this);
        this._nextPage = this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, NOTICE_LIST_START, NOTICE_LIST_END, notice_list));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按单位/小区搜索") {
                self.searchColumn = "ORGANIZATION";
            } else {
                self.searchColumn = "TIMERANGER";
            }
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _search() {
        var params = "";
        if (this.searchColumn == "ORGANIZATION") {
            params = {
                page: 0,
                size: page_size,
                type: $("#typeSelect").val()
            };
        }
        this.props.dispatch(getListByMutilpCondition(params, NOTICE_LIST_START, NOTICE_LIST_END, notice_list));
    }

    _detail(val) {
        this.props.dispatch(getListByMutilpCondition(val.id, NOTICE_DETAIL_START, NOTICE_DETAIL_END, notice_detail));
    }

    _delete(id, title) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + title + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteObject(id, "", "", "", "", "", NOTICE_LIST_START, NOTICE_LIST_END, notice_delete, notice_list))
        })

    }

    _changePage(page) {
        this.page = page;
        var params = "";
        if (this.searchColumn == "ORGANIZATION") {
            params = {
                page: this.page,
                size: page_size,
                type: $("#typeSelect").val()
            };
        }
        this.props.dispatch(getListByMutilpCondition(params, NOTICE_LIST_START, NOTICE_LIST_END, notice_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = "";
        if (this.searchColumn == "ORGANIZATION") {
            params = {
                page: this.page,
                size: page_size,
                type: $("#typeSelect").val()
            };
        }
        this.props.dispatch(getListByMutilpCondition(params, NOTICE_LIST_START, NOTICE_LIST_END, notice_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = "";
        if (this.searchColumn == "ORGANIZATION") {
            params = {
                page: this.page,
                size: page_size,
                type: $("#typeSelect").val()
            };
        }
        this.props.dispatch(getListByMutilpCondition(params, NOTICE_LIST_START, NOTICE_LIST_END, notice_list));
    }

    componentDidUpdate(){
        if(this.props.detailData){
            $("#jqRenderContent").html(this.props.detailData.data.content);
        }
    }

    render() {
        const {fetching, data,detailData} =this.props;
        var detailNoticeInfo = "";
        if (detailData.status) {
            var hasHttp = detailData.data.img.indexOf("http") > -1;
            detailNoticeInfo =
                <div>
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"详细信息"}
                            </legend>
                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"标 题"}</label>
                                    <div className="col-lg-3">
                                        <input type="text" value={detailData.data.title} className="form-control"
                                               autoComplete="off" disabled="disabled"/>
                                    </div>
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"类型"}</label>
                                    <div className="col-lg-3">
                                        <input type="text" value={noticeType(detailData.data.type)}
                                               className="form-control"
                                               autoComplete="off" disabled="disabled"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"标题图标"}</label>
                                    <div className="col-lg-4">
                                        <div className="thumbnail"
                                             style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                            <div className="thumb">
                                                <img
                                                    src={detailData.data.img ? (hasHttp ? detailData.data.img : imgBaseUrl + detailData.data.img) : "../assets/images/no_photo.gif"}
                                                    alt=""
                                                    style={{height: "160px", width: "160px"}}/>
                                                <div className="caption-overflow" style={{width: "auto"}}>
                                                    <span style={{top: 0, marginTop: 0}}>
                                                        <a href={detailData.data.img ? (hasHttp ? detailData.data.img : imgBaseUrl + detailData.data.img) : "../assets/images/no_photo.gif"}
                                                           data-popup="lightbox"
                                                           className="btn"
                                                           style={{height: "160px", width: "160px"}}></a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"创建时间"}</label>
                                    <div className="col-lg-3">
                                        <input type="text" value={timeStamp2Time(detailData.data.createTime)}
                                               className="form-control"
                                               autoComplete="off" disabled="disabled"/>
                                    </div>
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"修改时间"}</label>
                                    <div className="col-lg-3">
                                        <input type="text" value={timeStamp2Time(detailData.data.updateTime)}
                                               className="form-control"
                                               autoComplete="off" disabled="disabled"/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"内 容"}</label>
                                    <div className="col-lg-8" >
                                        <pre className=" content-group language-markup" id="jqRenderContent" style={{wordBreak:"break-all"}}>

                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                </div>;
        } else {
            detailNoticeInfo = <Loading />;
        }
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-newspaper2'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>

                            <li>
                                <select id="typeSelect" className="form-control">
                                    <option value={""}>所有类型</option>
                                    <option value={1}>公告</option>
                                    <option value={2}>新闻</option>
                                    <option value={3}>政策法规</option>
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
                        <legend className="text-bold">{"新闻政策列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <NoticeListComponent data={data} fetching={fetching}
                                             _delete={this._delete}
                                             _detail={this._detail}/>

                    </fieldset>
                    <ListModal  content={detailNoticeInfo}
                                     doAction={""}
                                     tip={"公告信息"} actionText="公告详情" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

class NoticeListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(val) {
        this.props._detail(val);
    }

    _delete(id, title) {
        this.props._delete(id, title)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.data && data.data.content.length > 0) {
                data.data.content.forEach(function (val, key) {
                    var hasHttp = val.img.indexOf("http") > -1;
                    tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{noticeType(val.type)}</td>
                        <td className="text-center">{val.title}</td>
                        <td className="text-center">
                            <div className="thumbnail" style={{margin: "0 auto", width: "35px", padding: 0, border: 0}}>
                                <div className="thumb">
                                    <img
                                        src={val.img ? (hasHttp ? val.img : imgBaseUrl + val.img) : "../assets/images/no_photo.gif"}
                                        alt=""
                                        style={{height: "30px", width: "30px"}}/>
                                    <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={val.img ? (hasHttp ? val.img : imgBaseUrl + val.img) : "../assets/images/no_photo.gif"}
                                               data-popup="lightbox"
                                               className="btn" style={{height: "30px", width: "30px"}}></a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.userName}</td>
                        <td className="text-center">{timeStamp2Time(val.createTime)}</td>
                        <td className="text-center">{timeStamp2Time(val.updateTime)}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#ListModal"
                                               onClick={this._detail.bind(this, val)}><i
                                                className=" icon-office"></i>
                                                {"详情"}</a>
                                        </li>
                                        <li style={{display: 'block'}}
                                            onClick={this._delete.bind(this, val.id, val.title)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {"删除"}</a></li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this));
            } else {
                tb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
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
                <table className="table table-bordered table-hover" style={{marginBottom: '85px'}}>
                    <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold text-center">{"公告类型"}</th>
                        <th className="col-md-2 text-bold text-center">{"标题"}</th>
                        <th className="col-md-2 text-bold text-center">{"图片"}</th>
                        <th className="col-md-2 text-bold text-center">{"发布人员"}</th>
                        <th className="col-md-2 text-bold text-center">{"创建时间"}</th>
                        <th className="col-md-2 text-bold text-center">{"修改时间"}</th>
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
    const {getNoticeList,getNoticeDetail, commonReducer}=state;
    return {
        fetching: getNoticeList.fetching,
        data: getNoticeList.data,
        detailData: getNoticeDetail.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(NoticeListContainer)