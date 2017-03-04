/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {browserHistory} from 'react-router'

export default class BreadCrumbs extends Component {
    _doLink(path) {
        if(path){
            browserHistory.push(path)

        }
    }

    render() {
        var breadCrumbs = [];
        var operations = [];
        var iconClazz = classnames(this.props.icon?this.props.icon:"icon-cog6", " position-left")
        /*渲染面包屑路径*/
        for (var i = 0; i < this.props.breadCrumbs.length; i++) {
            if (i == 0) {
                breadCrumbs.push(<li onClick={this._doLink.bind(this, this.props.breadCrumbs[i].link)} key={i}
                                     className={this.props.breadCrumbs[i].link ? '' : 'active'}><i className={iconClazz} ></i>{this.props.breadCrumbs[i].link ?
                    <a href="javascript:void(0)"><i
                        className={iconClazz}></i>{this.props.breadCrumbs[i].text}
                    </a> : this.props.breadCrumbs[i].text}</li>)
            } else if (i != this.props.breadCrumbs.length - 1) {
                breadCrumbs.push(<li onClick={this._doLink.bind(this, this.props.breadCrumbs[i].link)} key={i}
                                     className={this.props.breadCrumbs[i].link ? '' : 'active'}>
                    {this.props.breadCrumbs[i].link ?
                        <a href="javascript:void(0)">{this.props.breadCrumbs[i].text}</a> : this.props.breadCrumbs[i].text}</li>)
            } else {
                breadCrumbs.push(<li key={i} className="active">{this.props.breadCrumbs[i].text}</li>)
            }
        }

        /*渲染当前路径的可用操作*/
        for (var i = 0; i < this.props.operation.length; i++) {
            operations.push(<li style={{fontWeight:'bold'}} key={i} onClick={this._doLink.bind(this, this.props.operation[i].action)}><a
                href="javascript:void(0)"><i
                className={classnames(this.props.operation[i].icon, "position-left")}></i> {this.props.operation[i].text}
            </a></li>)
        }
        return (
            <div className="page-header" style={{borderBottom:'thin #FCFCFC solid'}}>
                <div className="breadcrumb-line" style={{margin:'0',borderRadius:'0',border:'0 red solid',backgroundColor:'#FCFCFC'}}>
                    <ul className="breadcrumb" style={{marginLeft:'14px',fontWeight:'bold'}}>
                        {breadCrumbs}
                    </ul>

                    <ul className="breadcrumb-elements">
                        {operations}
                    </ul>
                    <a className="breadcrumb-elements-toggle"><i className="icon-menu-open"></i></a></div>
            </div>
        )
    }
}