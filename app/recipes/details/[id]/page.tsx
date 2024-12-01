"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowLeft, Bookmark, Heart, MessageCircle, Share2, PlusCircle, ChefHat, Bell, Calendar, BellOff, Pencil, ShoppingCart } from 'lucide-react'
import { Timer, Users, BarChart3, Flame, Clock, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"


interface Ingredient {
  name: string;
  amount: string;
  calories: string;
  isAllergic: boolean;
  useAlternative: boolean;
  availability: number;
  alternative?: {
    name: string;
    amount: string;
    calories: string;
  };
}

interface PrepTask {
  id: number;
  title: string;
  content: string;
  steps: string[];
}

const presets: PrepTask[] = [
  { 
    id: 1, 
    title: "Mise en place 1", 
    content: "Prepare ingredients for recipe 1",
    steps: [
      "Gather all ingredients",
      "Chop vegetables",
      "Measure spices",
      "Prepare cooking utensils",
      "Preheat oven if needed",
      "Set up workstation"
    ]
  },
  { 
    id: 2, 
    title: "Mise en place 2", 
    content: "Organize kitchen tools for recipe 2",
    steps: [
      "Collect all necessary pots and pans",
      "Set up cutting board and knives",
      "Prepare mixing bowls",
      "Gather measuring cups and spoons",
      "Set up food processor or blender if needed",
      "Organize ingredients by order of use"
    ]
  },
  { 
    id: 3, 
    title: "Mise en place 3", 
    content: "Set up workstation for recipe 3",
    steps: [
      "Clear and clean countertop",
      "Arrange ingredients in order of use",
      "Set up waste bowl for scraps",
      "Prepare ice bath if needed",
      "Set up thermometer or timer",
      "Review recipe one last time"
    ]
  },
]

const tasks: PrepTask[] = [
  { 
    id: 1, 
    title: "Task 1", 
    content: "Complete cooking step 1",
    steps: [
      "Heat pan over medium heat",
      "Add oil to the pan",
      "Chop onions finely",
      "Sauté onions until translucent",
      "Add minced garlic",
      "Cook for another minute"
    ]
  },
  { 
    id: 2, 
    title: "Task 2", 
    content: "Finish cooking step 2",
    steps: [
      "Add diced vegetables to the pan",
      "Stir and cook for 5 minutes",
      "Season with salt and pepper",
      "Pour in broth or water",
      "Bring to a simmer",
      "Cover and cook for 15 minutes"
    ]
  },
  { 
    id: 3, 
    title: "Task 3", 
    content: "Plate and garnish the dish",
    steps: [
      "Remove pan from heat",
      "Taste and adjust seasoning",
      "Prepare serving plates",
      "Portion the dish onto plates",
      "Add fresh herbs for garnish",
      "Serve immediately"
    ]
  },
]

export default function RecipePage({ params }: { params: { id: string } }) {
  const [servings, setServings] = useState("1")
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { 
      name: "Macaroni", 
      amount: "8 oz", 
      calories: "300 kcal", 
      isAllergic: false, 
      useAlternative: false, 
      availability: 95,
      alternative: {
        name: "Gluten-free pasta",
        amount: "8 oz",
        calories: "280 kcal"
      }
    },
    { 
      name: "Cheddar Cheese", 
      amount: "2 cups", 
      calories: "450 kcal", 
      isAllergic: false, 
      useAlternative: false, 
      availability: 80,
      alternative: {
        name: "Vegan cheese",
        amount: "2 cups",
        calories: "360 kcal"
      }
    },
    { 
      name: "Milk", 
      amount: "1 cup", 
      calories: "120 kcal", 
      isAllergic: false, 
      useAlternative: false, 
      availability: 20,
      alternative: {
        name: "Almond milk",
        amount: "1 cup",
        calories: "30 kcal"
      }
    },
  ])
  const [isMuted, setIsMuted] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleAllergyChange = (index: number, isAllergic: boolean, useAlternative: boolean) => {
    setIngredients(prevIngredients => 
      prevIngredients.map((ingredient, i) => 
        i === index 
          ? { ...ingredient, isAllergic, useAlternative }
          : ingredient
      )
    )
  }

  const handleAddToGrocery = (ingredient: Ingredient) => {
    console.log(`Added ${ingredient.name} to grocery list`)
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col items-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Section 1: Recipe Overview */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-48 h-48 flex-shrink-0">
                    <Image
                      src="/placeholder.svg"
                      alt="Mac and Cheese"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm">
                      English British
                    </Badge>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold">Mac & Cheese</h1>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back to recipes</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Back to recipes</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Share recipe</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Share recipe</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Like recipe</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Like recipe</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Bookmark className="h-4 w-4" />
                                <span className="sr-only">Save recipe</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Save recipe</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={toggleComments}>
                                <MessageCircle className="h-4 w-4" />
                                <span className="sr-only">Comments</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>26 Comments</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      A creamy and delicious classic mac and cheese recipe thats perfect for any occasion.
                      Made with a blend of premium cheeses and topped with a crispy breadcrumb crust.
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                      <Link href="#">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Recipe
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Section 2: Author Information */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="author">
                  <AccordionTrigger className="text-xl font-semibold">
                    From the Author
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-start gap-4 p-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm text-muted-foreground">Food Enthusiast</p>
                        <p className="text-sm">
                          I have been cooking this recipe for over 10 years. It started as a family
                          tradition and has evolved into what it is today. I hope you enjoy making it
                          as much as I do!
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Section 3: Ingredients Table */}
              <div>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h2 className="text-xl font-semibold">Recipe</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">per servings:</span>
                    <Select value={servings} onValueChange={setServings}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select servings" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} serving{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Item</TableHead>
                      <TableHead>Amt/Qty</TableHead>
                      <TableHead>Calorie</TableHead>
                      <TableHead className="text-center">Allergy</TableHead>
                      <TableHead>Availability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredients.map((ingredient, index) => (
                      <TableRow key={index} className={ingredient.isAllergic ? "opacity-50" : ""}>
                        <TableCell className="font-medium">{ingredient.name}</TableCell>
                        <TableCell>{ingredient.amount}</TableCell>
                        <TableCell>{ingredient.calories}</TableCell>
                        <TableCell className="text-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Checkbox
                                id={`allergy-${index}`}
                                checked={ingredient.isAllergic || ingredient.useAlternative}
                                onCheckedChange={(checked) => {
                                  if (!checked) {
                                    handleAllergyChange(index, false, false)
                                  }
                                }}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="grid gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Allergy Options</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Choose how you want to handle this ingredient.
                                  </p>
                                </div>
                                <div className="grid gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => handleAllergyChange(index, true, false)}
                                  >
                                    Allergic
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleAllergyChange(index, false, true)}
                                  >
                                    Use Alternative
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                          <label htmlFor={`allergy-${index}`} className="sr-only">{ingredient.name} allergy</label>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col items-start">
                            <div className="flex items-center w-full mb-1">
                              <span className="mr-2 text-sm">{ingredient.availability >= 50 ? "Available" : "Low"}</span>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    ingredient.availability >= 50 ? "bg-green-600" : "bg-yellow-400"
                                  }`}
                                  style={{ width: `${ingredient.availability}%` }}
                                ></div>
                              </div>
                            </div>
                            {ingredient.availability < 50 && (
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleAddToGrocery(ingredient)}
                              >
                                <ShoppingCart className="h-3 w-3" />
                                <span className="sr-only">Add to grocery</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Section 4: Alternatives */}
              {ingredients.some(ingredient => ingredient.useAlternative) && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Alternatives</h2>
                  <ul className="space-y-2">
                    {ingredients.filter(ingredient => ingredient.useAlternative).map((ingredient, index) => (
                      <li key={index} className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium">{ingredient.name} Alternative:</h3>
                        <p>Use {ingredient.alternative?.name} instead.</p>
                        <p>Amount: {ingredient.alternative?.amount}</p>
                        <p>Calories: {ingredient.alternative?.calories}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section 5: Prep and Tasks */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Prep and Tasks</h2>
                <Tabs defaultValue="presets" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="presets">Presets</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  </TabsList>
                  <TabsContent value="presets">
                    <div className="flex w-max space-x-4 p-4">
                      {presets.map((preset) => (
                        <Dialog key={preset.id}>
                          <DialogTrigger asChild>
                            <Card className="w-[200px] cursor-pointer hover:bg-accent transition-colors">
                              <CardContent className="p-0">
                                <div className="relative w-full aspect-video">
                                  <Image
                                    src="/placeholder.svg"
                                    alt={preset.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                  />
                                </div>
                                <div className="p-4">
                                  <h4 className="font-semibold text-sm mb-1">Remind me to prep this</h4>
                                  <p className="text-xs text-muted-foreground">{preset.content}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader className="flex flex-row items-center justify-between">
                              <DialogTitle>{preset.title === "Mise en place 2" ? "Remind me to prep this" : preset.title}</DialogTitle>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                                  {isMuted ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Calendar className="h-5 w-5" />
                                </Button>
                              </div>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div className="grid gap-2">
                                <h3 className="text-lg font-semibold">Steps</h3>
                                <div className="h-[300px] w-full rounded-md border p-4 overflow-y-auto">
                                  <ul className="list-decimal pl-5 space-y-2">
                                    {preset.steps.map((step, index) => (
                                      <li key={index}>{step}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <h3 className="text-lg font-semibold">Media</h3>
                                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                                  <Image
                                    src="/placeholder.svg"
                                    alt="Preset visual guide"
                                    width={640}
                                    height={360}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <Button className="w-full">OK</Button>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="tasks">
                    <div className="flex w-max space-x-4 p-4">
                      {tasks.map((task) => (
                        <Dialog key={task.id}>
                          <DialogTrigger asChild>
                            <Card className="w-[200px] cursor-pointer hover:bg-accent transition-colors">
                              <CardContent className="p-0">
                                <div className="relative w-full aspect-video">
                                  <Image
                                    src="/placeholder.svg"
                                    alt={task.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                  />
                                </div>
                                <div className="p-4">
                                  <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                                  <p className="text-xs text-muted-foreground">{task.content}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader className="flex flex-row items-center justify-between">
                              <DialogTitle>{task.title}</DialogTitle>
                              <div className="flex space-x-2">
                                <Bell className="h-5 w-5" />
                                <Calendar className="h-5 w-5" />
                              </div>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div className="grid gap-2">
                                <h3 className="text-lg font-semibold">Steps</h3>
                                <div className="h-[300px] w-full rounded-md border p-4 overflow-y-auto">
                                  <ul className="list-decimal pl-5 space-y-2">
                                    {task.steps.map((step, index) => (
                                      <li key={index}>{step}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <h3 className="text-lg font-semibold">Media</h3>
                                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                                  <Image
                                    src="/placeholder.svg"
                                    alt="Task visual guide"
                                    width={640}
                                    height={360}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <Button className="w-full">OK</Button>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-center space-x-4 mt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-48">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add to Kitchenboard
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add to Kitchenboard</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p>Are you sure you want to add this recipe to your kitchenboard?</p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>OK</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Link href={`/recipe-wizard/${params.id}`}>
                    <Button>Begin Cooking</Button>
                  </Link>
                </div>

                {/* Recipe Features */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Recipe Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="flex items-center space-x-4 p-4">
                      <Clock className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Prep Time</p>
                        <p className="font-medium">30 mins</p>
                      </div>
                    </Card>
                    <Card className="flex items-center space-x-4 p-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Cook Time</p>
                        <p className="font-medium">45 mins</p>
                      </div>
                    </Card>
                    <Card className="flex items-center space-x-4 p-4">
                      <Timer className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Time</p>
                        <p className="font-medium">1 hour 15 mins</p>
                      </div>
                    </Card>
                    <Card className="flex items-center space-x-4 p-4">
                      <Users className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Servings</p>
                        <p className="font-medium">4</p>
                      </div>
                    </Card>
                    <Card className="flex items-center space-x-4 p-4">
                      <BarChart3 className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Difficulty</p>
                        <p className="font-medium">Medium</p>
                      </div>
                    </Card>
                    <Card className="flex items-center space-x-4 p-4">
                      <Flame className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Calories</p>
                        <p className="font-medium">450 kcal/serving</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

