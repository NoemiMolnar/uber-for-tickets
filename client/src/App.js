import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import TopBar from './components/layout/TopBar'
import EventList from './components/events/EventList'
import EventDetails from './components/events/EventDetails'
import TicketDetails from './components/events/TicketDetails'
import NewEvent from './components/events/NewEvent'
import NewTicket from'./components/events/NewTicket'
import NewComment from './components/events/NewComment'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/events" component={EventList} />
            <Route exact path="/new_event" component={NewEvent} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/events/:id/new_ticket" component={NewTicket} />
            <Route exact path="/events/:id/tickets/:ticketid/new_comment" component={NewComment} />
            <Route exact path="/events/:id/tickets/:ticketid" component={TicketDetails} />
            <Route exact path="/" render={ () => <Redirect to="/events" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
