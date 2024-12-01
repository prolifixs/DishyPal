export interface Profile {
  id: string
  username: string
  avatar_url: string
  bio: string
  created_at: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  user_id: string
  created_at: string
  ingredients: Ingredient[]
  steps: Step[]
}

export interface Ingredient {
  id: string
  recipe_id: string
  name: string
  quantity: string
  unit: string
}

export interface Step {
  id: string
  recipe_id: string
  instruction: string
  order: number
} 