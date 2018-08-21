import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Exclude } from 'class-transformer';
import { IsString, MinLength, } from 'class-validator';
import * as bcrypt from 'bcrypt'
import Ticket from '../tickets/entity';

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @MinLength(2)
  @IsString()
  @Column('text')
  username: string

  @MinLength(8)
  @IsString()
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

  @OneToMany(_ => Ticket, ticket => ticket.user)
  tickets: Ticket[]
}
