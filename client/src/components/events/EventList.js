import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { getUsers } from '../../actions/users';
import { getEvents } from '../../actions/events';
import './EventList.css'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

class EventList extends PureComponent {
  componentWillMount() {
      if (this.props.users === null) this.props.getUsers()
      if (this.props.events === null) this.props.getEvents()
  }

  renderCard = (eventObject, classes) => {
    if (eventObject) {
      const eventArray = Object.values(eventObject)
      return eventArray.map((event) => {
        return (
          <Card className={classes.card} key={event.id}>
            <CardMedia
              component="img"
              className={classes.media}
              height="140"
              image={event.picture}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {event.name}
              </Typography>
              <Typography component="p">
                {event.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
              size="small" 
              color="primary"
                onClick={() => {
                  console.log(event.id)
                  this.props.history.push(`/events/${event.id}`)
                }
                }
              >
                Details
              </Button>

            </CardActions>
          </Card>
        )
      })

    }
    else return <div>Loading...</div>
  }

  render() {
    const pic = this.props.events && this.props.events[7].picture
    return (
      <Paper className="outer-paper">
        {this.renderCard(this.props.events, this.props.classes)}
      </Paper>
    )
  }

}


const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  events: state.events === null ? null : state.events
})

export default connect(mapStateToProps, { getUsers, getEvents })(withStyles(styles)(EventList))

