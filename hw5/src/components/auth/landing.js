import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'
const Landing = ({err, suc}) => (
    <div className="landing container-fluid">
        <div className="row" id="bar"> 
            <div className="col-xs-6 col-md-6">
                <h1>  Rice Book</h1>
            </div>
            <div className="col-xs-6 col-md-6">
                <Login/>
            </div>
        </div>
        <div className="container">
                { err.length == 0 ? '' :
                    <div className="alert alert-danger">
                        <div id="errorMessage">{err}</div>
                    </div>
                }
                { suc.length == 0 ? '' :
                    <div className="alert alert-success">
                        <div id="successMessage">{suc}</div>
                    </div>
                }
        </div>
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
Landing.propTypes = {
    err: PropTypes.string.isRequired,
    suc: PropTypes.string.isRequired
}

export default connect(
    (state) => {
        return { 
            err: state.errors.updateFileError, 
            suc: state.errors.updateFileSuccess 
        }
})(Landing)