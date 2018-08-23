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
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListSubheader from '@material-ui/core/ListSubheader';
import { getUsers } from '../../actions/users';
import { getEvents } from '../../actions/events';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  media: {
    objectFit: 'cover',
  },
});



class EventDetails extends PureComponent {
  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
  }

  renderTickets = (ticketObject, classes) => {
    if (ticketObject) {
      const ticketArray = Object.values(ticketObject)
          return    <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList} cols={3}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                <ListSubheader component="div">Available tickets</ListSubheader>
                </GridListTile>
                {ticketArray.map(ticket => (
                  <GridListTile key={ticket.id}>
                    {ticket.picture && <img src={ticket.picture} alt="Tickets"/>}
                    <GridListTileBar
                      title={ticket.price}
                      subtitle={<span>by: {ticket.user.username}</span>}
                      actionIcon={
                        <IconButton className={classes.icon} onClick={()=>{
                          this.props.history.push(`/events/${this.props.event.id}/tickets/${ticket.id}`)
                        }}>
                          <InfoIcon />
                        </IconButton>
                      }
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
          No event is selected.
        </Typography>
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
    }
    return (

      <Paper className="outer-paper">
        <Card className={classes.card} key={this.props.event.id}>
          <CardMedia
            component="img"
            className={classes.media}
            height="300"
            image={this.props.event.picture}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.event.name}
            </Typography>
            <Typography component="p">
              {this.props.event.description}
            </Typography>
            {this.renderTickets(this.props.event.tickets, classes)}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                this.props.history.push(`/events`)
              }
              }
            >
              Back to the events
              </Button>
              {this.props.authenticated && <Button
              size="small"
              color="primary"
              onClick={() => {
                this.props.history.push(`/events/${this.props.event.id}/new_ticket`)
              }
              }
            >
              New ticket
            </Button> }

          </CardActions>
        </Card>
      
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    authenticated: state.currentUser !== null,
    event: state.events && state.events[props.match.params.id],
    events: state.events === null ? null : state.events,
    users: state.users === null ? null : state.users,
  }
}


export default connect(mapStateToProps, { getUsers, getEvents })(withStyles(styles)(EventDetails))
