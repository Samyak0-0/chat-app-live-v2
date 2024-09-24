import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { useMemo } from 'react';


export const Svgfunc = ({ seed, online }) => {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: seed,
    }).toDataUriSync();
  }, []);

  return (
    <div className='relative h-[15vh]'>
      <img src={avatar} alt="Avatar" className=' h-full'/>
      <div className={ online? ' w-4 aspect-square rounded-full bg-green-500 border-2 border-gray-200 absolute right-2 bottom-0' : ' w-4 aspect-square rounded-full bg-gray-500 border-2 border-gray-200 absolute right-2 bottom-0'}></div>
    </div>
  );
}
