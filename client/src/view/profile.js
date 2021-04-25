//from auth guide at:
// https://auth0.com/blog/complete-guide-to-react-user-authentication/?_ga=2.179276460.926093187.1617953362-1772989703.1617952260
import React from "react";

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { SolarSystemLoading as Loading } from 'react-loadingg';


const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <div class='profile-main'>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
          {user.app_metadata? JSON.stringify(user.app_metadata, null, 2): null}
          {user.user_metadata? JSON.stringify(user.user_metadata, null, 2): null}
        </pre>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});