/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading, ListModal, ErrorModal, serverStatus, DecodeBase64} from '../../../components/Tool/Tool'

export default class UpdateCSEGroupComponent extends Component {
    constructor(props) {
        super(props)
        this.selectedCSE = this.props.groupCSE.registered
        this.confirmSelected = []
        this._selectCSE = this._selectCSE.bind(this)
        this._removeSelectedCSE = this._removeSelectedCSE.bind(this)
        this._confirmSelected = this._confirmSelected.bind(this)
        this._syncData = this._syncData.bind(this)
        this._save = this._save.bind(this)
        this._search = this._search.bind(this)
    }

    _selectCSE(obj, idx) {
        this.selectedCSE.push($.extend({}, obj))
        this.props._startRefresh()
        this.props._removeOrignalCSE(idx)
    }

    _confirmSelected() {
        this.confirmSelected = $.extend(true, [], this.selectedCSE)
        this.props._startRefresh()
    }

    _removeSelectedCSE(idx) {
        var temp = $.extend(true, {}, this.selectedCSE[idx])
        this.selectedCSE.splice(idx, 1)
        this.props._addOrignalCSE(temp)
    }

    _syncData() {
        this.selectedCSE = $.extend([], this.confirmSelected)

        this.props._startRefresh()
    }

    componentDidUpdate() {
        this.selectedCSE = (this.props.groupCSE && this.props.groupCSE.registered) ? this.props.groupCSE.registered : this.selectedCSE
    }

