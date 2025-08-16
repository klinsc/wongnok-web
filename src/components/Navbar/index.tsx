import Image from 'next/image'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className={'flex justify-between'}>
      <Image src='/DevPool68.png' width={182} height={49} alt='wongnok-logo' />
      <Button>เข้าระบบ</Button>
    </div>
  )
}

export default Navbar
