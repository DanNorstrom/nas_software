// src/auth/auth0-provider-with-history.js

// from public auth0:
// https://auth0.com/blog/complete-guide-to-react-user-authentication/?_ga=2.179276460.926093187.1617953362-1772989703.1617952260

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-jekvb0py.eu.auth0.com'//process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = '5NhbgERGXLKv83STgXNBbnVNh0FWZGF2'//process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;