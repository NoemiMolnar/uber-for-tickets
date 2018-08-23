import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { getUsers } from '../../actions/users';
import { getEvents } from '../../actions/events';
import { fraudRisk } from '../../logic'
import { userId } from '../../jwt'


const styles = theme => ({
  media: {
    objectFit: 'cover',
  },
  // card: {
  //   maxWidth: '50%',
  // },
});



class TicketDetails extends PureComponent {
  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
  }

  renderComments = (commetArray, classes) => {
    if (commetArray) {
      return <div className={classes.root}>
        <GridList cellHeight={"auto"} className={classes.gridList} cols={1}>
          <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
            <ListSubheader component="div">Comments</ListSubheader>
          </GridListTile>
          {commetArray.map(comment => (
            <GridListTile key={comment.id}>
              <Typography component="p">
                {comment.content}
              </Typography>
              <GridListTileBar
                title={comment.price}
                subtitle={<span>by: {comment.user}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    }
  }

  render() {
    const classes = this.props.classes
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
        <Typography variant="headline" component="h1">
          Ticket from {ticket.user.username}
        </Typography>
        <Typography component="h1">
          We calculated that the risk of this ticket being a fraud is <b><em>{fraudRisk(ticket, this.props.users)} % </em></b>
        </Typography>
        <Typography gutterBottom variant="headline" component="h1">
          Price {ticket.price}
        </Typography>
        <Card className={classes.card} key={ticket.id}>
          {ticket.picture && <CardMedia
            component="img"
            className={classes.media}
            height="300"
            image={ticket.picture}
            title="Contemplative Reptile"
          />}
          <CardContent>
            <Typography component="p">
              {ticket.description}
            </Typography>
          </CardContent>
          <CardActions>
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
            <Button
              size="small"
              color="primary"
              onClick={() => {
                this.props.history.push(`/events/${this.props.event.id}/tickets/${this.props.match.params.ticketid}/new_comment`)
              }
              }
            >
              Add Comment
              </Button>

            {this.props.user.id === ticket.user.id && <Button
              size="small"
              color="primary"
              onClick={() => {
                this.props.history.push(`/events/${this.props.event.id}/tickets/${this.props.match.params.ticketid}/edit`)
              }
              }
            >
              Edit ticket
            </Button>}

          </CardActions>
        </Card>
        {this.renderComments(ticket.comments, classes)}
      </Paper>

    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    event: state.events && state.events[props.match.params.id],
    events: state.events === null ? null : state.events,
    users: state.users === null ? null : state.users,
    user: state.currentUser && state.users &&
      state.users[userId(state.currentUser.jwt)]
  }
}


export default connect(mapStateToProps, { getUsers, getEvents })(withStyles(styles)(TicketDetails))
