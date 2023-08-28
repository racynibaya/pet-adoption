'use client';

import { Star, SmilePlus } from 'lucide-react';

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
import { useRouter } from 'next/navigation';

const MainNav = () => {
  const isMenuOpen = useMenu(state => state.isOpen);
  const onOpen = useMenu(state => state.onOpen);

  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify className='outline-0' size={26} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-4'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='gap-2 cursor-pointer items-center'
            onClick={() => router.push('/favorites')}
          >
            <Star className='h-4 w-4 text-slate-600' />
            <span>Favorites</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='gap-2 cursor-pointer items-center'
            onClick={() => router.push('/adopt')}
          >
            <SmilePlus className='h-4 w-4 text-slate-600' />
            Adopt now
          </DropdownMenuItem>

          <DropdownMenuItem></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainNav;
