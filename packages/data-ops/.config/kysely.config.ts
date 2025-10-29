import { defineConfig } from 'kysely-ctl'
import { NeonDialect } from 'kysely-neon'
import { neon } from '@neondatabase/serverless'

const connectionString = `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?sslmode=require`

export default defineConfig({
	dialect: new NeonDialect({
		neon: neon(connectionString),
	}),
	migrations: {
		migrationFolder: '../src/kysely/migrations',
	},
	// plugins: [],
	// seeds: {
	//   seedFolder: "seeds",
	// }
})
