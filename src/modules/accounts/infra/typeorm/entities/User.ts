import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

export const userTableName = 'users'

@Entity(userTableName)
export class User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Exclude()
  @Column()
  password: string

  @Column()
  isAdmin?: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
