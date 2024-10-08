import { startOfHour, startOfMonth } from 'date-fns';
import { hash } from 'next-basics';
import { v4, v5 } from 'uuid';

export function secret() {
  return hash(process.env.APP_SECRET || process.env.VERCEL_POSTGRES_PRISMA_URL);
}

export function salt() {
  const ROTATING_SALT = hash(startOfMonth(new Date()).toUTCString());

  return hash(secret(), ROTATING_SALT);
}

export function visitSalt() {
  const ROTATING_SALT = hash(startOfHour(new Date()).toUTCString());

  return hash(secret(), ROTATING_SALT);
}

export function uuid(...args: any) {
  if (!args.length) return v4();

  return v5(hash(...args, salt()), v5.DNS);
}
