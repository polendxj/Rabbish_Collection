/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {getVersionControl} from '../../actions/CommonActions';

export default class VersionControlListContainer extends Component {
    constructor(props) {
        super(props);
        this.page=0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "版本控制", link: ''},
            {text: "版本控制列表", link: ''}
        ];
        this.operation = [
        ];
        this._downloadApp = this._downloadApp.bind(this);
    }

    _downloadApp(appType){
        var params = {appType: appType};
        window.open(imgBaseUrl+"/rsapp/latestVersion/"+appType);
        // window.location.href = "http://dev.xysy.tech/rsapp/latestVersion/"+appType;
    }

    render() {
        const {fetching, data} =this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cabinet'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"版本控制列表区"}</legend>
                        <VersionControlListComponent data={data} fetching={fetching}
                                                     _downloadApp={this._downloadApp}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class VersionControlListComponent extends Component{
    constructor(props) {
        super(props);
        this.data = [
            {appType:"user_android",value:"用户端 (安卓)"},
            {appType:"user_ios",value:"用户端 (ios)"},
            {appType:"exchange",value:"兑换端"},
            {appType:"manager",value:"管理端"},
            {appType:"scanWeight",value:"扫码称重"},
            {appType:"autoWeightShow",value:"自动称重扫码"}
        ]
    }
    _downloadApp(appType){
        this.props._downloadApp(appType);
    }

    render() {
        const {data, fetching}=this.props;
        var tb = [];
        this.data.forEach(function (val, key) {
            tb.push(<tr key={key} style={{backgroundColor:key%2==0?"#F8F8F8":""}}>
                <td className="text-center">{key+1}</td>
                <td className="text-center">{val.value}</td>
                <td className="text-center">{imgBaseUrl+"/rsapp/latestVersion/"+val.appType}</td>
                <td className="text-center">
                    <div className="thumbnail" style={{margin: "0 auto", width: "100px", padding: 0, border: 0}}>
                        <div className="thumb">
                            <img
                                src={"../assets/appImage/"+val.appType+".png"}
                                alt=""
                                style={{height: "100px", width: "100px"}}/>
                            <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={"../assets/appImage/"+val.appType+".png"}
                                               data-popup="lightbox"
                                               className="btn" style={{height: "100px", width: "100px"}}></a>
                                        </span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="text-center">
                    {<ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle"
                               data-toggle="dropdown" aria-expanded="false"><i
                                className="icon-menu7"></i></a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li style={{display:'block'}} onClick={this._downloadApp.bind(this,val.appType)}>
                                    <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                        {"下载APP"}</a></li>
                            </ul>
                        </li>
                    </ul>}

                </td>
            </tr>)
        }.bind(this))
        var tableHeight = ($(window).height()-180);
        return (
            <div className="table-responsive" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom:'85px'}}>
                    <thead>
                    <tr style={{fontWeight:'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-3 text-bold text-center">{"APP类型"}</th>
                        <th className="col-md-5 text-bold text-center">{"下载链接"}</th>
                        <th className="col-md-4 text-bold text-center">{"下载链接二维码"}</th>
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


export default connect(mapStateToProps)(VersionControlListContainer)