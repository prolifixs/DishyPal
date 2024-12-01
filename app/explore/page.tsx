"use client"

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight, Heart, MessageCircle, Cloud, Moon, MoreHorizontal, Sun, Repeat2 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RecipeCard } from "@/components/RecipeCard"
import Image from 'next/image'
import Link from 'next/link'

function ScrollableSection({ title, children }: { title: string; children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {children}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background shadow-md"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background shadow-md"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

function UserPostCard({ id, username, userBio, tweet, likes, reposts, comments }: {
  id: number;
  username: string;
  userBio: string;
  tweet: string;
  likes: number;
  reposts: number;
  comments: number;
}) {
  const [currentMeal, setCurrentMeal] = useState<'morning' | 'afternoon' | 'evening' | null>(null)
  const [showMealDetails, setShowMealDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const meals = [
    { time: 'morning' as const, icon: Sun, description: 'No meal planned' },
    { time: 'afternoon' as const, icon: Cloud, description: 'No meal planned' },
    { time: 'evening' as const, icon: Moon, description: 'No meal planned' },
  ]

  const handleMealIconClick = (meal: 'morning' | 'afternoon' | 'evening', e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentMeal(meal)
    setShowMealDetails(true)
  }

  useEffect(() => {
    const card = cardRef.current
    const handleMouseLeave = () => setShowMealDetails(false)
    
    card?.addEventListener("mouseleave", handleMouseLeave)
    return () => card?.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  return (
    <Link href={`/user-post-detail/${id}`}>
      <Card className="w-[300px] flex-shrink-0" ref={cardRef}>
        <div className="relative w-full h-48 group">
          <Image
            src="/placeholder.svg"
            alt={`${currentMeal || 'morning'} meal`}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="p-1 bg-white rounded-full shadow-md cursor-pointer">
              <MoreHorizontal className="w-5 h-5" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 flex flex-col-reverse gap-2">
            {meals.map((meal) => (
              <div
                key={meal.time}
                className={`w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer transition-transform duration-200 ease-in-out ${
                  currentMeal === meal.time ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                onClick={(e) => handleMealIconClick(meal.time, e)}
              >
                <meal.icon className="w-5 h-5" />
              </div>
            ))}
          </div>
          {showMealDetails && currentMeal && (
            <div className="absolute bottom-2 left-12 right-2 bg-white bg-opacity-90 p-2 rounded shadow-md">
              <Badge className="mb-1">{currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1)}</Badge>
              <p className="text-sm">{meals.find(meal => meal.time === currentMeal)?.description}</p>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src="/placeholder.svg" alt={username} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold">{username}</span>
                <span className="text-sm text-gray-500">{userBio}</span>
              </div>
            </div>
            <MoreHorizontal className="text-gray-500 cursor-pointer" />
          </div>
          <p className="text-sm text-gray-700 mb-3">{tweet}</p>
          <Separator className="my-2" />
          <div className="flex justify-between mt-2">
            <span className="flex items-center text-gray-500 cursor-pointer hover:text-gray-700">
              <Heart className="w-5 h-5" />
              <span className="text-sm ml-1">{likes}</span>
            </span>
            <span className="flex items-center text-gray-500 cursor-pointer hover:text-gray-700">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm ml-1">{comments}</span>
            </span>
            <span className="flex items-center text-gray-500 cursor-pointer hover:text-gray-700">
              <Repeat2 className="w-5 h-5" />
              <span className="text-sm ml-1">{reposts}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Explore() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle>Explore</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <CardContent className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search recipes, users, or tags" className="pl-8" />
            </div>
            <ScrollableSection title="Popular Posts">
              <div className="flex space-x-4 pb-4">
                <UserPostCard
                  id={1}
                  username="FoodieExplorer"
                  userBio="Culinary adventurer"
                  tweet="Just tried this amazing new recipe! #FoodLover"
                  likes={120}
                  reposts={15}
                  comments={25}
                />
                <UserPostCard
                  id={2}
                  username="HealthyEats"
                  userBio="Nutrition enthusiast"
                  tweet="Here's my go-to smoothie bowl recipe! #HealthyLiving"
                  likes={85}
                  reposts={10}
                  comments={18}
                />
                <UserPostCard
                  id={3}
                  username="ChefMaster"
                  userBio="Professional chef"
                  tweet="New video: 5-minute gourmet meals! #QuickCooking"
                  likes={150}
                  reposts={30}
                  comments={40}
                />
                <UserPostCard
                  id={4}
                  username="BakingQueen"
                  userBio="Pastry chef"
                  tweet="Check out my latest cake design! #BakingArt"
                  likes={200}
                  reposts={45}
                  comments={60}
                />
                <UserPostCard
                  id={5}
                  username="VeganVibes"
                  userBio="Plant-based foodie"
                  tweet="Delicious vegan tacos for Taco Tuesday! #VeganEats"
                  likes={110}
                  reposts={20}
                  comments={35}
                />
                <UserPostCard
                  id={6}
                  username="GrillMaster"
                  userBio="BBQ enthusiast"
                  tweet="Perfect weather for a backyard BBQ! #GrillLife"
                  likes={95}
                  reposts={12}
                  comments={28}
                />
              </div>
            </ScrollableSection>
            <ScrollableSection title="Trending Recipes">
              <div className="flex space-x-6 pb-4">
                <Link href="/recipes/details/1">
                  <RecipeCard
                    imageUrl="/placeholder.svg?height=400&width=500"
                    title="Delicious Pasta Carbonara"
                    description="A classic Italian dish with creamy sauce and crispy bacon"
                    username="ChefLuigi"
                    cookTime="30 mins"
                    className="w-[350px]"
                  />
                </Link>
                <Link href="/recipes/details/2">
                  <RecipeCard
                    imageUrl="/placeholder.svg?height=300&width=400"
                    title="Vegan Buddha Bowl"
                    description="A nutritious and colorful bowl packed with plant-based goodness"
                    username="VeggieQueen"
                    cookTime="20 mins"
                  />
                </Link>
                <Link href="/recipes/details/3">
                  <RecipeCard
                    imageUrl="/placeholder.svg?height=300&width=400"
                    title="Spicy Thai Curry"
                    description="An aromatic and flavorful curry that's sure to impress"
                    username="SpiceGuru"
                    cookTime="45 mins"
                  />
                </Link>
                <Link href="/recipes/details/4">
                  <RecipeCard
                    imageUrl="/placeholder.svg?height=300&width=400"
                    title="Classic French Croissants"
                    description="Buttery, flaky pastries perfect for breakfast or brunch"
                    username="PastryPro"
                    cookTime="3 hours"
                  />
                </Link>
              </div>
            </ScrollableSection>
            <ScrollableSection title="Featured Meal Plans">
              <div className="flex space-x-6 pb-4">
                {[
                  {
                    imageUrl: "/placeholder.svg?height=400&width=500",
                    title: "7-Day Mediterranean Diet Plan",
                    description: "Discover the health benefits of Mediterranean cuisine with this weekly meal plan.",
                    profileImage: "/placeholder.svg?height=40&width=40",
                    username: "NutritionExpert",
                    className: "w-[350px]",
                    cookTime: "7 days"
                  },
                  {
                    imageUrl: "/placeholder.svg?height=300&width=400",
                    title: "Vegan Meal Prep for Busy Professionals",
                    description: "A week of plant-based meals perfect for meal prepping and staying healthy on-the-go.",
                    profileImage: "/placeholder.svg?height=40&width=40",
                    username: "VeganChef",
                    cookTime: "7 days"
                  },
                  {
                    imageUrl: "/placeholder.svg?height=300&width=400",
                    title: "High-Protein Fitness Meal Plan",
                    description: "Fuel your workouts and recovery with this protein-packed weekly meal plan.",
                    profileImage: "/placeholder.svg?height=40&width=40",
                    username: "FitnessFoodie",
                    cookTime: "7 days"
                  },
                  {
                    imageUrl: "/placeholder.svg?height=300&width=400",
                    title: "Family-Friendly Budget Meals",
                    description: "Delicious and affordable meals that the whole family will love, planned for a full week.",
                    profileImage: "/placeholder.svg?height=40&width=40",
                    username: "BudgetMeals",
                    cookTime: "7 days"
                  },
                ].map((plan, index) => (
                  <RecipeCard key={index} {...plan} />
                ))}
              </div>
            </ScrollableSection>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}

