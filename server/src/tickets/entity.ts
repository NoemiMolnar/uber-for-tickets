import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import Event from '../events/entity'
import User from '../users/entity'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  description: string

  @Column({ type: 'text', nullable: true })
  picture?: string

  @Column('integer')
  price: number

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  time?: Date;

  @ManyToOne(_ => User, user => user.tickets, { eager: true })
  user: User

  @ManyToOne(_ => Event, event => event.tickets)
  event: Event

  @OneToMany(_ => Comment, comment => comment.ticket, { eager: true })
  comments: Comment[]
}

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  content: string

  @ManyToOne(_ => Ticket, ticket => ticket.comments)
  ticket: Ticket

  @ManyToOne(_ => User, user => user.tickets)
  user: User
}
