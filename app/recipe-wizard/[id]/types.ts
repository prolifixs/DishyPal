export type MediaType = 'image' | 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'upload'

export interface ImageContent {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface StepMedia {
  type: MediaType
  content: string | ImageContent
}

export interface Instruction {
  text: string
  hasPreset: boolean
}

export interface RecipeStep {
  instruction: Instruction
  media: StepMedia
}

export interface Recipe {
  steps: RecipeStep[]
}

export interface RecipeWizardProps {
  recipe: Recipe
}

export interface Preset {
  id: string
  type: 'timer'
  name: string
  time: string
  notifications: boolean
  isRunning: boolean
}

