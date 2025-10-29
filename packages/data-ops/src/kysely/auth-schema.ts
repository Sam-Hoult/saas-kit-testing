import type { ColumnType } from 'kysely';

// Kysely schema type definitions for auth tables

export interface AuthUserTable {
  id: string;
  name: string;
  email: string;
  email_verified: ColumnType<boolean, boolean | undefined, boolean>;
  image: string | null;
  created_at: ColumnType<Date, Date | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
}

export interface AuthSessionTable {
  id: string;
  expires_at: Date;
  token: string;
  created_at: ColumnType<Date, Date | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
  ip_address: string | null;
  user_agent: string | null;
  user_id: string;
}

export interface AuthAccountTable {
  id: string;
  account_id: string;
  provider_id: string;
  user_id: string;
  access_token: string | null;
  refresh_token: string | null;
  id_token: string | null;
  access_token_expires_at: Date | null;
  refresh_token_expires_at: Date | null;
  scope: string | null;
  password: string | null;
  created_at: ColumnType<Date, Date | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
}

export interface AuthVerificationTable {
  id: string;
  identifier: string;
  value: string;
  expires_at: Date;
  created_at: ColumnType<Date, Date | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, Date>;
}

// Database interface that combines all auth tables
export interface AuthDatabase {
  auth_user: AuthUserTable;
  auth_session: AuthSessionTable;
  auth_account: AuthAccountTable;
  auth_verification: AuthVerificationTable;
}
