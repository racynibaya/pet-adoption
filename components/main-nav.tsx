'use client';
import { UserButton } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useMenu } from '@/hooks/menu-open';
import { AlignJustify } from 'lucide-react';

const MainNav = () => {
  const isMenuOpen = useMenu(state => state.isOpen);
  const onOpen = useMenu(state => state.onOpen);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify className='outline-0' size={26} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-4'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>

          <DropdownMenuItem>Subscription</DropdownMenuItem>

          <DropdownMenuItem></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainNav;
