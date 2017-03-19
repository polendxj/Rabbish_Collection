/**
 * Created by Administrator on 2016/8/19.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';

class MainMenu extends Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        $(".left").on("click",function () {
            $(".left").removeClass("active");
            $(this).addClass("active");
            if($(this).find("ul").length<=0){
                $(".hidden-ul").css("display","none")

            }
        })

        $(".hidden-ul li").on("click",function () {
            $(".hidden-ul li a").css("backgroundColor","transparent");
            $(".hidden-ul li a").css("borderRight","0 #2C4B77 solid");
            $(".hidden-ul li a").css("color","rgba(255,255,255,0.75)");
            $(this).find("a").css("backgroundColor","#132640");
            $(this).find("a").css("color","white");
            $(this).find("a").css("borderRight","4px #2C4B77 solid");
        })
    }
    componentDidMount(){
        $(".hidden-ul li").on("click",function () {
            $(".hidden-ul li a").css("backgroundColor","transparent");
            $(".hidden-ul li a").css("borderRight","0 #2C4B77 solid");
            $(".hidden-ul li a").css("color","rgba(255,255,255,0.75)");
            $(this).find("a").css("backgroundColor","#132640");
            $(this).find("a").css("color","white");
            $(this).find("a").css("borderRight","4px #2C4B77 solid");
        })
    }

    render() {
        var mainMenu;
        switch (this.props.selected) {
            case 0:
                mainMenu = <Statistic _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
            case 1:
                mainMenu = <Business _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
            case 2:
                mainMenu = <DataManager _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
            case 3:
                mainMenu = <NotifyManager _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
        }
        return (
            <div className="sidebar sidebar-main " style={{borderRight: '0 red solid'}}>
                <div className="sidebar-content">
                    <div className="sidebar-category sidebar-category-visible">
                        <div className="category-content no-padding">
                            {mainMenu}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Statistic extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">
                <li className="navigation-header left"><span>{"统计分析"}</span> <i className="icon-menu" title=""
                                                                       data-original-title="统计分析"></i>
                </li>
                <li className="left active" onClick={this._leftMenuClick.bind(this, '/dashboard')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"系统监控"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/Statistic/RubbishPutIn')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"垃圾投放"}</span></a></li>

            </ul>
        )
    }
}


class Business extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">
                <li className="navigation-header left"><span>{"用户中心"}</span> <i className="icon-menu" title=""
                                                                                data-original-title="用户中心"></i>
                </li>
                <li className="left active" onClick={this._leftMenuClick.bind(this, '/CustomerService/UserManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"用户管理"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/CustomerService/ReviewManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"评价管理"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/CustomerService/ComplaintManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"投诉举报"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/DataManage/CorrectionManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"纠错记录"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/CustomerService/OrganizationManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"小区/单位管理"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/dashboard')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"二维码管理"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/CustomerService/AdminUserManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"管理员管理"}</span></a></li>

                <li className="navigation-header left"><span>{"商家管理"}</span> <i className="icon-menu" title=""
                                                                                data-original-title="商家管理"></i>
                </li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/CustomerService/StoreSettlementManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"兑账记录"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/CustomerService/StoreManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"加盟商管理"}</span></a></li>


            </ul>
        )
    }
}

class DataManager extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path);
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">
                <li className="navigation-header left" onClick={this._leftMenuClick.bind(this, '/dashboard')}>
                    <span>{"垃圾分类"}</span>
                    <i className="icon-menu" title="" data-original-title="垃圾分类" />
                </li>
                <li className="left active" onClick={this._leftMenuClick.bind(this, '/DataManage/RubbishClass')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"垃圾分类"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/DataManage/ManualRecord')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"垃圾称量"}</span></a></li>
                <li className="navigation-header left"><span>{"其他数据"}</span> <i className="icon-menu" title=""
                                                                                data-original-title="垃圾分类"></i>
                </li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/DataManage/TransitLine')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"车辆运输"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/DataManage/CitySetting')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{"区域设置"}</span></a></li>


            </ul>
        )
    }
}

class NotifyManager extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">
                <li className="navigation-header left"><span>{"系统通知"}</span> <i className="icon-menu" title=""
                                                                                data-original-title="系统通知"></i>
                </li>
                <li className="left active" onClick={this._leftMenuClick.bind(this, '/SystemNotice/NoticeManage')}><a
                    href="javascript:void(0)"><i
                    className="icon-satellite-dish2"></i> <span>{"新闻政策"}</span></a></li>


            </ul>
        )
    }
}
// class PerformanceMonitoringMenu extends Component {
//     _leftMenuClick(path) {
//         browserHistory.push(path)
//     }
//
//     componentDidMount() {
//         $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
//             e.preventDefault();
//
//             // Collapsible
//             $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);
//
//             // Accordion
//             if ($('.navigation-main').hasClass('navigation-accordion')) {
//                 $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
//             }
//         });
//     }
//
//     render() {
//         return (
//             <ul className="navigation navigation-main navigation-accordion">
//
//                 <li className="navigation-header"><span>{Current_Lang.menus.realtimeMonitor}</span> <i className="icon-menu" title=""
//                                                                        data-original-title="实时监控"></i>
//                 </li>
//                 <li className="left active" onClick={this._leftMenuClick.bind(this, '/dashboard')}><a
//                     href="javascript:void(0)"><i
//                     className="icon-home4"></i> <span>{Current_Lang.menus.mainBoard}</span></a></li>
//                 <li className="left">
//                     <a href="javascript:void(0)" className="has-ul"><i className="icon-feed"></i>
//                         <span>{Current_Lang.menus.serviceMonitor}</span></a>
//                     <ul className="hidden-ul" style={{display: 'none'}}>
//                         <li  onClick={this._leftMenuClick.bind(this, '/Monitor/Realtime/AppMonitorContainer')}><a href="#">{Current_Lang.menus.appService}</a></li>
//                         <li  onClick={this._leftMenuClick.bind(this, '/UserManager/CSSServerMonitor')}><a
//                             href="javascript:void(0)">{Current_Lang.menus.cseService}</a></li>
//                         <li  onClick={this._leftMenuClick.bind(this, '/Monitor/Realtime/CSRServerMonitorContainer')}><a href="#">{Current_Lang.menus.csrService}</a></li>
//                         <li  onClick={this._leftMenuClick.bind(this, '/Monitor/Realtime/CSMServerMonitorContainer')}><a href="#">{Current_Lang.menus.csmService}</a></li>
//                         <li  onClick={this._leftMenuClick.bind(this, '/Developing')}><a href="#">{Current_Lang.menus.sedService}</a></li>
//                     </ul>
//                 </li>
//                 <li className="left">
//                     <a onClick={this._leftMenuClick.bind(this, '/Monitor/RealTimeSessions')} href="javascript:void(0)">
//                         <i className="icon-bubbles9"></i> <span>{Current_Lang.menus.realtimeSession}</span>
//                     </a>
//                 </li>
//                 <li className="left">
//                     <a href="javascript:void(0)" className="has-ul"><i className="icon-warning"></i>
//                         <span>{Current_Lang.menus.alarmManagement}</span></a>
//                     <ul className="hidden-ul" style={{display: 'none'}}>
//                         <li  onClick={this._leftMenuClick.bind(this, '/Monitor/Alarm/AlarmHistory')}>
//                             <a href="javascript:void(0)"> <span>{Current_Lang.menus.alarmHistory}</span></a></li>
//                         <li  onClick={this._leftMenuClick.bind(this, '/Monitor/Alarm/Threshold')}>
//                             <a href="javascript:void(0)"> <span>{Current_Lang.menus.thresholdSetting}</span></a></li>
//                     </ul>
//                 </li>
//             </ul>
//
//         )
//     }
// }
//
// class Elastic extends Component {
//     _leftMenuClick(path) {
//         browserHistory.push(path)
//     }
//
//     componentDidMount() {
//         $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
//             e.preventDefault();
//
//             // Collapsible
//             $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);
//
//             // Accordion
//             if ($('.navigation-main').hasClass('navigation-accordion')) {
//                 $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
//             }
//         });
//     }
//
//     render() {
//         return (
//             <ul className="navigation navigation-main navigation-accordion">
//
//                 <li className="navigation-header" onClick={this._leftMenuClick.bind(this, '/Developing')}>
//                     <span>{Current_Lang.label.statics}</span> <i className="icon-menu" title=""
//                                        data-original-title="统计"></i>
//                 </li>
//                 <li onClick={this._leftMenuClick.bind(this, '/Developing')}><a
//                     href="javascript:void(0)"><i
//                     className="icon-air"></i> <span>{Current_Lang.menus.simpleStatics}</span></a></li>
//                 <li onClick={this._leftMenuClick.bind(this, '/Developing')}><a
//                     href="javascript:void(0)"><i
//                     className="icon-statistics"></i> <span>{Current_Lang.menus.complexStatics}</span></a></li>
//
//
//             </ul>
//         )
//     }
// }
//
// class UserCenter extends Component {
//     _leftMenuClick(path) {
//         browserHistory.push(path)
//     }
//
//     render() {
//         return (
//             <ul className="navigation navigation-main navigation-accordion">
//
//                 <li className="navigation-header"><span>{Current_Lang.label.management}</span> <i className="icon-menu" title=""
//                                                                      data-original-title="管理"></i>
//                 </li>
//                 <li
//                     onClick={this._leftMenuClick.bind(this, '/UserManager/Admin')}><a
//                     href="javascript:void(0)"><i
//                     className="icon-user"></i> <span>{Current_Lang.menus.userManagement}</span></a></li>
//                 <li style={{display:'none'}}
//                     onClick={this._leftMenuClick.bind(this, '/UserManager/Permission')}><a
//                     href="javascript:void(0)"><i
//                     className="icon-vcard"></i> <span>权限管理</span></a></li>
//                 <li className="navigation-header"><span>{Current_Lang.label.operation}</span> <i className="icon-menu" title=""
//                                                                      data-original-title="操作"></i>
//                 </li>
//                 <li
//                     onClick={this._leftMenuClick.bind(this, '/UserManager/Operation/JobHistoryList')}><a
//                     href="javascript:void(0)"><i
//                     className="icon-history"></i> <span>{Current_Lang.menus.operationHistory}</span></a></li>
//
//
//             </ul>
//         )
//     }
// }
//
// class AlarmManage extends Component {
//     _leftMenuClick(path) {
//         browserHistory.push(path)
//     }
//
//     componentDidMount() {
//         $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
//             e.preventDefault();
//
//             // Collapsible
//             $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);
//
//             // Accordion
//             if ($('.navigation-main').hasClass('navigation-accordion')) {
//                 $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
//             }
//         });
//     }
//
//     render() {
//         return (
//             <ul className="navigation navigation-main navigation-accordion">
//
//                 <li className="navigation-header"><span>{Current_Lang.menus.alarmManagement}</span> <i className="icon-menu" title=""
//                                                                        data-original-title="告警"></i>
//                 </li>
//                 <li>
//                     <a href="javascript:void(0)"><i className="icon-warning"></i> <span>{Current_Lang.menus.alarmManagement}</span></a></li>
//                 <li onClick={this._leftMenuClick.bind(this, '/systemConfig/originalSystem/dataCenterOfContentDistribute')}>
//                     <a href="javascript:void(0)"><i className="icon-warning"></i> <span>{Current_Lang.menus.alarmHistory}</span></a></li>
//                 <li onClick={this._leftMenuClick.bind(this, '/Monitor/Alarm/Threshold')}>
//                     <a href="javascript:void(0)"><i className="icon-spam"></i> <span>{Current_Lang.menus.alarmHistory}</span></a></li>
//
//             </ul>
//         )
//     }
// }

export default MainMenu