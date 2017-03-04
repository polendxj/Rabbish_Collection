/**
 * Created by Administrator on 2017/2/6.
 */
/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, audioCodes, roleApplicationUse, resolutionFilter} from '../../Tool/Tool'

export default class AppMonitorComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    componentDidMount(){



    }
    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {

        } else if (data) {
            if (data.length == 0) {
                tb.push(<NoData text={Current_Lang.label.noCSEMonitorData}/>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(
                        <div className="panel panel-white" key={key}>
                            <div className="panel-heading">
                                <h6 className="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion-control-right"
                                       href={"#accordion-control-right-group" + key} aria-expanded="false"
                                       className="collapsed">
                                        <div className="header">
                                            <div className="media-body" style={{position: 'relative'}}>
                                                <div className="media-heading">
                                                    <a href="javascript:void(0)" className="letter-icon-title"
                                                       style={{fontSize: '22px', color: '#193153'}}>{val.appName}  </a>
                                                </div>

                                                <div className="text-muted text-size-small"
                                                     style={{fontSize: '14px'}}>
                                                    {Current_Lang.label.APPID}：{val.appId} / &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {Current_Lang.others.resolution}: {resolutionFilter(val.videoHeight)}
                                                </div>
                                                <div style={{
                                                    position: 'relative',
                                                    width: '200px',
                                                    height: '60px',
                                                    marginTop: '-60px',
                                                    left: '450px',
                                                    verticalAlign: 'bottom'
                                                }}>

                                                </div>
                                                <div style={{
                                                    height: '90px',
                                                    width: "120px",
                                                    float: 'right',
                                                    position: 'absolute',
                                                    right: '-46px',
                                                    top: '-14.7px'
                                                }}>
                                                    <a href={"/assets/snapshots/" + val.appId + ".png"}
                                                       data-popup="lightbox">
                                                        <img style={{maxHeight: "89px", marginTop: "1px"}}
                                                             src={"/assets/snapshots/" + val.appId + ".png"}
                                                             className="img-rounded img-preview"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </h6>
                            </div>
                            {/*<div id={"accordion-control-right-group" + key} className="panel-collapse collapse"
                                 aria-expanded="false">
                                <table className="table table-bordered" >
                                    <tbody>
                                    <tr>
                                        <td style={{width: "300px", textAlign: "right",verticalAlign:"top"}}>
                                            <table className="table table-bordered" style={{width:"300px"}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{width: "100px", textAlign: "right"}}>{Current_Lang.others.group}</td>
                                                    <td>
                                                        <select className="form-control input-xs">
                                                            <option>{Current_Lang.others.all}</option>
                                                            <option>HD_120</option>
                                                            <option>SD_110</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "100px", textAlign: "right"}}>{Current_Lang.others.cseCount}</td>
                                                    <td>2 </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "100px", textAlign: "right"}}>{Current_Lang.others.onLineTime}</td>
                                                    <td>00:15:30</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "100px", textAlign: "right"}}>PV</td>
                                                    <td>4652</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "100px", textAlign: "right"}}>UV</td>
                                                    <td>589</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "100px", textAlign: "right"}}>VV</td>
                                                    <td>48</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td>
                                            <div style={{height:"40px",textAlign:"right"}}>
                                                <select className="form-control input-xs" style={{width:"200px",float:"right"}}>
                                                    <option>Today So Far</option>
                                                    <option>Yesterday</option>
                                                    <option>Last 1 Hour</option>
                                                    <option>Last 6 Hour</option>
                                                    <option>Last 12 Hour </option>
                                                    <option>Last 24 Hour </option>
                                                </select>
                                            </div>
                                            <div id="container" >
                                                <img src="/assets/images/temp.png" style={{width:"100%"}}/>
                                            </div>
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>

                            </div>*/}
                        </div>
                    )
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height() - 240);

        return (
            <div className="panel-group panel-group-control panel-group-control-right content-group-lg"
                 id="accordion-control-right" style={{height: tableHeight + "px", overflowY: 'scroll'}}>
                {tb}
            </div>

        )
    }
}