    _save() {
        var cseListIDS = []
        var singleAppID = true
        var army = this.selectedCSE[0]
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
                oldGroupId: this.props.detail.groupInfo.groupId,
                description: $("#description").val(),
                cseList: cseListIDS,
                mode: 'modify'
            }
            this.props._save(params)
        } else {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.cseGroupHaveDiffCSE)
        }

    }

    _appOnChange() {
        this.props._startRefresh()
    }

    _search() {
        this.props._startRefresh();
    }

    componentDidMount() {
        $("#name").val(this.props.detail && this.props.detail.groupInfo ? this.props.detail.groupInfo.groupId : '')
        $("#description").val(this.props.detail && this.props.detail.groupInfo.description ? this.props.detail.groupInfo.description : '')
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
                $("#common_app").val(this.props.appId)
                this.props._startRefresh()
            }
        }.bind(this), 500)
    }

    render() {
        const {allCSE, groupCSE, detail, cseGroup, appList, streamingTemplate}=this.props
        var trs = []
        var selectedTRS = []
        var selectedCSESpan = []
        var result = []
        var cseGroupLI = [<li key='cse_group_-1'><a href="#"> {Current_Lang.label.all}</a></li>]
        var appListLI = []
        var streamingTemplateListLI = []
        if (cseGroup && cseGroup.groupList && cseGroup.groupList.length > 0) {
            cseGroup.groupList.forEach(function (val, key) {
                cseGroupLI.push(
                    <li key={'cse_group' + key}><a href="#"> {val.groupId}</a></li>
                )

            })
        }
        if (appList && appList.appIdList && appList.appIdList.length > 0) {
            appList.appIdList.forEach(function (val, key) {
                appListLI.push(
                    <option key={'app' + key} value={val}>{val}</option>
                )

            })
        }
        if (streamingTemplate && streamingTemplate.length > 0) {
            streamingTemplate.forEach(function (val, key) {
                var obj = JSON.parse(val.Value ? DecodeBase64(val.Value) : "");
                streamingTemplateListLI.push(
                    <option key={'streamingTemplate' + key} value={obj.id}>{obj.name}</option>
                )

            })
        }
        if (allCSE.registered && allCSE.registered.length > 0) {
            result = $.extend(true, [], allCSE.registered);
            var testRS = allCSE.registered;
            if ($("#cse_group_text").text().trim() && $("#cse_group_text").text().trim() != Current_Lang.label.all) {
                result.splice(0);
                allCSE.registered.forEach(function (val, key) {
                    if (val.node.groupId == $("#cse_group_text").text().trim()) {
                        result.push(val);
                    }
                });
                testRS = $.extend(true, [], result);
            }
            if ($("#cse_status_text").text().trim() && $("#cse_status_text").text().trim() != Current_Lang.label.all) {
                result.splice(0);
                allCSE.registered.forEach(function (val, key) {
                    if (val.node.useYN == serverStatus($("#cse_status_text").text().trim())) {
                        result.push(val);
                    }
                });
                testRS = $.extend(true, [], result);
            }
            if ($("#hostname").val()) {
                result.splice(0);
                testRS.forEach(function (val, key) {
                    if (val.node.hostName.indexOf($("#hostname").val().trim()) >= 0) {
                        result.push(val);
                    }
                });
                testRS = $.extend(true, [], result);
            }
            if ($("#ip").val()) {
                result.splice(0);
                testRS.forEach(function (val, key) {
                    if (val.node.serverIp.indexOf($("#ip").val().trim()) >= 0) {
                        result.push(val);
                    }
                });
                testRS = $.extend(true, [], result);
            }
            if ($("#common_app option:selected").val() && $("#common_app option:selected").val().trim() != Current_Lang.label.all) {
                result.splice(0);
                testRS.forEach(function (val, key) {
                    if (val.node.appId == $("#common_app option:selected").val().trim().substring($("#common_app option:selected").val().trim().indexOf("(") + 1, $("#common_app option:selected").val().trim().length)) {
                        result.push(val);
                    }
                });
                testRS = $.extend(true, [], result);
            }

            result.forEach(function (val, key) {
                trs.push(
                    <tr key={'tr' + key} style={{textAlign: 'center'}}>
                        <td>
                            <div className="media-left">
                                <div className="text-left"><a href="#"
                                                              className="text-default text-semibold">{val.node.hostName.toUpperCase()}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.node.serverIp + ':' + val.node.serverPort}
                                </div>
                            </div>
                        </td>
                        <td>{val.node.groupId}</td>
                        <td>{val.node.appName + ' (' + val.node.appId + ')'}</td>
                        <td className="text-center">
                            {val.node.useYN == 'Y' ? <span className="label bg-success" style={{
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }}>{Current_Lang.status.online}</span> :
                                val.node.useYN == 'S' ? <span className="label bg-danger" style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}>{Current_Lang.status.stopped}</span> : <span className="label label-default" style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}>{Current_Lang.status.offline}</span>}
                        </td>
                        <td className="text-center">
                            {val.node.groupId.toUpperCase() == 'NONE' || (val.node.groupId == this.props.detail.groupInfo.groupId) ?
                                <i style={{cursor: 'pointer'}}
                                   className="icon-move-right"
                                   onClick={this._selectCSE.bind(this, val, key)}></i> :
                                <i className="icon-blocked"></i>}
                        </td>
                    </tr>
                )
            }.bind(this))

        }
        if (this.selectedCSE.length > 0) {
            this.selectedCSE.forEach(function (val, key) {
                selectedCSESpan.push(
                    <span key={'selected' + key} className="label label-flat border-grey text-grey-600"
                          style={{marginTop: '5px', marginRight: '10px', position: 'relative', width: "100%"}}>
                    <div className="media-left">
                        <div className="text-left">
                            <a href="#" className="text-default text-semibold">
                                {val.node.useYN == 'Y' ? <span className="status-mark border-success position-left"></span> :
                                    val.node.useYN == 'S' ?
                                        <span className="status-mark border-danger position-left"></span> :
                                        <span className="status-mark border-default position-left"></span>}

                                {val.node.hostName}
                                ({val.node.serverIp}:{val.node.serverPort})  <span
                                style={{marginLeft: '30px'}}>{Current_Lang.label.AppInfo} : {val.node.appId}
                                ({val.node.appName})</span>
                            </a>
                        </div>
                    </div>
                     <i className="icon-cross3"
                        style={{cursor: 'pointer', position: 'absolute', right: '0', top: '2px'}}
                        onClick={this._removeSelectedCSE.bind(this, key)}></i>
                </span>
                )

                selectedTRS.push(
                    <tr key={'selectedTR' + key} style={{textAlign: 'center'}}>
                        <td>
                            <div className="media-left">
                                <div className="text-left"><a href="#"
                                                              className="text-default text-semibold">{val.node.hostName.toUpperCase()}</a>
                                </div>
                                <div className="text-muted text-size-small">
                                    {val.node.serverIp + ':' + val.node.serverPort}
                                </div>
                            </div>
                        </td>
                        <td>{val.node.appId + ' (' + val.node.appName + ')'}</td>
                        <td>
                            {val.node.useYN == 'Y' ? <span className="label bg-success" style={{
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }}>{Current_Lang.status.online}</span> :
                                val.node.useYN == 'S' ? <span className="label bg-danger" style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}>{Current_Lang.status.stopped}</span> : <span className="label label-default" style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}>{Current_Lang.status.offline}</span>}

                        </td>
                        <td className="text-center">
                            <i style={{cursor: 'pointer'}}
                               className="icon-cross3"
                               onClick={this._removeSelectedCSE.bind(this, key)}
                            ></i>
                        </td>
                    </tr>
                )
            }.bind(this))
        }

        var content =
            <div className="row">
                <div className="col-md-7">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.CSEList}
                        </legend>
                        <div className="table-responsive"
                             style={{minHeight: "300px", maxHeight: "800px", overflowY: 'scroll'}}>
                            <ul className="list-inline list-inline-condensed no-margin-bottom"
                                style={{textAlign: 'right'}}>
                                {/*<li className="dropdown"*/}
                                {/*style={{borderBottom: 'thin lightgray solid', marginRight: '10px'}}>*/}
                                {/*<a href="#" className="btn btn-link btn-sm dropdown-toggle"*/}
                                {/*data-toggle="dropdown" aria-expanded="false" style={{*/}
                                {/*paddingLeft: '0',*/}
                                {/*paddingRight: '0',*/}
                                {/*fontWeight: 'bold',*/}
                                {/*color: '#193153'*/}
                                {/*}}>{Current_Lang.label.CSEGroup}：<span*/}
                                {/*style={{color: '#193153'}} id="cse_group_text">{Current_Lang.label.all}</span> <span*/}
                                {/*className="caret"></span>*/}
                                {/*</a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*{cseGroupLI}*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                {/*<li className="dropdown"*/}
                                {/*style={{borderBottom: 'thin lightgray solid', marginRight: '10px'}}>*/}
                                {/*<a href="#" className="btn btn-link btn-sm dropdown-toggle"*/}
                                {/*data-toggle="dropdown" aria-expanded="false" style={{*/}
                                {/*paddingLeft: '0',*/}
                                {/*paddingRight: '0',*/}
                                {/*fontWeight: 'bold',*/}
                                {/*color: '#193153'*/}
                                {/*}}>{Current_Lang.tableTitle.APPID}：<span*/}
                                {/*style={{color: '#193153'}} id="app_id_text">{Current_Lang.label.all}</span> <span*/}
                                {/*className="caret"></span>*/}
                                {/*</a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*{appListLI}*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                <li className="dropdown"
                                    style={{borderBottom: 'thin lightgray solid', marginRight: '10px'}}>
                                    <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false" style={{
                                        paddingLeft: '0',
                                        paddingRight: '0',
                                        fontWeight: 'bold',
                                        color: '#193153'
                                    }}>{Current_Lang.label.deviceStatus}：<span
                                        style={{color: '#193153'}} id="cse_status_text">{Current_Lang.label.all}</span>
                                        <span
                                            className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#"> {Current_Lang.label.all}</a></li>
                                        <li><a href="#"> {Current_Lang.status.online}</a></li>
                                        <li><a href="#"> {Current_Lang.status.offline}</a></li>
                                        <li><a href="#"> {Current_Lang.status.stopped}</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <input id="hostname" style={{
                                        borderLeft: '0 red solid',
                                        borderRight: '0 red solid',
                                        borderTop: '0 red solid',
                                        borderRadius: '0'
                                    }} type="text" className="form-control"
                                           placeholder={Current_Lang.tableTitle.CSEName}
                                           data-popup="tooltip"
                                           title={Current_Lang.tableTitle.CSEName}
                                           data-html="true"/>
                                </li>
                                <li>
                                    <input id="ip" style={{
                                        borderLeft: '0 red solid',
                                        borderRight: '0 red solid',
                                        borderTop: '0 red solid',
                                        borderRadius: '0'
                                    }} type="text" className="form-control" placeholder="CSE IP"
                                           data-popup="tooltip"
                                           title={'CSE IP'}
                                           data-html="true"/>
                                </li>
                                <li style={{paddingRight: "10px"}}>
                                    <button onClick={this._search.bind(this)}
                                            style={{marginLeft: '20px'}} type="button"
                                            className="btn btn-primary btn-icon"><i
                                        className="icon-search4"></i></button>
                                </li>

                            </ul>
                            <table className="table table-bordered table-hover" style={{marginTop: '20px'}}>
                                <thead>
                                <tr>
                                    <th className="text-bold">{Current_Lang.tableTitle.CSEName}</th>
                                    <th className="text-bold"
                                        style={{textAlign: 'center'}}>{Current_Lang.tableTitle.associatedGroup}</th>
                                    <th className="text-bold"
                                        style={{textAlign: 'center'}}>{Current_Lang.tableTitle.APPID}</th>
                                    <th className="text-bold"
                                        style={{textAlign: 'center'}}>{Current_Lang.tableTitle.status}</th>
                                    <th className="text-center text-bold">{Current_Lang.tableTitle.operator}</th>
                                </tr>
                                </thead>
                                <tbody id="allCSEList">
                                {trs}
                                </tbody>
                            </table>
                        </div>

                    </fieldset>
                </div>
                <div className="col-md-5">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.selectedCSE}： {this.selectedCSE.length} {Current_Lang.label.one}
                        </legend>
                        <div style={{minHeight: "300px", maxHeight: "800px", overflowY: 'scroll', overflowX: 'hidden'}}>
                            {selectedCSESpan}
                        </div>

                    </fieldset>
                </div>

            </div>

        var tableHeight = ($(window).height() - 130);

        return (
            <div>
                <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                    <div className="col-md-8 col-md-offset-2">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {Current_Lang.tableTitle.CSEBasicInfo}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center',
                                           marginTop: '8px'
                                       }}>{Current_Lang.tableTitle.name}</label>
                                <div className="col-lg-9">
                                    <input id="name" type="text" className="form-control"
                                           placeholder={Current_Lang.tableTitle.name}
                                           autoComplete="off"/>
                                </div>
                            </div>

                            <div className="form-group" style={{marginTop: '50px'}}>
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center', marginTop: '8px'}}>{"应用ID"}</label>
                                <div className="col-lg-9">
                                    <select className="form-control" name="sourceAreaId2" id="common_app"
                                            onChange={this._appOnChange.bind(this)}>
                                        {appListLI}
                                    </select>
                                </div>
                            </div>

                            {/*<div className="form-group" style={{marginTop: '100px'}}>*/}
                            {/*<label className="col-lg-2 control-label"*/}
                            {/*style={{textAlign: 'center', marginTop: '8px'}}>{"输出模板"}</label>*/}
                            {/*<div className="col-lg-9">*/}
                            {/*<select className="form-control">*/}
                            {/*{streamingTemplateListLI}*/}
                            {/*</select>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                            <div className="form-group" style={{marginTop: '150px'}}>
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center',
                                           marginTop: '8px'
                                       }}>{Current_Lang.tableTitle.description}</label>
                                <div className="col-lg-9">
                                    <textarea id="description" rows="5" cols="5" className="form-control"
                                              placeholder={Current_Lang.tableTitle.describeDescription}></textarea>
                                </div>
                            </div>

                        </fieldset>
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {Current_Lang.tableTitle.CSEGroup}
                            </legend>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th className="text-bold">{Current_Lang.label.CSEHostname}</th>
                                        <th className="text-bold"
                                            style={{textAlign: 'center'}}>{Current_Lang.tableTitle.APPID}</th>
                                        <th className="text-bold"
                                            style={{textAlign: 'center'}}>{Current_Lang.tableTitle.status}</th>
                                        <th className="text-center text-bold">
                                            <button type="button" className="btn btn-link btn-xs" data-toggle="modal"
                                                    data-target="#ListModal"><a><i className="icon-link"
                                                                                   style={{fontSize: '10px'}}></i> {Current_Lang.label.linkCSE}
                                            </a>
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody >
                                    {selectedTRS}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                <button type="button" className="btn btn-primary"
                                        onClick={this._save.bind(this)}>{Current_Lang.label.save}
                                </button>
                            </div>
                        </fieldset>

                    </div>
                    <ListModal content={content} doAction={this._confirmSelected} data={this.selectedCSE}/>
                </div>
            </div>
        )

    }
}