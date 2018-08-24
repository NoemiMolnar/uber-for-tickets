import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { changeTicket } from '../../actions/tickets'
import { getUsers } from '../../actions/users';
import { getEvents } from '../../actions/events';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});



class EditTicket extends PureComponent {
  state = {

  }

  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.changeTicket(this.state.description, this.state.picture, this.state.price, this.props.match.params.id, this.props.match.params.ticketid)
    this.props.history.push(`/events/${this.props.match.params.id}/tickets/${this.props.match.params.ticketid}`)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    

    this.setState({
      [name]: value
    })
  }

  render() {
    if (!this.props.event) {
      return <Paper className="outer-paper">
        <Typography component="p">
          Loading...
        </Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            this.props.history.push(`/events/${this.props.event.id}`)
          }
          }
        >
          Back to the event
       </Button>
      </Paper>
    }
    const ticket = this.props.event.tickets.filter((ticket) => {
      return ticket.id === parseInt(this.props.match.params.ticketid)
    })[0]
    return (
      <Paper className="outer-paper">
        <div className="new-event">
          <form onSubmit={this.handleSubmit}>
            <label>
              Description
        <input type="text" name="description" value={
                this.state.description || ''
              }
                placeholder={ticket.description}
                onChange={this.handleChange} />
            </label>
            <label>
              Picture
        <input type="text" name="picture" value={
                this.state.picture || ''
              }
                placeholder={ticket.picture}
                onChange={this.handleChange} />
            </label>
            <label>
              Price
        <input type="number" name="price" value={
                this.state.price || ''
              }
                placeholder={ticket.price}
                onChange={this.handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            this.props.history.push(`/events/${this.props.match.params.id}/tickets/${this.props.match.params.ticketid}`)
          }
          }
        >
          Back to the ticket
       </Button>
      </Paper>

    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    event: state.events && state.events[props.match.params.id],
    events: state.events === null ? null : state.events,
    users: state.users === null ? null : state.users,
  }
}

const mapDispatchToProps = {
  changeTicket,
  getEvents,
  getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditTicket))