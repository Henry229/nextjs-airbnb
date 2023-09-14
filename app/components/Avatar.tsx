import Image from 'next/image';
import React from 'react';

interface Props {
  src: string;
}

export default function Avatar() {
  return (
    <Image
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
      src={'/images/placeholder.jpg'}
    />
  );
}