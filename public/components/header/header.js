/**
 * Created by Administrator on 2016/8/18.
 */
import React, {Component, PropTypes} from 'react';
import {roleApplicationUse} from '../../components/Tool/Tool'
import {browserHistory} from 'react-router'

export default class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-inverse">
                <Logo />

                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <div id="topMenuBottomLine"
                         style={{height: '2px', position: 'absolute', borderBottom: '3px solid #F5F5F5'}}></div>
                    <TopMenus changeTopMenu={this.props.changeTopMenu}/>
                    <RightPanel _changeLang={this.props._changeLang} _logOut={this.props._logOut} _showModal={this.props._showModal}/>
                </div>
            </div>
        )
    }
}

class Logo extends Component {
    constructor() {
        super();
        this.logo_style = {color: 'white', fontSize: '14px', position: 'relative', top: '9px'}
    }

    render() {
        return (
            <div className="navbar-header">
                <span id="logoText" style={this.logo_style}></span>
                <a className="navbar-brand" href="index.html"><img src="/assets/images/logo.png"
                                                                   style={{
                                                                       marginTop: '-2px'
                                                                   }} alt=""/>
                    <span style={{
                        position: "relative",
                        float: "right",
                        marginRight: "0",
                        marginTop: "-22px",
                        marginLeft: "30px",
                        fontSize: "16px"}}>垃圾回收运营平台</span>

                </a>
                <ul className="nav navbar-nav visible-xs-block">
                    <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a>
                    </li>
                    <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a>
                    </li>
                </ul>
            </div>
        )
    }
}

class TopMenus extends Component {
    constructor() {
        super();
        this.span_style = {paddingLeft: 0};
        this.selected = 0;
    }

    _moveTopMenuBottomLine(idx, flag) {
        var width = $(".topmenu").eq(idx).width();
        var top = $(".topmenu").eq(idx).offset().top + 42;
        var left = $(".topmenu").eq(idx).offset().left;
        if (flag) {
            $("#topMenuBottomLine").css({width: width, top: top, left: left}, 500);
        } else {
            $("#topMenuBottomLine").animate({width: width, top: top, left: left}, 500);
        }
        this.selected = idx;
    }

    _menuChange(idx, flag) {
        this._moveTopMenuBottomLine(idx, flag);
        this.props.changeTopMenu(idx);
        if (idx == 0) {
            browserHistory.push("/Statistic/RubbishPutIn");
        }else if (idx == 1) {
            browserHistory.push("/CustomerService/UserManage");
        } else if (idx == 2) {
            browserHistory.push("/CustomerService/StoreSettlementManage");
        } else if (idx == 3) {
            browserHistory.push("/DataManage/RubbishClass");
        } else if (idx == 4) {
            browserHistory.push("/SystemNotice/NoticeManage");
        }
    }

    componentDidMount() {
        this._moveTopMenuBottomLine(0, true);
    }

    render() {
        return (
            <ul className="nav navbar-nav" style={{fontWeight: 'bold'}}>
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 0, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-stats-bars2" style={{fontSize: "12px"}}></i> <span
                        style={this.span_style}>{"统计分析"}</span>
                    </a>
                </li>
                <li
                    className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 1, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-people" style={{fontSize: "12px"}}></i> <span
                        style={this.span_style}>{"用户中心"}</span>
                    </a>
                </li>
                <li
                    className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 2, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-hammer-wrench" style={{fontSize: "12px"}}></i> <span
                        style={this.span_style}>{"运营管理"}</span>
                    </a>
                </li>
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 3, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-database-insert" style={{fontSize: "12px"}}> </i> <span
                        style={this.span_style}>{"数据管理"}</span>
                    </a>
                </li>
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 4, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-bubble-notification" style={{fontSize: "12px"}}> </i> <span
                        style={this.span_style}>{"公告发布"}</span>
                    </a>
                </li>
            </ul>
        )
    }
}

