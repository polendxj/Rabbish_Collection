/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading, ListModal, ErrorModal} from '../../../components/Tool/Tool'

export default class UpdateServiceGroupComponent extends Component {
    constructor(props) {
        super(props)
        this.sgidRangeItems = []
        this._addSGIDRange = this._addSGIDRange.bind(this)
        this._save = this._save.bind(this)
        this.rangeData = []
    }

    _save() {
        var sgids = ""
        var flag = true;
        var sgidCheck = true;
        this.sgidRangeItems.forEach(function (val, key) {
            var start = $(".sgid" + key.toString()).find('input').eq(0).val()
            var end = $(".sgid" + key.toString()).find('input').eq(1).val()
            if (!start || !end) {
                flag = false
            } else {
                sgids = sgids + start + '-' + end + ','
            }
            if (start > end || start < 0 || end < 0) {
                sgidCheck = false;
            }
        })
        sgids.substring(0, sgids.length - 1)
        if (!flag) {
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.existUnSetSGID);
        } else if (!$("#name").val()) {
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.sgidNameEmpty);
        } else if (!sgidCheck) {
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.sgidRangeInvalid);
        } else if ($("#description").val().indexOf("&") >= 0 || $("#description").val().indexOf("=") >= 0) {
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.sgidInvalidChar);
        } else {
            var params = {
                mode: 'modify',
                areaName: $("#name").val(),
                description: $("#description").val(),
                sgid: sgids,
                seq: this.props.detail.serviceAreaVo.seq
            }
            this.props._save(params)
        }
    }

    _removeSGIDRange(idx) {
        var temp = $.extend([], this.sgidRangeItems)
        this.sgidRangeItems.splice(0)
        var count = 0
        for (var i = 0; i < temp.length; i++) {
            if (i != idx) {
                var start = $(".sgid" + i.toString()).find('input').eq(0).val()
                var end = $(".sgid" + i.toString()).find('input').eq(1).val()
                this.sgidRangeItems.push(
                    <tr key={'sgid' + count} className={'sgid' + count}>
                        <td className="text-center">
                            {count + 1}
                        </td>
                        <td className="text-center">
                            <input placeholder={Current_Lang.tableTitle.SGIDRangeStart} min="0" className="form-control" name="number"
                                   defaultValue={start}/>
                        </td>
                        <td className="text-center">
                            <input placeholder={Current_Lang.tableTitle.SGIDRangeEnd} min="0" className="form-control" name="number"
                                   defaultValue={end}/>
                        </td>
                        <td className="text-center">
                            <i className="icon-cross3" style={{cursor: 'pointer'}}
                               onClick={this._removeSGIDRange.bind(this, count)}></i>
                        </td>
                    </tr>
                )
                count++
            }

        }

        this.props._startRefresh()
    }

    _addSGIDRange() {
        var lastTR = $(".sgid" + (this.sgidRangeItems.length - 1).toString())
        if ((lastTR.find('input').eq(0).val() && lastTR.find('input').eq(1).val()) || this.sgidRangeItems.length == 0) {
            this.sgidRangeItems.push(
                <tr key={'sgid' + this.sgidRangeItems.length} className={'sgid' + this.sgidRangeItems.length}>
                    <td className="text-center">
                        {this.sgidRangeItems.length + 1}
                    </td>
                    <td className="text-center">
                        <input placeholder={Current_Lang.tableTitle.SGIDRangeStart} min="0" className="form-control" name="number"/>
                    </td>
                    <td className="text-center">
                        <input placeholder={Current_Lang.tableTitle.SGIDRangeEnd} min="0" className="form-control" name="number"/>
                    </td>
                    <td className="text-center">
                        <i className="icon-cross3" style={{cursor: 'pointer'}}
                           onClick={this._removeSGIDRange.bind(this, this.sgidRangeItems.length)}></i>
                    </td>
                </tr>
            )
        }

        this.props._startRefresh()
    }

    componentDidMount() {
        $("#name").val(this.props.detail.serviceAreaVo.areaName)
        $("#description").val(this.props.detail.serviceAreaVo.description)
        var sgids = this.props.detail.serviceAreaVo.sgid ? this.props.detail.serviceAreaVo.sgid.split(',') : []
        sgids.forEach(function (val, key) {
            var lastTR = $(".sgid" + key.toString())
            this.sgidRangeItems.push(
                <tr key={'sgid' + key.toString()} className={'sgid' + key.toString()}>
                    <td className="text-center">
                        {key + 1}
                    </td>
                    <td className="text-center">
                        <input placeholder={Current_Lang.tableTitle.SGIDRangeStart} min="0" className="form-control" name="number"
                               defaultValue={sgids[key].split('-')[0]}/>
                    </td>
                    <td className="text-center">
                        <input placeholder={Current_Lang.tableTitle.SGIDRangeEnd} min="0" className="form-control" name="number"
                               defaultValue={sgids[key].split('-')[1]}/>
                    </td>
                    <td className="text-center">
                        <i className="icon-cross3" style={{cursor: 'pointer'}}
                           onClick={this._removeSGIDRange.bind(this, key)}></i>
                    </td>
                </tr>
            )
        }.bind(this))
        this.props._startRefresh()
    }

    render() {
        const {detail}=this.props
        if (detail) {
            console.log(detail)
        }
        var tableHeight = ($(window).height() - 175);

        return (
            <div>
                <div className="col-md-4">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.basicServiceAreaInfo}
                        </legend>
                        <div className="form-group">
                            <label className="col-lg-2 control-label"
                                   style={{textAlign: 'center', marginTop: '8px'}}>{Current_Lang.tableTitle.name}</label>
                            <div className="col-lg-9">
                                <input id="name" type="text" className="form-control" placeholder={Current_Lang.tableTitle.name}
                                       autoComplete="off"/>
                            </div>
                        </div>

                        <div className="form-group" style={{marginTop: '50px'}}>
                            <label className="col-lg-2 control-label"
                                   style={{textAlign: 'center', marginTop: '8px'}}>{Current_Lang.tableTitle.description}</label>
                            <div className="col-lg-9">
                                    <textarea id="description" rows="5" cols="5" className="form-control"
                                              placeholder={Current_Lang.tableTitle.describeDescription}></textarea>
                            </div>
                            <div className="col-lg-11">
                                <div className="text-right" style={{marginTop:"30px"}}>
                                    <button type="button" className="btn btn-primary" onClick={this._save.bind(this)}>{Current_Lang.label.save}</button>

                                </div>
                            </div>
                        </div>

                    </fieldset>

                </div>
                <div className="col-md-8">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {Current_Lang.tableTitle.SASGIDRange}
                        </legend>
                        <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th className="text-center text-bold" style={{width: '20px'}}>#</th>
                                    <th className="text-center text-bold">{Current_Lang.tableTitle.SGIDRangeStart}</th>
                                    <th className="text-center text-bold">{Current_Lang.tableTitle.SGIDRangeEnd}</th>
                                    <th className="text-center text-bold" style={{width: '100px'}}>
                                        <button type="button" className="btn btn-link btn-xs"
                                                onClick={this._addSGIDRange.bind(this)}><a><i className=" icon-plus3" style={{fontSize:'10px'}}></i> {Current_Lang.tableTitle.addNewSGIDRange}</a>
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.sgidRangeItems}
                                </tbody>
                            </table>
                        </div>
                    </fieldset>

                </div>

            </div>
        )

    }
}