/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, ErrorModal, array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveObject,getListByMutilpCondition} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';
import RichText from './RichText';
import {
    NOTICE_DETAIL_START,
    NOTICE_DETAIL_END
} from '../../constants/index.js'

export default class NoticeUpdateContainer extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "系统通知", link: ''},
            {text: "新闻政策", link: ''},
            {text: "新闻政策修改", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回新闻政策列表", action: "/SystemNotice/NoticeManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getListByMutilpCondition(parseInt(this.props.params.id.substring(1)), NOTICE_DETAIL_START, NOTICE_DETAIL_END, notice_detail));
    }
    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        console.log("111",params);
        var id = parseInt(this.props.params.id.substring(1));
        this.props.dispatch(saveObject(params, "", "", notice_update + "?id=" + id, "/SystemNotice/NoticeManage", "update"));
    }

    render() {
        const {data,refresh}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <UpdateNoticeComponent data={data} _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class UpdateNoticeComponent extends Component{
    constructor(props) {
        super(props);
        this.initialFlag = 0;
        this._save = this._save.bind(this);
        this._uploadImg = this._uploadImg.bind(this);
    }
    componentDidMount() {
        var self = this;
        $("#noticeForm").validate({
            ignore: 'input[type=hidden], .select2-input', // ignore hidden fields
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
            }
        });
    }
    componentDidUpdate(){
        var self = this;
        if(this.props.data.status){
            this.initialFlag = this.initialFlag+1;
        }
        if(this.props.data.status&&this.initialFlag<=1){
            $('#file-input').fileinput({
                uploadUrl: 'http://dev.xysy.tech/rsapp/file/news',
                language: 'zh',
                showUpload: false,
                showPreview: true,
                browseIcon: '<i class="icon-folder-open"></i>&nbsp;',
                removeIcon: '<i class="icon-trash"></i>',
                enctype: 'multipart/form-data',
                allowedFileExtensions: ['jpg', 'png'],
                initialPreview: [
                    "<img src='"+ self.props.data.data.img +"' class='file-preview-image' />"
                ],
            });
            $('#file-input').on("fileuploaded", function (event, data) {
                if (data.response && data.response.status) {
                    self._save(data.response.data);
                }
            });
        }
    }
    _uploadImg() {
        var files = $('#file-input').prop("files");
        if(files.length > 0){
            $('#file-input').fileinput('upload');
        }else {
            this._save(this.props.data.data.img);
        }
    }
    _search() {
        this.props._startRefresh();
    }
    _save(imgUrl) {
        console.log("222",imgUrl);
        var content = UE.getEditor("content").getContent();
        var formFields = $("#noticeForm").serializeArray();
        var params = array2Json(formFields);
        var homeNotice = parseInt($('.choice .checked input[name="homeNotice"]').val());
        console.log(homeNotice);
        params.homeNotice = homeNotice;
        params.img = imgUrl;
        params.content = content.replace(new RegExp(/(")/g),"'").replace(new RegExp(/(&)/g),"-----");
        if($("#noticeForm").validate().form()){
            this.props._save(params);
        }
    }
    render() {
        const {data} = this.props;
        console.log("bb",data);
        var tableHeight = ($(window).height() - 130);
        var detail = "";
        if(data.status){
            detail = <form id="noticeForm" className="form-horizontal" action="#">
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
                                    <select className="form-control" name="type" defaultValue={data.data.type}>
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
                                       }}>{"标 题"}</label>
                                <div className="col-lg-9">
                                    <input name="title" type="text" className="form-control"
                                           defaultValue={data.data.title} placeholder={"标题"} required="required" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label" style={{
                                    textAlign: 'center'
                                }}>首页大图公告</label>
                                <div className="col-lg-9">
                                    <label className="radio-inline">
                                        <div className="choice">
                                            <span className={data.data.homeNotice==1?"checked":""}>
                                                <input type="radio" name="homeNotice" value={1} className="styled"/>
                                            </span>
                                        </div>
                                        是
                                    </label>
                                    <label className="radio-inline">
                                        <div className="choice">
                                            <span className={data.data.homeNotice==0?"checked":""}>
                                                <input type="radio" name="homeNotice" value={0} className="styled"/>
                                            </span>
                                        </div>
                                        否
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center'
                                       }}>{"摘 要"}</label>
                                <div className="col-lg-9">
                                    <textarea name="digest" defaultValue={data.data.digest} type="text" className="form-control" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center',
                                       }}>{"图片URL"}</label>
                                <div className="col-lg-9">
                                    <input type="file" name="file" id="file-input" defaultValue={data.data.img}
                                           multiple/>
                                </div>
                            </div>
                            <div className="form-group" >
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center'
                                       }}>{"内容"}</label>
                                <div className="col-lg-9">
                                    <RichText id="content" height="200" value={data.data.content} disabled={false}/>
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
        }else{
            // detail = <form id="noticeForm" className="form-horizontal" action="#">
            //     <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
            //         <div className="col-sm-8 col-sm-offset-2">
            //             <fieldset className="content-group">
            //                 <legend className="text-bold">
            //                     {"公告基础信息"}
            //                 </legend>
            //                 <div className="form-group">
            //                     <label className="col-lg-2 control-label"
            //                            style={{
            //                                textAlign: 'center'
            //                            }}>{"分类名称"}</label>
            //                     <div className="col-lg-9">
            //                         <select className="form-control" name="type">
            //                             <option value={1}>{"公告"}</option>
            //                             <option value={2}>{"新闻"}</option>
            //                             <option value={3}>{"政策法规"}</option>
            //                         </select>
            //                     </div>
            //                 </div>
            //
            //                 <div className="form-group" >
            //                     <label className="col-lg-2 control-label"
            //                            style={{
            //                                textAlign: 'center'
            //                            }}>{"标题"}</label>
            //                     <div className="col-lg-9">
            //                         <input name="title" type="text" className="form-control"
            //                                placeholder={"标题"} required="required" autoComplete="off"/>
            //                     </div>
            //                 </div>
            //                 <div className="form-group" style={{display:"none"}}>
            //                     <label className="col-lg-2 control-label" style={{
            //                         textAlign: 'center'
            //                     }}>首页大图公告</label>
            //                     <div className="col-lg-9">
            //                         <label className="radio-inline radio1">
            //                             <input type="radio" name="homeNotice" value={1} className="styled"/>
            //                             是
            //                         </label>
            //                         <label className="radio-inline radio2">
            //                             <input type="radio" name="homeNotice" value={0} className="styled"/>
            //                             否
            //                         </label>
            //                     </div>
            //                 </div>
            //                 <div className="form-group">
            //                     <label className="col-lg-2 control-label"
            //                            style={{
            //                                textAlign: 'center'
            //                            }}>{"摘 要"}</label>
            //                     <div className="col-lg-9">
            //                         <textarea name="digest" type="text" className="form-control" autoComplete="off"/>
            //                     </div>
            //                 </div>
            //                 <div className="form-group" >
            //                     <label className="col-lg-2 control-label"
            //                            style={{
            //                                textAlign: 'center',
            //                            }}>{"图片URL"}</label>
            //                     <div className="col-lg-9">
            //                         <input type="file" name="file" id="file-input"
            //                                multiple/>
            //                     </div>
            //                 </div>
            //                 <div className="form-group" >
            //                     <label className="col-lg-2 control-label"
            //                            style={{
            //                                textAlign: 'center'
            //                            }}>{"内容"}</label>
            //                     <div className="col-lg-9">
            //                         <RichText id="content" height="200" value={""} disabled={false}/>
            //                     </div>
            //                 </div>
            //
            //             </fieldset>
            //
            //         </div>
            //     </div>
            // </form>
            detail = <Loading/>
        }
        return (
            <div>
                {detail}
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {getNoticeDetail,commonReducer}=state;
    return {
        data: getNoticeDetail.data,
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(NoticeUpdateContainer)