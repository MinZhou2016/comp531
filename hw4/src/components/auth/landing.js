import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="errorMessage">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMessage">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)
ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.common.error, success: state.common.success }
})(ErrorMessage)

const Landing = () => (
    <div className="container-fluid">
        <div className="row" id="bar"> 
            <div className="col-xs-6 col-md-6">
                <h1>  Rice Book</h1>
            </div>
            <div className="col-xs-6 col-md-6">
                <Login/>
            </div>
        </div>

        <ErrorMessage/>

        <div className="container">
            <div className="row" id="central">
                <div className="col-xs-6 col-md-6">
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/e2/21/e9/e221e9659fe1e3e558bc8083187346da.gif" 
                    className="img-responsive" alt="Responsive image"/>
                </div>
                <div className="col-xs-6 col-md-6">
                    <Register/>
                </div>
            </div>
        </div>
    </div>

)

export default Landing