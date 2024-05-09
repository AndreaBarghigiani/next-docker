// Utils
import { auth, signOut } from '@/src/auth';
import { sendTestEmail } from '@/src/actions/email/test';

console.log(process.env.SENDGRID_API_KEY);
const SearchPage = async () => {
  const session = await auth();

  return (
    <div>
      <p>{JSON.stringify(session)}</p>

      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <button type='submit'>Sign out</button>
      </form>

      <form action={sendTestEmail}>
        <button type='submit'>Send test email</button>
      </form>
    </div>
  );
};

export default SearchPage;
