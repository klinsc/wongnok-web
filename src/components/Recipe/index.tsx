'use client'

import { Badge } from '@/components/ui/badge'
import { Recipe } from '@/services/recipe-service'
import { useCallback, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function RecipeDetailsPage({ recipeID }: { recipeID: string }) {
  // state: recipe details
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null)

  const getRecipeDetails = useCallback(async (recipeID: string) => {
    try {
      const response = await fetch(`http://localhost:5000/recipes/${recipeID}`)
      if (!response.ok) {
        throw new Error(`Error fetching recipe details: ${response.statusText}`)
      }
      const recipeDetails = await response.json()
      console.log(recipeDetails)

      setRecipeDetails(recipeDetails)
    } catch (error) {
      console.error('Failed to fetch recipe details:', error)
    }
  }, [])

  useEffect(() => {
    if (!recipeID) {
      console.error('Recipe ID is required')
      return
    }

    getRecipeDetails(recipeID)
  }, [getRecipeDetails, recipeID])

  return (
    <div className='flex flex-col justify-start'>
      {/* Title */}
      <div className='flex justify-start pt-6 pb-8 text-4xl font-bold'>
        <h1>{recipeDetails?.name}</h1>
        <Badge className='ml-4'>{recipeDetails?.difficulty.name}</Badge>
      </div>

      {/* Description */}
      <div className='text-secondary line-clamp-3' style={{ color: '#333333' }}>
        {recipeDetails?.description}
        {/* Updated at */}
        <p
          className='text-sm text-secondary'
          style={{
            color: '#6b7280',
          }}
        >
          อัพเดตเมื่อ:{' '}
          {new Date(recipeDetails?.updatedAt ?? '').toLocaleDateString()}
        </p>
      </div>

      {/* Chef Avatar */}
      <div className='flex items-center mt-4'>
        <Avatar>
          <AvatarImage
            src={recipeDetails?.user.firstName || ''}
            alt={`${recipeDetails?.user.firstName} ${recipeDetails?.user.lastName}`}
          />
          <AvatarFallback>{recipeDetails?.user.firstName}</AvatarFallback>
        </Avatar>
        {/* <span className='ml-2 text-sm'>
          {recipeDetails?.user.firstName} {recipeDetails?.user.lastName}
        </span> */}
      </div>

      {/* 2 columns of Image and Ingredients */}
      <div className='grid grid-cols-2 gap-4 mt-6'>
        <div>
          <img
            src={recipeDetails?.imageUrl}
            alt={`${recipeDetails?.name} image`}
            className='w-full h-auto object-cover'
          />
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>ส่วนผสม</h2>
          <p>{recipeDetails?.ingredient}</p>
        </div>
      </div>
    </div>
  )
}
