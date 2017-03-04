/**
 * Created by Administrator on 2016/8/29.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

const Search1Form = (props) => {
    const {placeholder}=props
    return (
        <div>
            <Field className="form-control input-xlg"  name="searchText" component="input" type="text" placeholder={'请输入查询的内容'}/>
        </div>
    )
}

export default reduxForm({
    form: 'simple'  // a unique identifier for this form
})(Search1Form)

