import React from 'react';
import PropTypes from 'prop-types';


function Login(props) {
    const func = () => console.log(props.id)

    return (
        <div onClick={func}>
        </div>
    )
}

Login.propTypes = {

}

export default Login

