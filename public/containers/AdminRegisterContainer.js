/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ErrorModal, EncodeBase64} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import RegisterAdminComponent from '../components/right/adminManagement/RegisterAdminComponent'
import {saveAdmin} from '../actions/Admin'

export default class AdminRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: Current_Lang.menus.userCenter, link: ''},
            {text: Current_Lang.menus.userManagement, link: ''},
            {text: Current_Lang.label.register, link: ''},
        ]
        this.operation = [
            {icon: "icon-undo2", text: Current_Lang.tableTitle.returnToCSEList, action: "/UserManager/Admin"}
        ]
        this._save = this._save.bind(this)
    }

    _save() {
        if (!this.props.form.CreateAdminForm.values.adminName) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + Current_Lang.alertTip.usernameEmpty)
        } else if (!this.props.form.CreateAdminForm.values.adminId) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + Current_Lang.alertTip.userAccountEmpty)
        } else if (!this.props.form.CreateAdminForm.values.adminPwd || (this.props.form.CreateAdminForm.values.adminPwd2 != this.props.form.CreateAdminForm.values.adminPwd )) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + Current_Lang.alertTip.confirmPWDError)
        } else {
            var params = {
                adminName: this.props.form.CreateAdminForm.values.adminName,
                adminId: this.props.form.CreateAdminForm.values.adminId,
                adminPwd: EncodeBase64(this.props.form.CreateAdminForm.values.adminPwd),
                adminPwd2: EncodeBase64(this.props.form.CreateAdminForm.values.adminPwd2),
                permissionId: this.props.form.CreateAdminForm.values.permissionId,
                useYN: this.props.form.CreateAdminForm.values.useYN,
                phoneNumber: this.props.form.CreateAdminForm.values.phoneNumber ? this.props.form.CreateAdminForm.values.phoneNumber : "",
                mode: 'new'
            }
            this.props.dispatch(saveAdmin(params))
        }

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
                    <RegisterAdminComponent _save={this._save}/>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, adminSave}=state
    return {
        form: form
    }
}

export default connect(mapStateToProps)(AdminRegisterContainer)