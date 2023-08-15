'use client';
import { UserButton } from '@clerk/nextjs';
import Logo from './logo';
import MainNav from './main-nav';

const Navbar = () => {
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
