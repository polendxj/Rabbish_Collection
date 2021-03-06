/**
 * Created by Administrator on 2017/3/5.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Loading, NoData, ConfirmModal, ListMiddleModal} from '../components/Tool/Tool'
import BreadCrumbs from '../components/right/breadCrumbs'
import Pagenation from '../components/right/Pagenation'
import {getListByMutilpCondition, saveObject, deleteObject} from '../actions/CommonActions'

export default class CitySettingRegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "数据管理", link: ''},
            {text: "区域设置", link: ''},
            {text: "添加城市", link: ''},
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: "返回区域列表", action: "/DataManage/CitySetting"}
        ]
        this._addCity=this._addCity.bind(this);
    }

    _addCity() {
        var params = {
            name: $("#name").val(),
            description: $("#description").val()
        }
        var self = this;
        this.props.dispatch(saveObject(params, "", "", city_register, "/DataManage/CitySetting"));
    }
    render() {
        const {data}=this.props;
        return (
            <div>
                <BreadCrumbs breadCrumbs={this.breadCrumbs}
                             icon={'icon-dribbble3'}
                             operation={this.operation}/>
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"添加城市"}</legend>
                        <CitySettingRegisterComponent _addCity={this._addCity}/>

                    </fieldset>
                </div>

            </div>
        )
    }

}

class CitySettingRegisterComponent extends Component {
    componentDidMount() {
        var self = this;
        $("#citySettingForm").validate({
            ignore: 'input[type=hidden],input[type=number], .select2-input', // ignore hidden fields
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },

            validClass: "validation-valid-label",
            success: function(label) {
                label.addClass("validation-valid-label").text("Success.")
            },
            errorPlacement: function(error, element) {
                error.appendTo(element.parent().parent().find(".errorShow"));
            }
        });
    }
    render() {
        var tableHeight = ($(window).height() - 240);

        return (
            <form id="citySettingForm" className="form-horizontal" action="#">
                <div className="row" style={{height:tableHeight+"px",overflowY:"scroll"}}>
                    <div className="col-md-6 col-md-offset-2">
                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{"城市名称"}<span style={{color:'red'}}>*</span></label>
                            <div className="col-lg-6">
                                <input id="name" className="form-control" name="name" type="text"
                                       placeholder={"城市名称"} required="required"/>
                            </div>
                            <div className="col-lg-3 errorShow"></div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-3 control-label" style={{textAlign: 'center'}}>{"描 述"}</label>
                            <div className="col-lg-6">
                                <textarea id="description" className="form-control" name="description"
                                       placeholder={"描 述"}></textarea>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="btn btn-primary" onClick={this.props._addCity.bind(this)}>{Current_Lang.label.save}</button>
                        </div>
                    </div>
                </div>
            </form>

        )
    }
}

function mapStateToProps(state) {
    const {}=state
    return {}
}


export default connect(mapStateToProps)(CitySettingRegisterContainer)