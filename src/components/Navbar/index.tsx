'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <div className={'flex justify-between items-center shadow-md h-16 pr-6'}>
      <Image src='/DevPool68.png' width={182} height={49} alt='wongnok-logo' />
      {session ? (
        <div className='flex items-center gap-4'>
          <span className='text-sm'>{session.user?.name}</span>
          <Button variant='outline' onClick={() => signOut()}>
            ออกจากระบบ
          </Button>
        </div>
      ) : (
        <Button onClick={() => signIn('keycloak')}>เข้าระบบ</Button>
      )}
    </div>
  )
}

export default Navbar
