import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import Button from '@material-ui/core/Button';

import Image1 from "../assets/images/birthday.jpg";
import Image2 from "../assets/images/movienight.jpg";
import Image3 from "../assets/images/sweet16.jpg";
import Image4 from "../assets/images/hiking.jpg";
import Image5 from "../assets/images/discordnight.jpg";

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import EventShowPage from "./EventShowPage"
import EventsPage from "./EventsPage"
import EventEditPage from "./EventEditPage"
import InvitesPage from "./InvitesPage"
import Congratulations from "./Congratulations"


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
        <Route exact path="/">
          <div>
            <div className="bg-img">
              <div className="bg-container">
               <div className="bg-text">
                  <h2 className="app-header">Welcome to Save This Date!</h2>
                  <Link to="/events">
                    <button className="glow-on-hover bold" variant="contained" color="primary">
                      CREATE NEW
                    </button>
                  </Link>
                  <Link to="/events">
                    <button className="glow-on-hover bold" variant="contained" color="primary">
                      YOUR EVENTS
                    </button>
                  </Link>
                  <Link to="/invites">
                    <button className="glow-on-hover bold" variant="contained" color="primary">
                      CUSTOMIZE
                    </button>
                  </Link>
                </div>
                <div className="carousel">
                  <a href="/events"><img src={Image1} /></a>
                  <a href="/events"><img src={Image2} /></a>
                  <a href="/events"><img src={Image3} /></a>
                  <a href="/events"><img src={Image4} /></a>
                  <a href="/events"><img src={Image5} /></a>
                </div>
              </div>
            </div>
          </div>
        </Route>
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
  )
}

export default hot(App)
