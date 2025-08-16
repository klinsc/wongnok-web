import Recipe from '@/components/Recipe'

export default async function RecipeDetailsPage({
  params,
}: {
  params: { recipeID: string }
}) {
  const { recipeID } = await params

  return <Recipe recipeID={recipeID} />
}
