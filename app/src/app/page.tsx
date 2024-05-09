import { auth } from '@/src/auth';
import { Button } from '@/comp/ui/button';
import db from '@/src/drizzle';
import { eq } from 'drizzle-orm';
import { TestTable } from '@/src/drizzle/schema';

// Components
import Link from 'next/link';

import { buttonVariants } from '@/comp/ui/button';

export default async function Home() {
  const session = await auth();
  console.log('session:', session);
  // await db
  //   .delete(test)
  //   .where(eq(test.id, 'd66c5e26-732b-4fb0-8d5a-fcd132035b8f'));
  // await db.insert(TestTable).values({ name: 'andreatest' });
  // const testdata = await db.select().from(TestTable);
  // console.log('testdata:', testdata);
  return (
    <div className='flex justify-between gap-x-4'>
      <Link
        href='/auth/login'
        className={buttonVariants({ variant: 'default' })}
      >
        Login
      </Link>

      <Link
        href='/auth/register'
        className={buttonVariants({ variant: 'outline' })}
      >
        Register
      </Link>
    </div>
  );
}
