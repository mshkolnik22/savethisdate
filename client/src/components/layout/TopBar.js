import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
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
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
