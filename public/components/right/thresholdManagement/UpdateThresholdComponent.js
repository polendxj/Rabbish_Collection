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
        const UpdateThresholdForm = require('../../ReduxForm/UpdateThresholdForm')
        var content = ""
        if(this.props.data && this.props.data.thresholdVo){
            content=<UpdateThresholdForm _save={this.props._save} data={this.props.data}/>
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