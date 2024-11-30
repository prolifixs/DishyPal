"use client"

import { useState, useMemo } from 'react'
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type MediaType = 'image' | 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'upload'

interface StepMedia {
  type: MediaType
  content: string
}

export default function RecipeSteps() {
  const instructions = [
    "Begin by breaking 1 spaghetti into 2 sections.",
    "Put the broken spaghetti in a pot.",
    "Fill the pot with cold water, enough to cover the spaghetti.",
    "Add a pinch of salt to the water.",
    "Place the pot on the stove and turn the heat to high.",
    "Wait for the water to come to a boil.",
    "Once boiling, reduce heat to medium and let it simmer.",
    "Cook for about 8-10 minutes, stirring occasionally.",
    "Test the spaghetti for doneness by tasting a strand.",
    "Once cooked to your liking, drain the spaghetti in a colander."
  ]

  const [currentStep, setCurrentStep] = useState(0)

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentStep((prev) => (prev < instructions.length - 1 ? prev + 1 : prev))
  }

  const handleAddPreset = () => {
    console.log("Add preset clicked for step:", currentStep + 1)
  }

  const stepsWithPreset = useMemo(() => {
    return instructions.map(() => Math.random() < 0.5)
  }, [])

  const stepMedia: StepMedia[] = useMemo(() => {
    const mediaTypes: MediaType[] = ['image', 'youtube', 'instagram', 'tiktok', 'facebook', 'upload']
    return instructions.map(() => ({
      type: mediaTypes[Math.floor(Math.random() * mediaTypes.length)],
      content: 'placeholder'
    }))
  }, [])

  const renderMedia = (media: StepMedia) => {
    switch (media.type) {
      case 'image':
        return (
          <Image
            src="/placeholder.svg"
            alt={`Step ${currentStep + 1} illustration`}
            width={600}
            height={400}
            className="rounded-lg"
          />
        )
      case 'youtube':
        return (
          <div className="aspect-video">
            <iframe
              width="600"
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )
      case 'instagram':
        return (
          <div className="instagram-media-placeholder bg-gray-200 rounded-lg flex items-center justify-center h-[400px]">
            Instagram Post Placeholder
          </div>
        )
      case 'tiktok':
        return (
          <div className="tiktok-video-placeholder bg-gray-200 rounded-lg flex items-center justify-center h-[400px]">
            TikTok Video Placeholder
          </div>
        )
      case 'facebook':
        return (
          <div className="facebook-post-placeholder bg-gray-200 rounded-lg flex items-center justify-center h-[400px]">
            Facebook Post Placeholder
          </div>
        )
      case 'upload':
        return (
          <div className="upload-placeholder bg-gray-200 rounded-lg flex items-center justify-center h-[400px]">
            Uploaded File Placeholder
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-[600px] mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div className="w-full">
          <Progress value={(currentStep + 1) / instructions.length * 100} className="h-2" />
        </div>
        <div className="ml-4 text-sm font-medium">
          {currentStep + 1}/{instructions.length}
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        <div className="min-h-[80px]">
          <p className="text-lg mb-2">
            {instructions[currentStep]}
          </p>
          {stepsWithPreset[currentStep] && (
            <Button variant="secondary" size="sm" onClick={handleAddPreset} className="mt-2">
              Add preset
            </Button>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 0} className="w-[100px]">
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentStep === instructions.length - 1} className="w-[100px]">
            Next
          </Button>
        </div>
      </div>

      <div className="w-full h-[400px] bg-black rounded-lg overflow-hidden">
        {renderMedia(stepMedia[currentStep])}
      </div>
      
      <p className="text-sm text-muted-foreground text-center h-[20px]">
        {stepMedia[currentStep].type === 'image' ? 'Image illustration' :
         stepMedia[currentStep].type === 'youtube' ? 'YouTube video demonstration' :
         stepMedia[currentStep].type === 'instagram' ? 'Instagram post reference' :
         stepMedia[currentStep].type === 'tiktok' ? 'TikTok video guide' :
         stepMedia[currentStep].type === 'facebook' ? 'Facebook post tutorial' :
         'Uploaded file demonstration'}
      </p>

      <div className="flex justify-end gap-2 mt-4 h-[40px]">
        <Button variant="outline" className="w-[100px]">
          Modify
        </Button>
        <Button variant="destructive" className="w-[100px]">
          Abort
        </Button>
      </div>
    </div>
  )
}

