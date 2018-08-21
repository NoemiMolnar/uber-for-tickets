import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Event from '../events/entity'
import User from '../users/entity'

@Entity()
export default class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  description: string

  @Column({type:'text', nullable: true })
  picture?: string

  @Column('integer') 
  price: number

  @ManyToOne(_ => User, user => user.tickets)
  user: User

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

}
