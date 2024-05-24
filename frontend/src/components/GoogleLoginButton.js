import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from './path_to_auth_context'; // Đường dẫn đến AuthContext của bạn
import axios from 'axios';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

function GoogleLoginButton() {
    const { login } = useContext(AuthContext);

    const onSuccess = async (response) => {
        const { tokenId } = response;
        try {
            const res = await axios.post('http://localhost:8080/api/auth/google', { tokenId });
            const { accessToken, user } = res.data.data;
            login(user, accessToken);
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    const onFailure = (response) => {
        console.log('Google login failed:', response);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
}

export default GoogleLoginButton;
