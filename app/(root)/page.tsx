import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = auth();

  const user = await currentUser();

  console.log('[USER]', user);

  if (!userId) {
    redirect('/sign-in');
  }

  return <div className={`bg-background  h-[calc(100vh-64px)]`}>Home</div>;
}
