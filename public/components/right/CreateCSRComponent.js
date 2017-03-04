/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import BreadCrumbs from './breadCrumbs'

export default class CreateCSRComponent extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [{text: '系统配置', link: ''}, {text: '服务器设置', link: ''}, {
            text: 'CSR 路由',
            link: ''
        }, {text: '注册SR 路由', link: ''}]
    }

    render() {
        const CreateCSRForm = require('../ReduxForm/CreateCSRForm')
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={[{icon: "icon-undo2", text: "返回SR列表", action: "/SysManager/Service/CSR/:c"}]}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <CreateCSRForm _saveCSR={this.props._saveCSR} />
                </div>
            </div>
        )

    }
}