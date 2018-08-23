import { ADD_EVENT, UPDATE_EVENTS } from '../actions/events'
import { ADD_TICKET, ADD_COMMENT } from '../actions/tickets'

export default (state = null, { type, payload }) => {
  switch (type) {

    case ADD_EVENT:
      return {
        ...state,
        [payload.id]: payload
      }

    case ADD_TICKET:
      const eventId = payload.id

      let newState1 = { ...state }
      newState1[eventId] =  {...state[eventId], tickets: [payload.ticket, ...state[eventId].tickets]}

      return newState1

    case ADD_COMMENT:
      const event = payload.id
      const ticketIndex = state[event].tickets.indexOf(state[event].tickets.filter((ticket) => ticket.id === payload.ticketid)[0])

      let newState = { ...state }
      newState[event].tickets[ticketIndex].comments = [payload.comment, ...newState[event].tickets[ticketIndex].comments]

      return newState


    case UPDATE_EVENTS:
      return payload.reduce((events, event) => {
        events[event.id] = event
        return events
      }, {})

    default:
      return state
  }
}