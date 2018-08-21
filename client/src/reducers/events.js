import { ADD_EVENT, UPDATE_EVENTS } from '../actions/events'

export default (state = null, { type, payload }) => {
  switch (type) {

    case ADD_EVENT:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_EVENTS:
      return payload.reduce((events, event) => {
        events[event.id] = event
        return events
      }, {})

    default:
      return state
  }
}