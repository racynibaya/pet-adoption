'use client';
import { UserButton } from '@clerk/nextjs';
import Logo from './logo';
import MainNav from './main-nav';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const params = useParams();
  const [isLogin, setIsLogIn] = useState(false);

  useEffect(() => {
    if (params.userId) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, [params]);

  if (!isLogin) return null;

  return (
    <nav className='flex justify-between items-center px-2 h-[64px] bg-red-200'>
      <Logo />
      <div className='flex gap-2'>
        <UserButton afterSignOutUrl='/' />
        <MainNav />
      </div>
    </nav>
  );
};

export default Navbar;
