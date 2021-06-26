import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

export const tagTableName = 'tags'

@Entity(tagTableName)
export class Tag {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'customName' })
  custonName(): string {
    return `#${this.name}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
