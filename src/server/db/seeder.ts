import { hashSync } from 'bcryptjs';
import { users } from './schema'; // Import your users table schema
import { eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type * as schema from './schema';
import { env } from '@ln-foot/env';

async function seedAdmin(db: PostgresJsDatabase<typeof schema>): Promise<void> {
  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;

  // Check if admin already exists
  const existingAdmin = await db.query.users.findFirst({
    where: eq(users.email, adminEmail),
  });

  if (!existingAdmin) {
    // Hash the password
    const hashedPassword = hashSync(adminPassword, 10);

    // Insert the admin user
    await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin', // Assuming you have a role field
    });

    console.log('Admin account seeded successfully.');
  } else {
    console.log('Admin account already exists.');
  }
}

export { seedAdmin };