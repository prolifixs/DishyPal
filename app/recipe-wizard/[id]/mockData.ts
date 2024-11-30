import { Recipe } from './types'

export const mockRecipe: Recipe = {
  steps: [
    {
      instruction: {
        text: "Begin by breaking 1 spaghetti into 2 sections.",
        hasPreset: false
      },
      media: {
        type: 'image',
        content: '/placeholder.svg'
      }
    },
    {
      instruction: {
        text: "Put the broken spaghetti in a pot.",
        hasPreset: true
      },
      media: {
        type: 'youtube',
        content: 'dQw4w9WgXcQ'
      }
    },
    {
      instruction: {
        text: "Fill the pot with cold water, enough to cover the spaghetti.",
        hasPreset: false
      },
      media: {
        type: 'image',
        content: '/placeholder.svg'
      }
    },
    // Add more steps as needed...
  ]
}

