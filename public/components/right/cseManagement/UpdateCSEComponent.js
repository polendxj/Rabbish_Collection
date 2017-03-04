/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {Loading, audioCodes, videoCodes} from '../../Tool/Tool'

export default class UpdateCSEComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {fetching, data}=this.props
        const UpdateCSEFormForServer = require('../../ReduxForm/UpdateCSEFormForServer')
        const UpdateCSEFormForEngine = require('../../ReduxForm/UpdateCSEFormForEngine')
        const UpdateCSEFormForApplication = require('../../ReduxForm/UpdateCSEFormForApplication')
        const UpdateCSEFormForStatus = require('../../ReduxForm/UpdateCSEFormForStatus')
        let content = ""
        if (fetching) {
            content = <Loading />
        } else {
            if (data && data.cssVo) {
                content =
                    <div className="tabbable">
                        <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                            <li className="active"><a href="#justified-right-icon-tab1" data-toggle="tab"><i
                                className="icon-server position-left"></i> 服务器信息</a></li>
                            <li><a href="#justified-right-icon-tab2" data-toggle="tab"><i
                                className="icon-drive position-left"></i>引擎信息</a></li>
                            <li><a href="#justified-right-icon-tab3" data-toggle="tab"><i
                                className="icon-grid4 position-left"></i>应用信息</a></li>
                            <li><a href="#justified-right-icon-tab4" data-toggle="tab"><i
                                className="icon-shield-notice position-left"></i>状态信息</a></li>
                        </ul>

                        <div className="tab-content">
                            <div className="tab-pane active" id="justified-right-icon-tab1">
                                <UpdateCSEFormForServer />
                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab2">
                                <UpdateCSEFormForEngine _save={this.props._save}/>
                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab3">
                                <UpdateCSEFormForApplication _save={this.props._save}/>
                            </div>

                            <div className="tab-pane" id="justified-right-icon-tab4">
                                <UpdateCSEFormForStatus _save={this.props._save} areaList={this.props.areaList}/>
                            </div>
                        </div>
                    </div>
            } else {

            }
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}