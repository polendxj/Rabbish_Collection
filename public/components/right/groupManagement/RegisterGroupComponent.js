/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class RegisterGroupComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        $("#areaAppListBtn").on('click', function () {
            // var areaOpt=
            var areaSelect = []
            var appIdsSelect = []
            this.props.data.area.areaList.forEach(function (val, key) {
                areaSelect.push('<option value="' + val.areaId + '">' + val.areaName + '</option>')
            })
            this.props.data.app.appIdList.forEach(function (val, key) {
                appIdsSelect.push('<option value="' + val + '">' + val + '</option>')
            })
            $("#areaAppList").append('<tr><td>1</td><td><select id="area_' + ($("#areaAppList").find('tr').length) + '" class="form-control">' + areaSelect.join('') + '</select></td><td><select class="form-control" id="app_' + ($("#areaAppList").find('tr').length) + '">' + appIdsSelect.join('') + '</select></td><td><button type="button" class="btn btn-danger remove">移 除</button></td></tr>')
        }.bind(this))

        $("#areaAppList").on('click', '.remove', function () {
            $(this).parent().parent().remove()
        })
    }


    render() {
        const CreateGroupForm = require('../../ReduxForm/CreateGroupForm')
        var content = ""
        var count = this.props.items
        // alert(count)
        if (this.props.data.area || this.props.data.app) {

            content =
                <CreateGroupForm _save={this.props._save} data={this.props.data} _addAreaApp={this.props._addAreaApp}/>
        } else {
            content = <Loading />
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}