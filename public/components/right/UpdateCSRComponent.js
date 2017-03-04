/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import BreadCrumbs from './breadCrumbs'
import {Loading} from '../Tool/Tool'

export default class UpdateCSRComponent extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [{text: '系统配置', link: ''}, {text: '服务器设置', link: ''}, {
            text: 'CSR 路由',
            link: ''
        }, {text: '编辑SR 路由', link: ''}]
    }

    render() {
        var content = ""
        if (this.props.detail.csr_name) {
            const UpdateCSRForm = require('../ReduxForm/UpdateCSRForm')
            content = <UpdateCSRForm _saveCSR={this.props._saveCSR} detail={this.props.detail}/>
        } else {
            content = <Loading />
        }
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={[{icon: "icon-git-merge", text: "返回SR列表", action: "/SysManager/Service/CSR/:c"}]}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    {content}
                </div>
            </div>
        )

    }
}