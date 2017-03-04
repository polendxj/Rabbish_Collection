/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {Loading, audioCodes, videoCodes} from '../../Tool/Tool'

export default class UpdateGWComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const UpdateGWForm = require('../../ReduxForm/UpdateGWForm')
        var content = ""
        if (this.props.fetching) {
            content = <Loading/>
        } else {
            content = <UpdateGWForm _save={this.props._save} data={this.props.data}/>
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}