'use client';

import { User } from '@prisma/client';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import ClientOnly from '../ClientOnly';

interface NavbarProps {
  currentUser?: User | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm '>
      <div className='py-4 border-b-[1px]'>
        <ClientOnly>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </ClientOnly>
      </div>
    </div>
  );
}
