"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Clipboard, Utensils, ShoppingCart, Bell, PenSquare, BookOpen, Clock, Calendar, Search, X, PlusCircle } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Timer {
  hours: string;
  minutes: string;
}

interface Preset {
  title: string;
  timers: Timer[];
  steps: string[];
}

export default function DashboardPage() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [postType, setPostType] = useState("post")
  const [isExpanded, setIsExpanded] = useState(false)
  const [openPresetModal, setOpenPresetModal] = useState(false)
  const [presetType, setPresetType] = useState('')
  const [preset, setPreset] = useState<Preset>({ 
    title: "", 
    timers: [{ hours: "0", minutes: "0" }], 
    steps: [""] 
  })
  const [presetNotifications, setPresetNotifications] = useState(true)
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState("")

  const handleNumberInput = (value: string, setter: (value: string) => void) => {
    const num = parseInt(value)
    if (isNaN(num) || num < 0) {
      setter('0')
    } else {
      setter(value)
    }
  }

  const isPresetValid = () => {
    const totalSeconds = (parseInt(preset.timers[0].minutes) || 0) * 60 + (parseInt(preset.timers[0].hours) || 0)
    return (
      presetType !== '' && 
      preset.title.trim() !== '' && 
      totalSeconds > 0
    )
  }

  const updateTimer = (timerIndex: number, field: keyof Timer, value: string) => {
    const newPreset = { ...preset }
    newPreset.timers[timerIndex][field] = value
    setPreset(newPreset)
  }

  const addTimer = () => {
    setPreset({
      ...preset,
      timers: [...preset.timers, { hours: "0", minutes: "0" }]
    })
  }

  const removeTimer = (timerIndex: number) => {
    const newPreset = { ...preset }
    newPreset.timers = newPreset.timers.filter((_, i) => i !== timerIndex)
    setPreset(newPreset)
  }

  const updateStep = (stepIndex: number, value: string) => {
    const newPreset = { ...preset }
    newPreset.steps[stepIndex] = value
    setPreset(newPreset)
  }

  const addStep = () => {
    setPreset({
      ...preset,
      steps: [...preset.steps, ""]
    })
  }

  const removeStep = (stepIndex: number) => {
    const newPreset = { ...preset }
    newPreset.steps = newPreset.steps.filter((_, i) => i !== stepIndex)
    setPreset(newPreset)
  }

  const handleCreatePreset = () => {
    console.log('Creating preset:', preset)
    setOpenPresetModal(false)
  }

  const handleStoryClick = (storyTitle: string) => {
    setSelectedStory(storyTitle)
    setIsStoryModalOpen(true)
  }

  return (
    <>
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className={`${isExpanded ? 'sm:max-w-[900px]' : 'sm:max-w-[525px]'} transition-all duration-200`}>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4">
            {/* Left Side - Post Creation */}
            <div className="flex-1 space-y-4">
              {/* User Info Section */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="User Profile" 
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <span className="font-medium">John Doe</span>
              </div>

              {/* Post Type Selector */}
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                onChange={(e) => {
                  setPostType(e.target.value);
                  setIsExpanded(false);
                }}
                value={postType}
              >
                <option value="post">Regular Post</option>
                <option value="mealplan">Meal Plan</option>
                <option value="recipe">Recipe</option>
              </select>

              {/* Post Content Area */}
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 resize-none"
                placeholder="What's cooking in your kitchen?"
              />

              {/* Meal Plan Fields */}
              {postType === "mealplan" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Breakfast</label>
                    <textarea
                      className="w-full min-h-[60px] rounded-md border border-input bg-background px-3 py-2 resize-none"
                      placeholder="What's for breakfast?"
                      onFocus={() => setIsExpanded(true)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Lunch</label>
                    <textarea
                      className="w-full min-h-[60px] rounded-md border border-input bg-background px-3 py-2 resize-none"
                      placeholder="What's for lunch?"
                      onFocus={() => setIsExpanded(true)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Dinner</label>
                    <textarea
                      className="w-full min-h-[60px] rounded-md border border-input bg-background px-3 py-2 resize-none"
                      placeholder="What's for dinner?"
                      onFocus={() => setIsExpanded(true)}
                    />
                  </div>
                </div>
              )}

              {/* Media Upload Section */}
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <img src="/icons/image.svg" alt="Upload" className="w-5 h-5" />
                  <span>Photo</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <img src="/icons/video.svg" alt="Video" className="w-5 h-5" />
                  <span>Video</span>
                </Button>
              </div>
            </div>

            {/* Right Side - Recipe Search */}
            {isExpanded && (
              <div className="w-[350px] border-l pl-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Search Recipes</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsExpanded(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 bg-muted/40 rounded-lg p-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      className="bg-transparent flex-1 outline-none text-sm"
                    />
                  </div>
                  {/* Example Recipe Cards */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-background rounded-lg p-2 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <img src="/placeholder.svg" alt="Recipe Author" className="w-10 h-10 rounded-full" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Overnight Oats</p>
                          <p className="text-xs text-muted-foreground">by Jane Smith</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Replate</Button>
                        <Button size="sm" variant="outline">Remix</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
              Cancel
            </Button>
            <Button>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-6">Welcome back, User!</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Meals</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 meals planned</div>
                <p className="text-xs text-muted-foreground">
                  Breakfast, Lunch, Dinner
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Grocery List</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 items</div>
                <p className="text-xs text-muted-foreground">
                  3 items expiring soon
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* New Action Panel */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => setIsCreatePostOpen(true)}
            >
              <PenSquare className="h-6 w-6" />
              <span>Create Post</span>
            </Button>
            <Link href="/create-recipe">
              <Button variant="outline" className="w-full flex flex-col items-center justify-center h-24 space-y-2">
                <BookOpen className="h-6 w-6" />
                <span>Create Recipe</span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => setOpenPresetModal(true)}
            >
              <Clock className="h-6 w-6" />
              <span>Create Preset</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Cook</span>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kitchen Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {/* Story 1 */}
                <div 
                  onClick={() => handleStoryClick("Meal Prep Sunday")}
                  className="flex-shrink-0 w-32 rounded-lg bg-muted p-3 cursor-pointer hover:bg-muted/80 transition"
                >
                  <div className="w-full h-32 rounded-md bg-accent mb-2"></div>
                  <p className="text-sm font-medium">Meal Prep Sunday</p>
                  <p className="text-xs text-muted-foreground">2h ago</p>
                </div>

                {/* Story 2 */}
                <div 
                  onClick={() => handleStoryClick("New Recipe Alert")}
                  className="flex-shrink-0 w-32 rounded-lg bg-muted p-3 cursor-pointer hover:bg-muted/80 transition"
                >
                  <div className="w-full h-32 rounded-md bg-accent mb-2"></div>
                  <p className="text-sm font-medium">New Recipe Alert</p>
                  <p className="text-xs text-muted-foreground">4h ago</p>
                </div>

                {/* Story 3 */}
                <div 
                  onClick={() => handleStoryClick("Dinner Plans")}
                  className="flex-shrink-0 w-32 rounded-lg bg-muted p-3 cursor-pointer hover:bg-muted/80 transition"
                >
                  <div className="w-full h-32 rounded-md bg-accent mb-2"></div>
                  <p className="text-sm font-medium">Dinner Plans</p>
                  <p className="text-xs text-muted-foreground">6h ago</p>
                </div>

                {/* Story 4 */}
                <div 
                  onClick={() => handleStoryClick("Grocery List")}
                  className="flex-shrink-0 w-32 rounded-lg bg-muted p-3 cursor-pointer hover:bg-muted/80 transition"
                >
                  <div className="w-full h-32 rounded-md bg-accent mb-2"></div>
                  <p className="text-sm font-medium">Grocery List</p>
                  <p className="text-xs text-muted-foreground">8h ago</p>
                </div>

                {/* Story 5 */}
                <div 
                  onClick={() => handleStoryClick("Kitchen Tips")}
                  className="flex-shrink-0 w-32 rounded-lg bg-muted p-3 cursor-pointer hover:bg-muted/80 transition"
                >
                  <div className="w-full h-32 rounded-md bg-accent mb-2"></div>
                  <p className="text-sm font-medium">Kitchen Tips</p>
                  <p className="text-xs text-muted-foreground">12h ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Recipe" className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium">Pasta Carbonara</h3>
                      <p className="text-sm text-muted-foreground">Italian cuisine</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Recipe" className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium">Chicken Stir Fry</h3>
                      <p className="text-sm text-muted-foreground">Asian cuisine</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Recipe" className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium">Greek Salad</h3>
                      <p className="text-sm text-muted-foreground">Mediterranean cuisine</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Trending Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Recipe" className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium">Avocado Toast</h3>
                      <p className="text-sm text-muted-foreground">Breakfast</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Recipe" className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium">Smoothie Bowl</h3>
                      <p className="text-sm text-muted-foreground">Healthy</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <img src="/placeholder.svg" alt="Recipe" className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium">Buddha Bowl</h3>
                      <p className="text-sm text-muted-foreground">Vegan</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={openPresetModal} onOpenChange={setOpenPresetModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a preset</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={presetType} onValueChange={setPresetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cook">Cook</SelectItem>
                  <SelectItem value="blend">Blend</SelectItem>
                  <SelectItem value="mince">Mince</SelectItem>
                  <SelectItem value="burner">Burner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Preset Title</Label>
              <Input
                placeholder="Enter preset title"
                value={preset.title}
                onChange={(e) => setPreset({ ...preset, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Timers</Label>
              {preset.timers.map((timer, timerIndex) => (
                <div key={timerIndex} className="flex gap-2 items-center">
                  <Input
                    type="number"
                    placeholder="Hours"
                    value={timer.hours}
                    onChange={(e) => updateTimer(timerIndex, "hours", e.target.value)}
                    className="w-20"
                    min="0"
                  />
                  <Input
                    type="number"
                    placeholder="Minutes"
                    value={timer.minutes}
                    onChange={(e) => updateTimer(timerIndex, "minutes", e.target.value)}
                    className="w-20"
                    min="0"
                    max="59"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTimer(timerIndex)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addTimer}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Timer
              </Button>
            </div>

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
                    onChange={(e) => updateStep(stepIndex, e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(stepIndex)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addStep}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={presetNotifications}
                onCheckedChange={setPresetNotifications}
              />
              <Label htmlFor="notifications">Enable Notifications</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenPresetModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePreset}>
              Create Preset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <div className="flex justify-between items-start">
            <DialogTitle>Remind me to prep this</DialogTitle>
            <div className="flex gap-2">
              <Bell className="h-5 w-5" />
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 py-4">
            {/* Steps Section */}
            <div>
              <h3 className="font-medium mb-4">Steps</h3>
              <div className="space-y-3">
                <p>1. Collect all necessary pots and pans</p>
                <p>2. Set up cutting board and knives</p>
                <p>3. Prepare mixing bowls</p>
                <p>4. Gather measuring cups and spoons</p>
                <p>5. Set up food processor or blender if needed</p>
                <p>6. Organize ingredients by order of use</p>
              </div>
            </div>

            {/* Media Section */}
            <div>
              <h3 className="font-medium mb-4">Media</h3>
              <div className="w-full h-[200px] bg-muted rounded-lg"></div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button variant="outline">Edit</Button>
              <Button onClick={() => setIsStoryModalOpen(false)}>OK</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

