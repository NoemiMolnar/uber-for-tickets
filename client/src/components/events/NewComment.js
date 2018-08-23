import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {createComment} from '../../actions/tickets'
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



class NewComment extends PureComponent {
  state = {

  }

  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createComment(this.state.content, this.props.match.params.id, this.props.match.params.ticketid)
    this.state = {}
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <Paper className="outer-paper">
        <div className="new-event">
          <form onSubmit={this.handleSubmit}>
            <label>
              Comment
        <input type="text" name="content" value={
                this.state.content || ''
              } onChange={this.handleChange} />
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

const mapStateToProps = (state) => {
  return {
    events: state.events === null ? null : state.events,
    users: state.users === null ? null : state.users
  }
}

const mapDispatchToProps = {
  createComment,
  getEvents,
  getUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewComment))