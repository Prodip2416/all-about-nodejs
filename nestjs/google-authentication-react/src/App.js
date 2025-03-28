import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import React from 'react';

function App() {
  return (
    <GoogleOAuthProvider clientId="610487111148-tc9tsab4151arp7q3pbnhti5r5p4b9hr.apps.googleusercontent.com">
      <GoogleLogin
        buttonText="Login"
        onSuccess={(response) => {
          console.log(response);
          fetch('http://localhost:3000/auth/google-authentication', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: response.credential,
            }),
          })
            .then((response) => console.log(response))
            .then((data) => console.log(data));
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
