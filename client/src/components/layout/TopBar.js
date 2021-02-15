import { divide } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <div key="sign-in">
      <Link to="/user-sessions/new" className="button">Sign In</Link>
    </div>,
    <div key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </div>,
  ];

  const authenticatedListItems = [
    <div className="hollow button" key="sign-out">
        <SignOutButton />
    </div>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">
          <button className="hollow button">Save This Date!</button>
        </Link>
        <Link to="/events">
          <button className="hollow button">Events</button>
        </Link>
        <Link to="/guests">
          <button className="hollow button">Guests</button>
        </Link>
      </div>
      <div className="top-bar-right">
        <a className="menu button">{user ? authenticatedListItems : unauthenticatedListItems}</a>
      </div>
    </div>
  );
};

export default TopBar;
