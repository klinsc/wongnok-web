import Recipes from '@/components/Recipes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main>
        <Recipes />
      </main>
      <footer></footer>
    </>
  )
}
