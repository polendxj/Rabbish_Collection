/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';

export default class CreateCSRComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const UpdateSOForm = require('../../ReduxForm/UpdateSOForm')
        return (
            <div>
                <UpdateSOForm _save={this.props._save}/>
            </div>
        )

    }
}