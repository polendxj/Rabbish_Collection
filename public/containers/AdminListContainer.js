/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal,ErrorModal,roleApplicationUse} from '../components/Tool/Tool'
import {changeSearch1Type} from '../actions/SearchAction'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import Search1 from '../components/right/Search1'
import AdminListComponent from '../components/right/adminManagement/AdminListComponent'
import {getAdminList, saveAdmin, deleteAdmin, detailAdmin} from '../actions/Admin'

export default class AdminListContainer extends Component {
    constructor(props) {
        super(props)
        this._delete = this._delete.bind(this)
        this._updateStatus = this._updateStatus.bind(this)
        this._changePage = this._changePage.bind(this)
        this._prePage = this._prePage.bind(this)
        this._nextPage = this._nextPage.bind(this)
        this.page = 0
        this.breadCrumbs = [
            {text: Current_Lang.menus.userCenter, link: ''},
            {text: Current_Lang.menus.userManagement, link: ''}
        ];
        this.operation = roleApplicationUse()?[
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/UserManager/Admin/Register"},
        ]:[];
        this._changeSearchType = this._changeSearchType.bind(this)
        this._search = this._search.bind(this)
        this.searchType = [
            {key: "PERMISSION_ID", value: "权限 ID"},
            {key: "ADMIN_NAME", value: "管理员名称"}
        ];
        this.searchColumn="PERMISSION_ID";
        this.searchValue="";
    }

    componentDidMount() {
        var self=this;
        this.props.dispatch(getAdminList(0, 'ALL', ''))
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text())
            if($(this).find('a').text().trim()==Current_Lang.tableTitle.searchingBasedOnPermissionID){
                self.searchColumn="PERMISSION_ID";
            }else{
                self.searchColumn="ADMIN_NAME";
            }
        })
    }

    _changeSearchType(selected) {
        this.props.dispatch(changeSearch1Type(selected))
    }

    _delete(id) {
        var that = this
        if(sessionStorage['adminId']==id){
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.accountOperating)
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + id + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0,that.searchColumn, $("#search_value").val()))
        })

    }

    _updateStatus(id, flag) {
        // this.props.dispatch(updateCSEStatus(id,flag,0, this.props.selected.key, this.props.form.simple.values ? this.props.form.simple.values.searchText : ""))
    }

    _search() {
        this.props.dispatch(getAdminList(0, this.searchColumn, $("#search_value").val()))
    }

    _changePage(page) {
        this.page = page
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()))
    }

    _prePage(page) {
        this.page = this.page - 1
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()))
    }

    _nextPage(page) {
        this.page = this.page + 1
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()))
    }

    render() {
        const {selected, form, fetching, data} =this.props
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right',marginTop:'-59px'}}>
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid'}}>
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false" style={{
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    fontWeight: 'bold',
                                    color: '#193153'
                                }}><span
                                    style={{color: '#193153'}} id="search_way">{Current_Lang.tableTitle.searchingBasedOnPermissionID}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{Current_Lang.tableTitle.searchingBasedOnPermissionID}</a></li>
                                    <li><a href="#">{Current_Lang.tableTitle.seachingBasedOnUserName}</a></li>
                                </ul>
                            </li>
                            <li>
                                <input id="search_value" style={{
                                    border: '0 red solid',
                                    borderRadius: '0'
                                }} type="text" className="form-control" placeholder={Current_Lang.tableTitle.pleaseInputTheSearchString}/>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)}
                                        style={{marginLeft: '30px'}} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.tableTitle.adminList}</legend>
                        <div style={{marginTop:'-80px'}}>
                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <AdminListComponent data={data.adminList} fetching={fetching}
                                            _delete={this._delete}
                                            _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, getAdminList}=state
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getAdminList.fetching,
        data: getAdminList.data
    }
}


export default connect(mapStateToProps)(AdminListContainer)