/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class Pagenation extends Component {
    constructor(props) {
        super(props)
        this.lastStart = 0
        this.lastEnd = 0
        this.curPage = 0
        this.totalPage = 0
    }

    _onChange() {
        page_size = $("#" + (this.props.perPageID ? this.props.perPageID : "per_page" + " option:selected")).val();
        $(".pageSelect").val(page_size);
        this.props._changePage(0)
    }

    _redirectToPage(e) {
        if (e.keyCode == 13) {
            if ($("#" + (this.props.inputNumberID ? this.props.inputNumberID : "numberInput" )).val() < 1 || $("#" + (this.props.inputNumberID ? this.props.inputNumberID : "numberInput" )).val() > this.totalPage) {
                $("#" + (this.props.inputNumberID ? this.props.inputNumberID : "numberInput" )).val(this.curPage)
                return;
            }
            this.props._changePage($("#" + (this.props.inputNumberID ? this.props.inputNumberID : "numberInput" )).val() - 1)
        }

    }

    render() {
        var nums = 0
        var pages = []
        var clazz = ''
        if (this.props.counts) {
            nums = (this.props.counts % page_size) == 0 ? parseInt((this.props.counts / page_size)) : parseInt((this.props.counts / page_size) + 1);
            this.totalPage = nums;
            for (let i = 0; i < nums; i++) {
                clazz = classnames({"paginate_button": true, "current": this.props.page == i})
                pages.push(<a key={'page' + i} className={clazz}
                              aria-controls="DataTables_Table_2"
                              data-dt-idx={i + 1} tabIndex="0"
                              onClick={this.props._changePage.bind(this, i)}>{i + 1}</a>)
            }
        }
        var filterPages = []

        var cpage = this.props.page + 1
        this.curPage = cpage
        if (cpage < 10) {
            filterPages = pages.slice(0, 10);
            this.lastStart = 0;
            this.lastEnd = 10;
        } else {
            if (cpage % 10 === 0) {
                filterPages = pages.slice(cpage - 2, cpage + 9);
                this.lastStart = cpage - 2;
                this.lastEnd = cpage + 9;
            } else if (cpage % 10 === 9) {
                if (cpage - 10 < 0) {
                    filterPages = pages.slice(0, cpage + 1);
                    this.lastStart = 0;
                    this.lastEnd = cpage + 1;
                } else {
                    filterPages = pages.slice(cpage - 11, cpage + 2);
                    this.lastStart = cpage - 11;
                    this.lastEnd = cpage + 2;
                }
            } else {
                filterPages = pages.slice(this.lastStart, this.lastEnd);
            }
        }
        $("#" + (this.props.inputNumberID ? this.props.inputNumberID : "numberInput" )).val(cpage);
        return (

            <div className="datatable-footer"
                 style={{opacity: this.props.counts != 0 ? '1' : '0', borderTop: '0 red solid'}}>
                <div style={{display:this.props.operation==false?"none":"inline-block"}} className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_2_paginate">
                    <div className="btn-group">
                        <button className="btn btn-default btn-xs" disabled={this.props.page == 0 ? "disabled" : false}
                                onClick={this.props._prePage.bind(this, 0)}><i className=" icon-arrow-left13"></i>
                        </button>
                        <span>
                        {/*{filterPages}*/}
                        </span>
                        <button className="btn btn-default btn-xs"
                                disabled={(this.props.page + 1) == nums ? "disabled" : false}
                                onClick={this.props._nextPage.bind(this, 0)}><i className=" icon-arrow-right14"></i>
                        </button>

                    </div>

                </div>

                <div  className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite"
                     style={{float: "right", marginRight: '10px',display:this.props.operation==false?"none":"inline-block"}
                     }>
                    <div className="input-group" style={{marginTop: '-8px'}}>
                        <input id={this.props.inputNumberID ? this.props.inputNumberID : "numberInput"} min={1}
                               max={nums} type="number" style={{width: '60px'}} className="form-control input-xs"
                               defaultValue={1} onKeyDown={this._redirectToPage.bind(this)}/>
                        <span className="input-group-addon">/ {nums} {Current_Lang.label.pages}</span>
                    </div>
                </div>

                <div className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite"
                     style={{float: "right", marginRight: '10px',display:this.props.operation==false?"none":"inline-block"}
                     }>

                    <select id={this.props.perPageID ? this.props.perPageID : "per_page"} style={{width: '70px', marginTop: '-8px'}} className="form-control input-xs pageSelect"
                            defaultValue={page_size} onChange={this._onChange.bind(this)}>
                        <option value={1}>1</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite"
                     style={{float: "right", marginRight: '8px',display:this.props.operation==false?"none":"inline-block"}
                     }>
                    {Current_Lang.label.eachPage}
                </div>

                <div className="dataTables_info" id="DataTables_Table_2_info" role="status" aria-live="polite" style={{float: "right", marginRight: '30px'}}>
                    {Current_Lang.label.show} {this.props.page * page_size + 1}&nbsp;
                    {Current_Lang.label.to} &nbsp;{(parseInt(this.props.page * page_size) + parseInt(page_size)) >= this.props.counts ? this.props.counts : (parseInt(this.props.page * page_size) + parseInt(page_size))}&nbsp;
                    {Current_Lang.label.entries} / {Current_Lang.label.total} {this.props.counts ? this.props.counts : '0'} {Current_Lang.label.entries}
                </div>
            </div>

        )
    }
}