import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ToastProvider from '@/providers/toast-provider';
import ModalProvider from '@/providers/modal-provider';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pet adoption',
  description: 'Racyn Pet Adoption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} h-[200vh]`}>
          <Navbar />
          {children}
          <ModalProvider />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
