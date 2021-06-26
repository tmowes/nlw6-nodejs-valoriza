import { tagTableName } from '@modules/tags/infra/typeorm/entities/Tag'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { idColumn, timestampColumns } from './utils'

export class CreateTags1624710399425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tagTableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          ...timestampColumns,
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tagTableName)
  }
}
