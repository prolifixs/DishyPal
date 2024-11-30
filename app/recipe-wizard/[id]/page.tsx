import RecipeWizardContent from '@/components/RecipeWizardContent'
import { mockRecipe } from './mockData'

export default function RecipeWizard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Wizard</h1>
      <RecipeWizardContent recipe={mockRecipe} />
    </div>
  )
}

