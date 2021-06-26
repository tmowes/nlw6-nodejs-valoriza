import { userTableName } from '@modules/accounts/infra/typeorm/entities/User'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateUsers1624662812274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: userTableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false,
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(userTableName)
  }
}
