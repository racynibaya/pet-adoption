import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = auth();

  const user = await currentUser();

  console.log('[USER]', user);

  if (!userId) {
    redirect('/sign-in');
  }

  return <h1>Iyot</h1>;
}
