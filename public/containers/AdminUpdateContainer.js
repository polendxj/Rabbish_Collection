/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal, EncodeBase64} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import UpdateAdminComponent from '../components/right/adminManagement/UpdateAdminComponent'
import {saveAdmin, detailAdmin} from '../actions/Admin'

export default class AdminUpdateContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: '用户中心', link: ''},
            {text: '管理', link: ''},
            {text: '用户管理', link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: "返回用户列表", action: "/UserManager/Admin"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (!this.props.form.UpdateAdminForm.values.adminName) {
            ErrorModal('警告!', '发生错误:' + '管理员姓名不能为空')
        } else if (!this.props.form.UpdateAdminForm.values.adminId) {
            ErrorModal('警告!', '发生错误:' + '管理员账号不能为空')
        } else {
            var params = {
                adminId: this.props.form.UpdateAdminForm.values.adminId,
                adminName: this.props.form.UpdateAdminForm.values.adminName,
                adminPwd: '',
                adminPwd2: '',
                phoneNumber: this.props.form.UpdateAdminForm.values.phoneNumber,
                useYN: this.props.form.UpdateAdminForm.values.useYN,
                permissionId: this.props.form.UpdateAdminForm.values.permissionId,
                areaId: 20,
                mode:'modify'
            }
            this.props.dispatch(saveAdmin(params,'modify'))
        }

    }

    componentDidMount() {
        this.props.dispatch(detailAdmin(this.props.params.adminId.substring(1)))
    }

    render() {
        const {data, form}=this.props
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <UpdateAdminComponent _save={this._save} data={data}/>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, adminDetail}=state
    return {
        form: form,
        data: adminDetail.data
    }
}

export default connect(mapStateToProps)(AdminUpdateContainer)