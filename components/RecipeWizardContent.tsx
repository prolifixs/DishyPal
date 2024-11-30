"use client"

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import RecipeWizardLeftMenu from './RecipeWizardLeftMenu'
import type { 
  Instruction, 
  MediaType, 
  StepMedia, 
  Preset,
  RecipeWizardProps 
} from '@/app/recipe-wizard/[id]/types'

const RecipeWizardContent: React.FC<RecipeWizardProps> = ({ recipe }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [presets, setPresets] = useState<Preset[]>([])

    const instructions = useMemo<Instruction[]>(() => 
      recipe.steps.map(step => step.instruction)
    , [recipe]);

    const stepMedia = useMemo<StepMedia[]>(() => 
      recipe.steps.map(step => step.media)
    , [recipe]);

    const handlePrev = () => {
      setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleNext = () => {
      setCurrentStep((prev) => (prev < instructions.length - 1 ? prev + 1 : prev))
    }

    const handleAddPreset = () => {
      const newPreset: Preset = {
        id: Math.random().toString(36).substring(7),
        type: 'timer',
        name: `Step ${currentStep + 1} Timer`,
        time: `${Math.floor(Math.random() * 30) + 1}:00`,
        notifications: true,
        isRunning: false
      }
      setPresets(prev => [...prev, newPreset])
    }

    const shouldShowPreset = useMemo(() => {
        return instructions[currentStep]?.hasPreset ?? false;
    }, [instructions, currentStep]);

    const renderMedia = (media: StepMedia) => {
      switch (media.type) {
        case 'image':
          const imageContent = typeof media.content === 'string' 
            ? { url: media.content, alt: `Step ${currentStep + 1} illustration` }
            : media.content;
            
          return (
            <Image
              src={imageContent.url || "/placeholder.svg"}
              alt={imageContent.alt || `Step ${currentStep + 1} illustration`}
              width={imageContent.width || 600}
              height={imageContent.height || 400}
              className="rounded-lg"
            />
          )
        case 'youtube':
          return (
            <div className="aspect-video">
              <iframe
                width="600"
                height="400"
                src={`https://www.youtube.com/embed/${media.content}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          )
        default:
          return (
            <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
              Placeholder for {media.type} content: {typeof media.content === 'string' ? media.content : JSON.stringify(media.content)}
            </div>
          )
      }
    }

    const isPresetExistsForCurrentStep = useMemo(() => {
      return presets.some(preset => preset.name === `Step ${currentStep + 1} Timer`);
    }, [presets, currentStep]);

    return (
      <div className="flex space-x-4 p-4 h-screen">
        <RecipeWizardLeftMenu presets={presets} onPresetsChange={setPresets} />
        
        <div className="flex-1 space-y-4">
          <Progress value={(currentStep / (instructions.length - 1)) * 100} className="w-full" />

          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {instructions.length}
          </p>
          <h2 className="text-xl font-semibold mb-4">
            {instructions[currentStep].text}
          </h2>

          <div className="flex space-x-4 h-10">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="w-[100px]"
              size="sm"
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={handleNext}
              disabled={currentStep === instructions.length - 1}
              className="w-[100px]"
              size="sm"
            >
              Next
            </Button>
            {shouldShowPreset && !isPresetExistsForCurrentStep && (
              <Button
                variant="default"
                onClick={handleAddPreset}
                className="ml-auto"
                size="sm"
              >
                Use Preset
              </Button>
            )}
          </div>

          <div className="w-full h-[400px] bg-black rounded-lg overflow-hidden">
            {renderMedia(stepMedia[currentStep])}
          </div>

          <div className="text-sm text-center h-5 text-muted-foreground">
            {currentStep === instructions.length - 1 ? (
              <div className="flex justify-center space-x-4">
                <Button variant="default" size="sm">
                  Share Recipe
                </Button>
                <Button variant="outline" size="sm">
                  Return Home
                </Button>
              </div>
            ) : (
              stepMedia[currentStep].type === 'image' ? 'Image illustration' :
              stepMedia[currentStep].type === 'youtube' ? 'YouTube video demonstration' :
              stepMedia[currentStep].type === 'instagram' ? 'Instagram post reference' :
              stepMedia[currentStep].type === 'tiktok' ? 'TikTok video guide' :
              stepMedia[currentStep].type === 'facebook' ? 'Facebook post tutorial' :
              'Uploaded file demonstration'
            )}
          </div>

          {currentStep !== instructions.length - 1 && (
            <div className="flex justify-end space-x-4 h-10">
              <Button variant="outline" className="w-[100px]">
                Modify
              </Button>
              <Button variant="destructive" className="w-[100px]">
                Abort
              </Button>
            </div>
          )}
        </div>
      </div>
    )
}

export default RecipeWizardContent

