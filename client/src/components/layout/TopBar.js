import { divide } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import Button from '@material-ui/core/Button';

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div key="sign-in">
      <Link to="/user-sessions/new">
        <Button className="glow-on-hover" variant="contained" color="primary">
          Sign In
        </Button>
      </Link>

    </div>,
    <div key="sign-up">
      <Link to="/users/new">
        <Button className="glow-on-hover" variant="contained" color="primary">
          Sign Up
        </Button>
      </Link>
    </div>,
  ];

  const authenticatedListItems = [
    <div key="sign-out">
        <SignOutButton />
    </div>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">
          <Button variant="contained" color="primary">
            Save This Date!
          </Button>
          </Link>
          <Link to="/events">
            <Button variant="contained" color="primary">
              Events
            </Button>
          </Link>
          <Link to="/guests">
            <Button variant="contained" color="primary">
              Guests
            </Button>
          </Link>
      </div>
      <div>
        <a>{user ? authenticatedListItems : unauthenticatedListItems}</a>
      </div>
    </div>
  );
};

export default TopBar;