class RightPanel extends Component {
    constructor(props) {
        super(props)
        this.toAlarmHistory = this.toAlarmHistory.bind(this);
        this.currentLang = window.navigator.language.indexOf("CN") >= 0 ? "CN" : "EN";
    }

    toAlarmHistory() {
        browserHistory.push("/Monitor/Alarm/AlarmHistory");
    }

    _changeLang(type) {
        this.currentLang = type;
        this.props._changeLang(type);
        setTimeout(function () {
            this._moveTopMenuBottomLine(sessionStorage["currentMenu"] ? parseInt(sessionStorage["currentMenu"]) : 0)

        }.bind(this), 100)

    }

    _moveTopMenuBottomLine(idx, flag) {
        if (!idx) idx = 0;
        var width = $(".topmenu").eq(idx).width();
        var top = $(".topmenu").eq(idx).offset().top + 42;
        var left = $(".topmenu").eq(idx).offset().left;
        if (flag) {
            $("#topMenuBottomLine").css({width: width, top: top, left: left}, 500);
        } else {
            $("#topMenuBottomLine").animate({width: width, top: top, left: left}, 500);
        }
        this.selected = idx;
    }

    componentDidMount() {
        this._moveTopMenuBottomLine(parseInt(sessionStorage["currentMenu"]))
    }

    render() {

        var lis = [];
        var label = "";

        return (
            <ul className="nav navbar-nav navbar-right">
                {/*<li className="dropdown">
                 <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.toAlarmHistory.bind(this)}>
                 <i className="icon-warning"></i>
                 <span className="visible-xs-inline-block position-right">告警</span>
                 <span className="badge bg-warning-400" id="alarmWarning"></span>
                 </a>

                 /!*<div className="dropdown-menu dropdown-content width-350">
                 <div className="dropdown-content-heading">
                 告警
                 </div>

                 <ul className="media-list dropdown-content-body">
                 <li className="media">

                 <div className="media-body">
                 <a href="#" className="media-heading">
                 <span className="text-semibold">CDN-01 CPU</span>
                 <span className="media-annotation pull-right">12:16</span>
                 </a>

                 <span
                 className="text-muted">温度过高，请运维人员注意CPU散热，检查机房温度</span>
                 </div>
                 </li>
                 <li className="media">

                 <div className="media-body">
                 <a href="#" className="media-heading">
                 <span className="text-semibold">CDN-01 Disk</span>
                 <span className="media-annotation pull-right">12:16</span>
                 </a>

                 <span
                 className="text-muted">硬盘使用率已接近90%，请及时扩充硬盘，以免数据丢失。。。</span>
                 </div>
                 </li>


                 </ul>

                 <div className="dropdown-content-footer">
                 <a href="#" data-popup="tooltip" title="" data-original-title="All messages"><i
                 className="icon-menu display-block"></i></a>
                 </div>
                 </div>*!/
                 </li>*/}

                <li className="dropdown dropdown-user">
                    <a className="dropdown-toggle" data-toggle="dropdown">
                        <img src="/assets/images/userimg.png" alt=""/>
                        <span>{sessionStorage['type']==10?"超级管理员":"管理员"}</span>
                        <i className="caret"></i>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-right">
                        {/*<li><a href="#"><i className="icon-user-plus"></i> 我的资料</a></li>
                         <li><a href="#"><span className="badge bg-teal-400 pull-right">58</span> <i
                         className="icon-comment-discussion"></i> 系统消息</a></li>
                         <li className="divider"></li>
                         <li><a href="#"><i className="icon-cog5"></i> 账号设置</a></li>*/}
                        <li onClick={this.props._showModal}><a href="javascript:void(0)" data-toggle="modal" data-target="#modifyPwdModal"><i className="icon-database-edit2"></i>
                            {"修改密码"}</a></li>
                        <li onClick={this.props._logOut}><a href="javascript:void(0)"><i className="icon-switch2"></i>
                            {Current_Lang.label.deregiester}</a></li>

                    </ul>
                </li>
            </ul>
        )
    }
}



