import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Navbar from '@/components/navbar';

export default async function Home() {
  const { userId } = auth();

  const user = await currentUser();

  console.log('[USER]', user);

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <>
      <Navbar />
    </>
  );
}
