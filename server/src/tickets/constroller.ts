import { JsonController, Authorized, Post, HttpCode, Param, Body, CurrentUser } from 'routing-controllers'
import Ticket from '../tickets/entity'
import Event from '../events/entity'
import { io } from '../index'
import User from '../users/entity'

@JsonController()
export default class TicketController {

@Authorized()  
@Post('/events/:id/tickets')
@HttpCode(201)
async createEvent(
  @Body() newTicket: Ticket,
  @Param('id') id: number,
  @CurrentUser() user: User
) {
  const event = await Event.findOneById(id)
  const entity = await Ticket.create({
    ...newTicket,
    event,
    user
  }).save()
  const ticket = await Ticket.findOneById(entity.id)

  io.emit('action', {
    type: 'ADD_TICKET',
    payload: ticket
  })

  return event
}

}