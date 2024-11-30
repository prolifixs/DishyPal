"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, X } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

// Keep all interfaces
interface Timer {
  hours: string;
  minutes: string;
}

interface Preset {
  title: string;
  timers: Timer[];
  steps: string[];
}

export default function CreateRecipe() {
  // Keep all state and function definitions exactly the same
  const [ingredients, setIngredients] = useState([{ item: "", quantity: "", alternative: "" }])
  const [presets, setPresets] = useState<Preset[]>([{ title: "", timers: [{ hours: "0", minutes: "0" }], steps: [""] }])
  const [tasks, setTasks] = useState<{ steps: string[] }[]>([{ steps: [""] }])

  // Keep all the helper functions (addIngredient, removeIngredient, etc.)
  // ... all your existing functions stay the same ...

  const updateIngredient = (index: number, field: string, value: string) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value }
      }
      return ingredient
    })
    setIngredients(newIngredients)
  }

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index)
    setIngredients(newIngredients)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { item: "", quantity: "", alternative: "" }])
  }

  const updatePreset = (index: number, field: string, value: any) => {
    const newPresets = presets.map((preset, i) => {
      if (i === index) {
        return { ...preset, [field]: value }
      }
      return preset
    })
    setPresets(newPresets)
  }

  const updateTimer = (presetIndex: number, timerIndex: number, field: keyof Timer, value: string) => {
    const newPresets = [...presets]
    newPresets[presetIndex].timers[timerIndex][field] = value
    setPresets(newPresets)
  }

  const removeTimer = (presetIndex: number, timerIndex: number) => {
    const newPresets = [...presets]
    newPresets[presetIndex].timers = newPresets[presetIndex].timers.filter((_, i) => i !== timerIndex)
    setPresets(newPresets)
  }

  const updateStep = (presetIndex: number, stepIndex: number, value: string) => {
    const newPresets = [...presets]
    newPresets[presetIndex].steps[stepIndex] = value
    setPresets(newPresets)
  }

  const addTimer = (presetIndex: number) => {
    const newPresets = [...presets]
    newPresets[presetIndex].timers.push({ hours: "0", minutes: "0" })
    setPresets(newPresets)
  }

  const updateTaskStep = (taskIndex: number, stepIndex: number, value: string) => {
    const newTasks = [...tasks]
    newTasks[taskIndex].steps[stepIndex] = value
    setTasks(newTasks)
  }

  const addPreset = () => {
    setPresets([...presets, { title: "", timers: [{ hours: "0", minutes: "0" }], steps: [""] }])
  }

  const addStep = (presetIndex: number) => {
    const newPresets = [...presets]
    newPresets[presetIndex].steps.push("")
    setPresets(newPresets)
  }

  const removeStep = (presetIndex: number, stepIndex: number) => {
    const newPresets = [...presets]
    newPresets[presetIndex].steps = newPresets[presetIndex].steps.filter((_, i) => i !== stepIndex)
    setPresets(newPresets)
  }

  const removeTaskStep = (taskIndex: number, stepIndex: number) => {
    const newTasks = [...tasks]
    newTasks[taskIndex].steps = newTasks[taskIndex].steps.filter((_, i) => i !== stepIndex)
    setTasks(newTasks)
  }

  const addTaskStep = (taskIndex: number) => {
    const newTasks = [...tasks]
    newTasks[taskIndex].steps.push("")
    setTasks(newTasks)
  }

  const addTask = () => {
    setTasks([...tasks, { steps: [""] }])
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle>Create New Recipe</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <CardContent className="p-6">
            <div className="space-y-8">
              <form className="space-y-8">
                {/* Recipe Info section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Recipe Info</h2>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name of Recipe</Label>
                      <Input id="name" placeholder="Enter recipe name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Short Description</Label>
                      <Textarea id="description" placeholder="Brief description of the recipe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cuisine">Cuisine Type</Label>
                      <Select>
                        <SelectTrigger id="cuisine">
                          <SelectValue placeholder="Select cuisine type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="mexican">Mexican</SelectItem>
                          <SelectItem value="indian">Indian</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="african">African</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Recipe Details section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Recipe Details</h2>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="details">Detailed Instructions</Label>
                      <Textarea id="details" placeholder="Step-by-step recipe instructions" className="min-h-[200px]" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="trailer">Recipe Trailer</Label>
                      <div className="flex gap-4">
                        <Input id="trailer" type="url" placeholder="Enter video URL (YouTube, Instagram, TikTok, or Facebook)" className="flex-grow" />
                        <span className="text-sm self-center">or</span>
                        <Button type="button" variant="outline">Upload Video</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Paste links from YouTube, Instagram, TikTok, or Facebook, or upload your own video.</p>
                    </div>
                    <div className="space-y-4">
                      <Label>Ingredients</Label>
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <Input
                            placeholder="Item"
                            value={ingredient.item}
                            onChange={(e) => updateIngredient(index, "item", e.target.value)}
                          />
                          <Input
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                          />
                          <Input
                            placeholder="Alternative (optional)"
                            value={ingredient.alternative}
                            onChange={(e) => updateIngredient(index, "alternative", e.target.value)}
                          />
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addIngredient}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Ingredient
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Presets section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Presets</h2>
                  <Tabs defaultValue="presets">
                    <TabsList>
                      <TabsTrigger value="presets">Presets</TabsTrigger>
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="presets" className="space-y-4">
                      {presets.map((preset, presetIndex) => (
                        <Card key={presetIndex}>
                          <CardContent className="pt-6 space-y-4">
                            {/* Preset content */}
                            <div className="grid gap-2">
                              <Label htmlFor={`preset-title-${presetIndex}`}>Preset Title</Label>
                              <Input
                                id={`preset-title-${presetIndex}`}
                                placeholder="Enter preset title"
                                value={preset.title}
                                onChange={(e) => updatePreset(presetIndex, "title", e.target.value)}
                              />
                            </div>
                            {/* Timers */}
                            <div className="space-y-2">
                              <Label>Timers</Label>
                              {preset.timers.map((timer, timerIndex) => (
                                <div key={timerIndex} className="flex gap-2 items-center">
                                  <Input
                                    type="number"
                                    placeholder="Hours"
                                    value={timer.hours}
                                    onChange={(e) => updateTimer(presetIndex, timerIndex, "hours", e.target.value)}
                                    className="w-20"
                                    min="0"
                                  />
                                  <Input
                                    type="number"
                                    placeholder="Minutes"
                                    value={timer.minutes}
                                    onChange={(e) => updateTimer(presetIndex, timerIndex, "minutes", e.target.value)}
                                    className="w-20"
                                    min="0"
                                    max="59"
                                  />
                                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTimer(presetIndex, timerIndex)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button type="button" variant="outline" onClick={() => addTimer(presetIndex)}>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Timer
                              </Button>
                            </div>
                            {/* Steps */}
                            <div className="space-y-2">
                              <Label>Steps</Label>
                              {preset.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex gap-2 items-start">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                    {stepIndex + 1}
                                  </div>
                                  <Textarea
                                    placeholder={`Step ${stepIndex + 1}`}
                                    value={step}
                                    onChange={(e) => updateStep(presetIndex, stepIndex, e.target.value)}
                                    className="flex-grow"
                                  />
                                  <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(presetIndex, stepIndex)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button type="button" variant="outline" onClick={() => addStep(presetIndex)}>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Step
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button type="button" variant="outline" onClick={addPreset}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Preset
                      </Button>
                    </TabsContent>
                    <TabsContent value="tasks" className="space-y-4">
                      {/* Tasks content */}
                      {tasks.map((task, taskIndex) => (
                        <Card key={taskIndex}>
                          <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                              <Label>Steps</Label>
                              {task.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex gap-2 items-start">
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                    {stepIndex + 1}
                                  </div>
                                  <Textarea
                                    placeholder={`Step ${stepIndex + 1}`}
                                    value={step}
                                    onChange={(e) => updateTaskStep(taskIndex, stepIndex, e.target.value)}
                                    className="flex-grow"
                                  />
                                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTaskStep(taskIndex, stepIndex)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button type="button" variant="outline" onClick={() => addTaskStep(taskIndex)}>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add Step
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button type="button" variant="outline" onClick={addTask}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Meal Summary section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Meal Summary</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="prep-time">Prep Time</Label>
                      <div className="flex gap-2">
                        <Input id="prep-time-hours" type="number" min="0" placeholder="Hours" className="w-20" />
                        <Input id="prep-time-minutes" type="number" min="0" max="59" placeholder="Minutes" className="w-20" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cook-time">Cook Time</Label>
                      <div className="flex gap-2">
                        <Input id="cook-time-hours" type="number" min="0" placeholder="Hours" className="w-20" />
                        <Input id="cook-time-minutes" type="number" min="0" max="59" placeholder="Minutes" className="w-20" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="total-time">Total Cook Time</Label>
                      <div className="flex gap-2">
                        <Input id="total-time-hours" type="number" min="0" placeholder="Hours" className="w-20" />
                        <Input id="total-time-minutes" type="number" min="0" max="59" placeholder="Minutes" className="w-20" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="calories">Calories</Label>
                      <div className="flex items-center gap-2">
                        <Input id="calories" type="number" min="0" placeholder="Calories" />
                        <span className="text-sm text-muted-foreground">kcal/serving</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit">Create Recipe</Button>
              </form>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
} 