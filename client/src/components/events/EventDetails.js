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
import { getUsers } from '../../actions/users';
import { getEvents } from '../../actions/events';

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};


class EventDetails extends PureComponent {
  // componentWillMount() {
  //     if (this.props.users === null) this.props.getUsers()
  //     if (this.props.events === null) this.props.getEvents()
  // }

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
          Back to the events
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

          </CardActions>
        </Card>
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    event: state.events && state.events[props.match.params.id],
  }
}


export default connect(mapStateToProps, { getUsers, getEvents })(withStyles(styles)(EventDetails))
