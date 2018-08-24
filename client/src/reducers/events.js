import { ADD_EVENT, UPDATE_EVENTS } from '../actions/events'
import { ADD_TICKET, ADD_COMMENT, EDIT_TICKET } from '../actions/tickets'

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
      newState1[eventId] = { ...state[eventId], tickets: [payload.ticket, ...state[eventId].tickets] }
console.log(payload)
      return newState1

    case EDIT_TICKET:
      const eventId2 = payload.id

      let newState2 = { ...state }
      const ticketIndex2 = newState2[eventId2].tickets.indexOf(newState2[eventId2].tickets.filter(ticket=> ticket.id === payload.ticket.id)[0])
      newState2[eventId2].tickets[ticketIndex2] = payload.ticket
console.log(payload.ticket)
      
      return newState2

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