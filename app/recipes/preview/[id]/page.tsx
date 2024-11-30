import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Utensils } from 'lucide-react'

const recipeData = {
  id: 1,
  title: "Spaghetti Carbonara",
  image: "/placeholder.svg",
  description: "A classic Italian pasta dish with a creamy egg-based sauce, pancetta, and pecorino cheese.",
  author: "Chef Mario",
  ingredients: [
    "400g spaghetti",
    "200g pancetta",
    "4 large eggs",
    "100g pecorino cheese",
    "100g parmesan",
    "Freshly ground black pepper",
  ],
  instructions: [
    "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
    "In a large pan, cook pancetta over medium heat until crispy, about 5 minutes.",
    "In a bowl, whisk together eggs, pecorino, parmesan, and a generous amount of black pepper.",
    "Drain pasta, reserving 1 cup of pasta water. Add pasta to the pan with pancetta.",
    "Remove pan from heat and quickly stir in the egg mixture, adding pasta water as needed to create a creamy sauce.",
    "Serve immediately with extra cheese and black pepper on top.",
  ],
  prepTime: "10 minutes",
  cookTime: "15 minutes",
  servings: 4,
}

export default function RecipePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{recipeData.title}</h1>
        <p className="text-muted-foreground">by {recipeData.author}</p>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prep Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipeData.prepTime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cook Time</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipeData.cookTime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipeData.servings}</div>
          </CardContent>
        </Card>
      </div>
      <img
        src={recipeData.image}
        alt={recipeData.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-lg mb-6">{recipeData.description}</p>
      <Tabs defaultValue="ingredients">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients">
          <ul className="list-disc list-inside space-y-2">
            {recipeData.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="instructions">
          <ol className="list-decimal list-inside space-y-2">
            {recipeData.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-between">
        <Button>Save Recipe</Button>
        <Button variant="outline">Share Recipe</Button>
      </div>
    </div>
  )
}

