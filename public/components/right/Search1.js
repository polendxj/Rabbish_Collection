/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Field, reduxForm} from 'redux-form'
export default class Search1 extends Component {
    constructor() {
        super()
    }

    _changeItem(obj) {
        this.props.items.forEach(function (item) {
            if (item.key == obj.key) {
                this.props.onChange(item)
            }
        }.bind(this))

    }

    _search() {
        console.log(this.props)
        this.props._search();
    }

    render() {
        let items = []
        this.props.items.forEach(function (item, key) {
            items.push(<li key={item.key + key} onClick={this._changeItem.bind(this, item)}><a
                href="javascript:void(0)">{item.value}</a></li>)
        }.bind(this))

        const Search1Form = require('../ReduxForm/Search1Form')

        return (
            <form action="#" className="main-search">
                <div className="row search-option-buttons">
                    <div className="col-sm-6">
                        <ul className="list-inline list-inline-condensed no-margin-bottom">
                            <li className="dropdown">
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-dots position-left"></i> {this.props.selected.value}
                                    <span className="caret"></span>
                                </a>

                                <ul className="dropdown-menu">
                                    {items}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="input-group content-group">
                    <div className="has-feedback has-feedback-left">
                        {/*<input type="text" className="form-control input-xlg" onFocus={e=>t} onChange={this._inputChange.bind(this)} defaultValue={'请输入查询条件'} />*/}
                        <Search1Form placeholder={'请输入查询内容'}/>
                        <div className="form-control-feedback">
                            <i className="icon-search4 text-muted text-size-base"></i>
                        </div>
                    </div>

                    <div className="input-group-btn">
                        <button type="button" className="btn btn-primary btn-xlg" onClick={this._search.bind(this)}>搜
                            索
                        </button>
                    </div>
                </div>

            </form>

        )
    }
}