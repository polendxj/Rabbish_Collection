/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class RegisterAdminComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const CreateAdminForm = require('../../ReduxForm/CreateAdminForm')
        var content=<CreateAdminForm _save={this.props._save} />

        return (
            <div>
                {content}
            </div>
        )

    }
}