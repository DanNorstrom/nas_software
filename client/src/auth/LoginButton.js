import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// from auth source code:
// https://auth0.com/docs/quickstart/spa/react/01-login

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
      <button
        className="btn btn-lg btn-primary btn-block"
        data-toggle="button"
        onClick={() => loginWithRedirect()}
      >
        <h>Log In</h>
      </button>
    );
  };
  
  export default LoginButton;