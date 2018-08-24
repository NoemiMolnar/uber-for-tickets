import { JsonController, Post, HttpCode, Param, Body, CurrentUser, Get, Authorized, Patch, NotFoundError, ForbiddenError } from 'routing-controllers'
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
    console.log(id)
    const event = await Event.findOneById(id)
    const entity = await Ticket.create({
      ...newTicket,
      event,
      user,
      time: new Date()
    }).save()
    const ticket = await Ticket.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_TICKET',
      payload: { id, ticket }
    })

    return ticket
  }

  @Authorized()
  @Patch('/events/:id/tickets/:ticketid')
  @HttpCode(201)
  async editTicket(
    @Body() updateTicket,
    @Param('id') id: number,
    @Param('ticketid') ticketid: number,
    @CurrentUser() user: User
  ) {
    const ticket = await Ticket.findOneById(ticketid)
    if (!ticket) throw new NotFoundError(`Game does not exist`)
    if (user.id !== ticket.user.id) throw new ForbiddenError(`You are not part of this game`)


    if (updateTicket.description) { ticket.description = updateTicket.description; }
    if (updateTicket.price) { ticket.price = parseInt(updateTicket.price); }
    if (updateTicket.picture) { ticket.picture = updateTicket.picture; }

    await ticket.save()

    io.emit('action', {
      type: 'EDIT_TICKET',
      payload: { id, ticket }
    })

    return ticket
  }

  @Authorized()
  @Post('/events/:id/tickets/:ticketid')
  @HttpCode(201)
  async createComment(
    @Body() newComment: Comment,
    @Param('id') id: number,
    @Param('ticketid') ticketid: number,
    @CurrentUser() user: User
  ) {
    const ticket = await Ticket.findOneById(ticketid)

    const entity = await Comment.create({
      ticket,
      user,
      ...newComment
    }).save()

    const comment = await Comment.findOneById(entity.id)
    io.emit('action', {
      type: 'ADD_COMMENT',
      payload: { id, ticketid, comment }
    })

    return newComment
  }

  @Get('/events/:id/tickets/:ticketid')
  async getTicket(
    @Param('ticketid') ticketid: number) {
    return await Ticket.findOneById(ticketid)
  }


}