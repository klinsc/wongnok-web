//card recipe
'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type User = {
  id: string
  firstName: string
  lastName: string
}

type CardRecipeProps = {
  id: string
  name: string
  imageUrl: string
  description: string
  cookingDuration: {
    id: number
    name: string
  }
  difficulty: {
    id: number
    name: string
  }
  user: User
}

const CardRecipe = ({
  name,
  imageUrl,
  description,
  difficulty,
  cookingDuration,
  user,
}: CardRecipeProps) => (
  <Card className='w-[276px] h-[390px]'>
    <div>
      <div className='h-[158px] relative rounded-t-lg pb-4'>
        <Image src={imageUrl} alt={`${name} image`} fill objectFit='cover' />
      </div>
      <div>
        <CardContent>
          <h1 className='font-bold'>{name}</h1>
          <p className='text-secondary line-clamp-3'>{description}</p>
        </CardContent>
      </div>
    </div>

    <div>
      <CardFooter>
        <div className='flex w-full item-center'>
          <div className='flex p-1 grow'>
            <img src='/icons/av_timer.svg' alt='av timer' />
            <p>{difficulty.name}</p>
          </div>
          <div className='flex p-1 grow'>
            <img src='/icons/level.svg' alt='level' />
            <p>{cookingDuration.name}</p>
          </div>
        </div>
        <div>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>{user.firstName}</AvatarFallback>
          </Avatar>
        </div>
      </CardFooter>
    </div>
  </Card>
)

const fetchRecipes = async (): Promise<CardRecipeProps[]> => {
  const recipesFetch = await fetch('http://localhost:5000/recipes')
  return await recipesFetch.json()
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<CardRecipeProps[]>([])

  useEffect(() => {
    ;(async () => {
      const recipesFetch = await fetchRecipes()
      setRecipes(recipesFetch)
    })()
  }, [])

  return (
    <div>
      <h1 className='pt-6 pb-8 text-4xl font-bold'>สูตรอาหารทั้งหมด</h1>
      <div className='flex flex-wrap gap-8'>
        {recipes.map((recipe) => {
          return (
            <Link key={recipe.id} href={`recipe-details/${recipe.id}`}>
              <CardRecipe key={recipe.id} {...recipe} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
