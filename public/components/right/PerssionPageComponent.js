/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {Loading} from '../Tool/Tool'

export default class PerssionPageComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        const {fetching, data}=this.props
        const AdminPermissionForm = require('../ReduxForm/AdminPermissionForm')
        const MSOPermissionForm = require('../ReduxForm/MSOPermissionForm')
        const SOPermissionForm = require('../ReduxForm/SOPermissionForm')
        const GUPermissionForm = require('../ReduxForm/GUPermissionForm')
        var content = ""
        if (this.props.fetching) {
            content = <Loading/>
        } else {
            if (this.props.data && this.props.data.result == 'SUCCESS') {
                switch (this.props.data.permissionInfo.permissionId) {
                    case 'SV':
                        content = <AdminPermissionForm _save={this.props._save}/>
                        break;
                    case 'MSO_OP':
                        content = <MSOPermissionForm _save={this.props._save}/>
                        break
                    case 'SO_OP':
                        content = <SOPermissionForm _save={this.props._save}/>
                        break;
                    case 'GU':
                        content = <GUPermissionForm _save={this.props._save}/>
                        break;

                }
            }
        }
        return (
            <div>
                <div className="tabbable">
                    <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                        <li className="active" onClick={this.props._changeRole.bind(this,'SV')}><a href="#justified-right-icon-tab1" data-toggle="tab"><i
                            className="icon-user-tie position-left"></i> 管理员（SV）</a></li>
                        <li  onClick={this.props._changeRole.bind(this,'MSO_OP')}><a href="#justified-right-icon-tab2" data-toggle="tab"><i
                            className="icon-user-check position-left"></i>MSO管理员（MSO OP）</a></li>
                        <li  onClick={this.props._changeRole.bind(this,'SO_OP')}><a href="#justified-right-icon-tab3" data-toggle="tab"><i
                            className="icon-users position-left"></i>SO管理员（SO OP）</a></li>
                        <li  onClick={this.props._changeRole.bind(this,'GU')}><a href="#justified-right-icon-tab4" data-toggle="tab"><i
                            className="icon-users4 position-left"></i>普通用户（GU）</a></li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane active" id="justified-right-icon-tab1">
                            {content}
                        </div>

                        <div className="tab-pane" id="justified-right-icon-tab2">
                            {content}
                        </div>

                        <div className="tab-pane" id="justified-right-icon-tab3">
                            {content}
                        </div>

                        <div className="tab-pane" id="justified-right-icon-tab4">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}