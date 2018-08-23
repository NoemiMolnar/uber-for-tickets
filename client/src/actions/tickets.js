import * as request from 'superagent'
import { isExpired } from '../jwt'
import { baseUrl } from '../constants'
import { logout } from './users'

export const ADD_TICKET = 'ADD_TICKET'

export const addTicket = (event, ticket) => ({
  type: ADD_TICKET,
  payload: { event, ticket }
})

export const createTicket = (description, picture, price, eventId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())
  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .send({ description, picture, price })
    .set('Authorization', `Bearer ${jwt}`)
    .catch(err => console.error(err))
}

export const ADD_COMMENT = 'ADD_COMMENT'

export const addComment = (comment, event, ticket) => ({
  type: ADD_COMMENT,
  payload: { event, ticket, comment }
})

export const createComment = (content, event, ticket) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/events/${event}/tickets/${ticket}`)
    .send({ content })
    .set('Authorization', `Bearer ${jwt}`)
    .catch(err => console.error(err))
}