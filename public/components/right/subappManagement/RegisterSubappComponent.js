/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class RegisterSubappComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const CreateSubappForm = require('../../ReduxForm/CreateSubappForm')
        var content = ""
        if(this.props.data && this.props.data.appIdList){
            content = <CreateSubappForm _save={this.props._save} data={this.props.data}/>
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