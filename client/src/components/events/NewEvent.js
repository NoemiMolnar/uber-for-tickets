import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {createEvent} from '../../actions/events'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});



class NewEvent extends PureComponent {
  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createEvent(this.state.name, this.state.description, this.state.picture, this.state.startDate, this.state.endDate)
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
              Name
        <input type="text" name="name" value={
                this.state.name || ''
              } onChange={this.handleChange} />
            </label>
            <label>
              Description
        <input type="text" name="description" value={
                this.state.description || ''
              } onChange={this.handleChange} />
            </label>
            <label>
              Picture
        <input type="text" name="picture" value={
                this.state.picture || ''
              } onChange={this.handleChange} />
            </label>
            <label>
              Start Date
        <input type="date" name="startDate" value={
                this.state.startDate || ''
              } onChange={this.handleChange} />
            </label>
            <label>
              End Date
        <input type="date" name="endDate" value={
                this.state.endDate || ''
              } onChange={this.handleChange} />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            this.props.history.push(`/events`)
          }
          }
        >
          Back to the event list
       </Button>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  createEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewEvent))