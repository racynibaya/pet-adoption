import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  if (userId) {
    redirect(`/${userId}/pets`);
  }

  return null;
}
