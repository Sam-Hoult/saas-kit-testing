import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Create auth_user table
  await db.schema
    .createTable('auth_user')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('email_verified', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('image', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  // Create auth_session table
  await db.schema
    .createTable('auth_session')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('token', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('ip_address', 'text')
    .addColumn('user_agent', 'text')
    .addColumn('user_id', 'varchar(36)', (col) =>
      col.notNull().references('auth_user.id').onDelete('cascade')
    )
    .execute();

  // Create auth_account table
  await db.schema
    .createTable('auth_account')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('account_id', 'text', (col) => col.notNull())
    .addColumn('provider_id', 'text', (col) => col.notNull())
    .addColumn('user_id', 'varchar(36)', (col) =>
      col.notNull().references('auth_user.id').onDelete('cascade')
    )
    .addColumn('access_token', 'text')
    .addColumn('refresh_token', 'text')
    .addColumn('id_token', 'text')
    .addColumn('access_token_expires_at', 'timestamp')
    .addColumn('refresh_token_expires_at', 'timestamp')
    .addColumn('scope', 'text')
    .addColumn('password', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();

  // Create auth_verification table
  await db.schema
    .createTable('auth_verification')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('identifier', 'text', (col) => col.notNull())
    .addColumn('value', 'text', (col) => col.notNull())
    .addColumn('expires_at', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('auth_verification').ifExists().execute();
  await db.schema.dropTable('auth_account').ifExists().execute();
  await db.schema.dropTable('auth_session').ifExists().execute();
  await db.schema.dropTable('auth_user').ifExists().execute();
}
