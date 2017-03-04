/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class RegisterCSEComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const CreateThresholdForm = require('../../ReduxForm/CreateThresholdForm')
        var content = <CreateThresholdForm _save={this.props._save} data={this.props.data}/>
        return (
            <div >
                {content}
            </div>
        )

    }
}