import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Unauthorized extends React.Component {
    render() {
        return(
            <div>
                <h1>Oops... you don't have the authorization for this page.</h1>
            </div>
        )
    }
}

export default Unauthorized;