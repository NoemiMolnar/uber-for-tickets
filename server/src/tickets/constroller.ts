import { JsonController, Post, HttpCode, Param, Body, CurrentUser, Get, Authorized } from 'routing-controllers'
import { Ticket, Comment } from '../tickets/entity'
import Event from '../events/entity'
import { io } from '../index'
import User from '../users/entity'

@JsonController()
export default class TicketController {

  @Authorized()  
  @Post('/events/:id/tickets')
  @HttpCode(201)
  async createTicket(
    @Body() newTicket: Ticket,
    @Param('id') id: number,
    @CurrentUser() user: User
  ) {
    const event = await Event.findOneById(id)
    const entity = await Ticket.create({
      ...newTicket,
      event,
      user,
      time:new Date()
    }).save()
    const ticket = await Ticket.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_TICKET',
      payload: {id, ticket}
    })

    return ticket
  }

  @Authorized()
  @Post('/events/:id/tickets/:ticketid')
  @HttpCode(201)
  async createComment(
    @Body() newComment: Comment,
    @Param('ticketid') ticketid: number,
    @CurrentUser() user: User
  ) {
    const ticket = await Ticket.findOneById(ticketid)
    const entity = await Comment.create({
      ticket,
      user,
      ...newComment
    }).save()

    const newTicket = await Ticket.findOneById(entity.id)
    io.emit('action', {
      type: 'UPDATE_TICKET',
      payload: newTicket
    })

    return newComment
  }

  @Get('/events/:id/tickets/:ticketid')
  async getTicket(
    @Param('ticketid') ticketid: number) {
    return await Ticket.findOneById(ticketid)
  }


}