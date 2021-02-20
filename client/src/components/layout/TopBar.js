import { divide } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div key="sign-in" className="horizontal button-container">
    <div>
      <button className="glow-on-hover" variant="contained" color="primary">
        <Link to="/user-sessions/new">
          SIGN IN
        </Link>
      </button>
    </div>,
    <div key="sign-up">
      <button className="glow-on-hover" variant="contained" color="primary">
        <Link to="/users/new">
          SIGN UP
        </Link>
      </button>
    </div>,
    </div>
  ];

  const authenticatedListItems = [
    <div key="sign-out">
        <SignOutButton />
    </div>,
  ];
  // 
  // className="top-bar-left"
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <button className="glow-on-hover" variant="contained" color="primary">
          <Link to="/">
            SAVE THIS DATE
          </Link>
        </button>
        <button className="glow-on-hover" variant="contained" color="primary">
          <Link to="/events">
            EVENTS
          </Link>
        </button>
        <button className="glow-on-hover" variant="contained" color="primary">
          <Link to="/invites">
            CUSTOMIZE
          </Link>
        </button>
      </div>
      <div>
        <a>{user ? authenticatedListItems : unauthenticatedListItems}</a>
      </div>
    </div>
  );
};

export default TopBar;
