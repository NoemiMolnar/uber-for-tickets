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
import './EventList.css';

const styles = {
  card: {
    maxWidth: '25%',
  },
  media: {
    objectFit: 'cover',
  },
};

class EventList extends PureComponent {
  state = {
    currentPage: 0
  }

  componentWillMount() {
    if (this.props.users === null) this.props.getUsers()
    if (this.props.events === null) this.props.getEvents()
  }


  createEventArray = (eventObject) => {
    const eventArray = Object.values(eventObject)
    const events = eventArray.length
    let arrayOfFour;
    if (events > 4) {
      let start = 0 + 4 * this.state.currentPage;
      let end = 4 + 4 * this.state.currentPage;
      if(end<events){
      arrayOfFour = eventArray.slice(start, end)
      } else {
      arrayOfFour = eventArray.slice(start, events-1)
      }
    } else {
      arrayOfFour = eventArray
    }

    return arrayOfFour
  }

  renderCard = (eventArray, classes) => {
    return <div className="flexBox">
      {eventArray.map((event) => {
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
                  this.props.history.push(`/events/${event.id}`)
                }
                }
              >
                Details
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </div>
  }

  render() {
    if (!this.props.events) {
      return <div>Loading...</div>
    }
    else {
      { !this.state.pages && this.setState({
          ...this.state,
          pages: this.props.events && Math.floor(Object.values(this.props.events).length / 4)
        })
      }
      return (
        <Paper className="outer-paper">
          {this.renderCard(this.createEventArray(this.props.events), this.props.classes)}
          {this.props.authenticated && <Button
            size="small"
            color="primary"
            onClick={() => {
              this.props.history.push(`/new_event`)
            }
            }
          >
            Create Event
              </Button>}
          {this.state.currentPage > 0 && <Button
            size="small"
            color="primary"
            onClick={() => {
              this.setState({
                ...this.state,
                currentPage: this.state.currentPage-1
                }
              )
            }
            }
          >
            Back
              </Button>}
          {this.state.currentPage < this.state.pages && <Button
            size="small"
            color="primary"
            onClick={() => {
              this.setState({
                ...this.state,
                currentPage: this.state.currentPage+1
              }
              )
            }
            }
          >
            Next
                </Button>}
        </Paper>
      )
    }
  }

}


const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  events: state.events === null ? null : state.events
})

export default connect(mapStateToProps, { getUsers, getEvents })(withStyles(styles)(EventList))

