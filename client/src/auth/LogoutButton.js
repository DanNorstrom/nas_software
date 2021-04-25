import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// from auth0 docs
// https://auth0.com/blog/complete-guide-to-react-user-authentication/?_ga=2.179276460.926093187.1617953362-1772989703.1617952260

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-lg btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      <h>Log Out</h>
    </button>
  );
};

export default LogoutButton;