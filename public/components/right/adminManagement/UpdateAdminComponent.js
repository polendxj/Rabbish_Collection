/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {Loading,audioCodes,videoCodes} from '../../Tool/Tool'

export default class UpdateCSEComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const UpdateAdminForm = require('../../ReduxForm/UpdateAdminForm')
        var content=""
        if(this.props.data && this.props.data.adminVo){
            content=<UpdateAdminForm _save={this.props._save} />
        }else{
            content=<Loading/>
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}