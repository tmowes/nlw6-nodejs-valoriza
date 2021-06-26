import { userTableName } from '@modules/accounts/infra/typeorm/entities/User'
import { complimentTableName } from '@modules/tags/infra/typeorm/entities/Compliment'
import { tagTableName } from '@modules/tags/infra/typeorm/entities/Tag'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateCompliments1624713847483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: complimentTableName,
        columns: [
          idColumn,
          {
            name: 'user_sender',
            type: 'uuid',
          },
          {
            name: 'user_receiver',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
          {
            name: 'message',
            type: 'varchar',
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: `FK${userTableName}Sender${complimentTableName}`,
            referencedTableName: userTableName,
            referencedColumnNames: ['id'],
            columnNames: ['user_sender'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: `FK${userTableName}Receiver${complimentTableName}`,
            referencedTableName: userTableName,
            referencedColumnNames: ['id'],
            columnNames: ['user_receiver'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: `FK${tagTableName}${complimentTableName}`,
            referencedTableName: tagTableName,
            referencedColumnNames: ['id'],
            columnNames: ['tag_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(complimentTableName)
  }
}
