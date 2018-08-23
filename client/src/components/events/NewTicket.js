import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {createTicket} from '../../actions/tickets'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});



class NewTicket extends PureComponent {
  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createTicket(this.state.description, this.state.picture, this.state.price, this.props.match.params.id)
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
              Price
        <input type="number" name="price" value={
                this.state.price || ''
              } onChange={this.handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            this.props.history.push(`/events/${this.props.match.params.id}`)
          }
          }
        >
          Back to the event
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
  createTicket
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewTicket))