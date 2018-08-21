import { JsonController, Authorized, Post, HttpCode, Get, Param, Body } from 'routing-controllers'
import Event from '../events/entity'
import { io } from '../index'

@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() newEvent: Event
  ) {
    const entity = await newEvent.save()
    const event = await Event.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_EVENT',
      payload: event
    })

    return event
  }

  @Get('/events')
  getEvents() {
    return Event.find()
  }

  @Get('/events/:id([0-9]+)')
  getEvent(
    @Param('id') id: number
  ) {
    return Event.findOneById(id)
  }
}

