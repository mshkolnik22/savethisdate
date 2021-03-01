import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import LandingPage from "./LandingPage"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import EventShowPage from "./EventShowPage"
import EventsPage from "./EventsPage"
import EventEditPage from "./EventEditPage"
import InvitesPage from "./InvitesPage"
import Congratulations from "./Congratulations"
import ScrollArrow from "./ScrollArrow"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [events, setEvents] = useState([])

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/events">
          <EventsPage user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/invites" component={InvitesPage} />
        <Route exact path="/events/congratulations" component={Congratulations} />
        <Route exact path="/events/:id">
          <EventShowPage user={currentUser} />
        </Route>
        <Route exact path="/events/:id/edit" component={EventEditPage} />
      </Switch>
    </Router>
  );
}

export default hot(App)
