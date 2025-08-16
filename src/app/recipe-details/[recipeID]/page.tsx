export default function RecipeDetailsPage({
  params,
}: {
  params: { recipeID: string }
}) {
  return (
    <div>
      <h1>Recipe Details for ID: {params.recipeID}</h1>
      {/* Additional details can be fetched and displayed here */}
    </div>
  )
}
