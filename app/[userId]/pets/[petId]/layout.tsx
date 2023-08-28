import ToastProvider from '@/providers/toast-provider';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export default function PetLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }
  return <div>{children}</div>;
}
