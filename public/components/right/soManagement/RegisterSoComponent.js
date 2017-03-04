/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';

export default class RegisterSoComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const CreateSOForm = require('../../ReduxForm/CreateSOForm')
        return (
            <div>
                <CreateSOForm _save={this.props._save}/>
            </div>
        )

    }
}