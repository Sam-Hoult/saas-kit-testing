// Example queries converted to Kysely syntax
// Uncomment and adapt when you add subscription schema to your database

// import { getDb } from "@/database/setup";

// export async function updateSubscription(data: {
//   userId: string;
//   status: string;
//   subscriptionId: string;
//   currentPeriodStart?: string;
//   currentPeriodEnd?: string;
//   cancelAtPeriodEnd: boolean;
//   startedAt?: string;
//   productId: string;
// }) {
//   const db = getDb();
//
//   // Kysely upsert using onConflict
//   await db
//     .insertInto('subscriptions')
//     .values({
//       user_id: data.userId,
//       status: data.status,
//       subscription_id: data.subscriptionId,
//       current_period_start: data.currentPeriodStart,
//       current_period_end: data.currentPeriodEnd,
//       cancel_at_period_end: data.cancelAtPeriodEnd,
//       started_at: data.startedAt,
//       product_id: data.productId,
//     })
//     .onConflict((oc) => oc
//       .column('user_id')
//       .doUpdateSet({
//         status: data.status,
//         subscription_id: data.subscriptionId,
//         current_period_start: data.currentPeriodStart,
//         current_period_end: data.currentPeriodEnd,
//         cancel_at_period_end: data.cancelAtPeriodEnd,
//         started_at: data.startedAt,
//         product_id: data.productId,
//       })
//     )
//     .execute();
// }

// export async function getSubscription(userId: string) {
//   const db = getDb();
//
//   // Kysely select with where clause
//   const subscription = await db
//     .selectFrom('subscriptions')
//     .selectAll()
//     .where('user_id', '=', userId)
//     .executeTakeFirst();
//
//   return subscription;
// }

export {};
