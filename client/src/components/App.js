import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import Button from '@material-ui/core/Button';

import Image1 from "../assets/images/1.png";
import Image2 from "../assets/images/2.png";
import Image3 from "../assets/images/3.png";
import Image4 from "../assets/images/4.png";
import Image5 from "../assets/images/5.png";

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import EventShowPage from "./EventShowPage"
import EventsPage from "./EventsPage"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
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
                    <Button className="glow-on-hover bold" variant="contained" color="primary">
                      Create Events
                    </Button>
                  </Link>
                  <Link to="/events">
                  <Button className="glow-on-hover bold" variant="contained" color="primary">
                    Your Events
                    </Button>
                  </Link>
                  <Link to="/invites">
                  <Button className="glow-on-hover bold" variant="contained" color="primary">
                    Customize
                    </Button>
                  </Link>
                </div>
                <div className="carousel">
                  <a href="/events/5"><img src={Image1} /></a>
                  <a href="/events/3"><img src={Image2} /></a>
                  <a href="/events/9"><img src={Image3} /></a>
                  <a href="/events/4"><img src={Image4} /></a>
                  <a href="/events/2"><img src={Image5} /></a>
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
        <Route exact path="/events/:id">
          <EventShowPage user={currentUser} />
        </Route>
      </Switch>
    </Router>
  )
}

export default hot(App)
