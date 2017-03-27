/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, ErrorModal, array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveObject} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class NoticeRegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "系统通知", link: ''},
            {text: "新闻政策", link: ''},
            {text: "新闻政策注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回新闻政策列表", action: "/SystemNotice/NoticeManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this);
    }

    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",notice_register,"/SystemNotice/NoticeManage"));
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
                    <RegisterNoticeComponent _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class RegisterNoticeComponent extends Component{
    constructor(props) {
        super(props);
        this._save = this._save.bind(this);
        this._uploadImg = this._uploadImg.bind(this);
    }
    componentDidMount() {
        var self = this;
        $('#file-input').fileinput({
            uploadUrl: 'http://dev.xysy.tech/rsapp/file/news',
            language: 'zh',
            showUpload: false,
            showPreview: false,
            browseIcon: '<i class="icon-folder-open"></i>&nbsp;',
            removeIcon: '<i class="icon-trash"></i>',
            enctype: 'multipart/form-data',
            allowedFileExtensions: ['jpg', 'png', 'gif']
        });
        $('#file-input').on("fileuploaded", function (event, data) {
            console.log("img", data);
            if (data.response && data.response.status) {
                self._save(data.response.data);
            }
        });
    }
    _uploadImg() {
        $('#file-input').fileinput('upload');
    }
    _search() {
        this.props._startRefresh();
    }
    _save(imgUrl) {
        console.log("imgUrl", imgUrl);
        console.log("form", $("#noticeForm").validate().form());
        var formFields = $("#noticeForm").serializeArray();
        var params = array2Json(formFields);
        params.img = imgUrl;
        if($("#noticeForm").validate().form()){
            this.props._save(params);
        }
    }

    render() {
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="noticeForm" className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"公告基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"分类名称"}</label>
                                    <div className="col-lg-9">
                                        <select className="form-control" name="type">
                                            <option value={1}>{"公告"}</option>
                                            <option value={2}>{"新闻"}</option>
                                            <option value={3}>{"政策法规"}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"标题"}</label>
                                    <div className="col-lg-9">
                                        <input name="title" type="text" className="form-control"
                                               placeholder={"标题"} required="required" autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"图片URL"}</label>
                                    <div className="col-lg-9">
                                        <input type="file" name="file" id="file-input"
                                               multiple data-min-file-count="1"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"内容"}</label>
                                    <div className="col-lg-9">
                                    <textarea name="content" rows="5" cols="5" className="form-control"
                                              placeholder={"内容"}></textarea>
                                    </div>
                                </div>

                            </fieldset>

                            <div className="form-group" >
                                <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._uploadImg}>{"发布"}
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
    const {commonReducer}=state;
    return {
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(NoticeRegisterContainer)