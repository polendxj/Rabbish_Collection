import React, {Component, PropTypes} from 'react'


class Developing extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{marginTop:'100px'}}>
                <div style={{textAlign: 'center'}}>
                    <button type="button" className="btn btn-default" style={{
                        border: '0 red solid',
                        background: 'transparent',
                        fontSize: '40px',
                        color: 'lightgray'
                    }}>
                            <i className=" icon-spinner10" style={{fontSize:'40px',marginRight:'20px'}}></i>{Current_Lang.label.underDevelopment}
                    </button>
                </div>
            </div>
        )
    }
}


export default Developing