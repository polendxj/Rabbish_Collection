/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class RegisterGWComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const CreateGWForm = require('../../ReduxForm/CreateGWForm')
        var content = <CreateGWForm _save={this.props._save}/>
        return (
            <div>
                {content}
            </div>
        )

    }
}