import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = auth();

  const user = await currentUser();

  if (!userId) {
    redirect('/sign-in');
  }

  if (userId) {
    redirect(`/${userId}/pets`);
  }

  return <div className={`bg-background  h-[calc(100vh-64px)]`}>Home</div>;
}
