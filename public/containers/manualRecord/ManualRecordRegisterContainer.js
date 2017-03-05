/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, serverStatus, ErrorModal, DecodeBase64, streamingTemplateFilter} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveServiceGroup} from '../../actions/SystemManagerServiceGroupAction';
import {commonRefresh} from '../../actions/Common';

export default class ManualRecordRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "垃圾称量", link: ''},
            {text: "垃圾称量注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回垃圾称量列表", action: "/DataManage/ManualRecord"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this)
    }

    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveServiceGroup(params))

    }

    render() {
        const {data, form,refresh}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterManualRecordComponent _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class RegisterManualRecordComponent extends Component{
    constructor(props) {
        super(props);
        this._syncData = this._syncData.bind(this);
        this._save = this._save.bind(this)
        this._search = this._search.bind(this)
        this.initApp = [];
        this.selectedApp = "";
    }

    _search() {
        this.props._startRefresh();
    }

    _syncData() {
        this.selectedCSE = $.extend([], this.confirmSelected);

        this.props._startRefresh()
    }

    _save() {
        var cseListIDS = [];
        var singleAppID = true;
        var army = this.selectedCSE[0];
        this.selectedCSE.forEach(function (val, key) {
            if (val.node.appId != army.node.appId) {
                singleAppID = false
            }
        })
        if (singleAppID) {
            this.selectedCSE.forEach(function (val, key) {
                cseListIDS.push(val.node.cssId)
            })
            var params = {
                groupId: $("#name").val(),
                description: $("#description").val(),
                cseList: cseListIDS,
                mode: 'new'
            }
            this.props._save(params)
        } else {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.cseGroupHaveDiffCSE);
        }

    }

    _appOnChange() {
        this.props._startRefresh();
    }

    componentDidMount() {
        var self = this;
        $("#cse_group_text").parent().parent().on('click', 'li', function () {
            $("#cse_group_text").text($(this).find('a').text())
        })
        $("#app_id_text").parent().parent().on('click', 'li', function () {
            $("#app_id_text").text($(this).find('a').text())
        })
        $("#cse_status_text").parent().parent().on('click', 'li', function () {
            $("#cse_status_text").text($(this).find('a').text())
        })
        $('[data-popup="tooltip"]').tooltip();

        var getFirstAppID = setInterval(function () {
            if ($("#common_app option:selected").val()) {
                clearInterval(getFirstAppID)
                self.selectedApp = self.initApp[$("#common_app option:selected").index()];
                this.props._startRefresh()
            }
        }.bind(this), 500)


        $("#common_app").on("change", function () {
            self.selectedApp = self.initApp[$("#common_app option:selected").index()];
            self.props._startRefresh()
        })
        $("#streamingProfile").on("change", function () {
            if ($("#streamingProfile option:selected").text().indexOf("QAM") >= 0) {
                $(".erm").show();
            } else {
                $(".erm").hide();
            }

            self.props._startRefresh()
        })

    }

    render() {
        const {allCSE, cseGroup, appList, streamingTemplate}=this.props;
        if ($("#streamingProfile option:selected").text().indexOf("QAM") >= 0) {
            $(".erm").show();
        } else {
            $(".erm").hide();
        }
        var self = this;

        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"垃圾称量基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                               marginTop: '8px'
                                           }}>{"分类"}</label>
                                    <div className="col-lg-9">
                                        <input id="classConfName" type="text" className="form-control"
                                               placeholder={"分类"}
                                               autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"重量"}</label>
                                    <div className="col-lg-9">
                                        <input id="weight" type="text" className="form-control"
                                               placeholder={"重量"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"起始时间"}</label>
                                    <div className="col-lg-9">
                                        <input id="startTime" type="text" className="form-control"
                                               placeholder={"起始时间"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"结束时间"}</label>
                                    <div className="col-lg-9">
                                        <input id="endTime" type="text" className="form-control"
                                               placeholder={"结束时间"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"分类描述"}</label>
                                    <div className="col-lg-9">
                                    <textarea id="description" rows="5" cols="5" className="form-control"
                                              placeholder={"分类描述"}></textarea>
                                    </div>
                                </div>

                            </fieldset>

                            <div className="form-group" >
                                <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._save.bind(this)}>{"保存"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {changeSearch1Type, form, adminSave,commonReducer}=state
    return {
        form: form,
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(ManualRecordRegisterContainer)