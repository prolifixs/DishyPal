'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import { MessageCircle, ThumbsUp, MoreVertical, ArrowLeft, Sun, Cloud, Moon, MoreHorizontal, Heart, Repeat2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserPostDetail } from "@/components/user-post-detail"

const weekDates = {
  'Wk1': ['Nov 1', 'Nov 12', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6', 'Nov 7'],
  'Wk2': ['Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14'],
  'Wk3': ['Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21'],
  'Wk4': ['Nov 22', 'Nov 23', 'Nov 24', 'Nov 25', 'Nov 26', 'Nov 27', 'Nov 28'],
}

const recipes = [
  { id: 1, title: 'Italian Macaroni Pasta', time: '35 mins', image: '/placeholder.svg?height=150&width=200', craves: 120 },
  { id: 2, title: 'Scrambled pizza thingy', time: '1 H', image: '/placeholder.svg?height=150&width=200', craves: 85 },
  { id: 3, title: 'Sweet Pancakes', time: '10 M', image: '/placeholder.svg?height=150&width=200', craves: 200 },
  { id: 4, title: 'Grilled Salmon', time: '25 M', image: '/placeholder.svg?height=150&width=200', craves: 150 },
  { id: 5, title: 'Vegetable Stir Fry', time: '20 M', image: '/placeholder.svg?height=150&width=200', craves: 180 },
  { id: 6, title: 'Chocolate Cake', time: '1 H 30 M', image: '/placeholder.svg?height=150&width=200', craves: 250 },
]

type MealTime = 'morning' | 'afternoon' | 'evening'

interface PostData {
  id: number
  username: string
  timestamp: string
  tweet: string
  likes: number
  reposts: number
  comments: number
  meals: {
    morning: { image: string, description: string }
    afternoon: { image: string, description: string }
    evening: { image: string, description: string }
  }
}

const samplePosts: PostData[] = [
  {
    id: 1,
    username: "John Doe",
    timestamp: "2 hours ago",
    tweet: "Just finished my meal prep for the day! Excited to try out these new recipes. #HealthyEating #MealPrep",
    likes: 42,
    reposts: 7,
    comments: 15,
    meals: {
      morning: { image: "/placeholder.svg", description: "Healthy breakfast bowl" },
      afternoon: { image: "/placeholder.svg", description: "Grilled chicken salad" },
      evening: { image: "/placeholder.svg", description: "Baked salmon" }
    }
  },
  // ... add more sample posts
]

export default function ProfilePage() {
  const [selectedWeek, setSelectedWeek] = useState('Wk1')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [isReplateDialogOpen, setIsReplateDialogOpen] = useState(false)

  const handleReplate = () => {
    setIsReplateDialogOpen(true)
  }

  const handleSetMyPlans = () => {
    // Implement the logic for setting plans here
    setIsReplateDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
    {/* Header Section */}
    <div className="bg-gray-100 rounded-b-3xl p-6 mb-6">
      <div className="flex items-start gap-6">
        <Image
          src="/placeholder.svg?height=80&width=80"
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">John Doe</h1>
              <div className="flex gap-4 text-sm mb-2">
                <span><strong>1.2k</strong> Foodies</span>
                <span><strong>20</strong> Craves</span>
                <span><strong>9</strong> Recipes</span>
              </div>
              <div className="text-sm text-muted-foreground">
                followed by <span className="font-semibold">user</span>, <span className="font-semibold">user</span> and 2+ foodies
              </div>
            </div>
            <Button variant="outline" className="rounded-full px-4 py-1 text-sm">
              Crave Content
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Design development, UX/UI, and product design are all related terms in the field of design, but they refer to slightly different aspects of the design process.
          </p>
          <div className="flex gap-2 mt-4">
            {['twitter', 'facebook', 'youtube', 'tiktok', 'snapchat', 'instagram'].map((social) => (
              <Link key={social} href={`#${social}`} className="text-muted-foreground hover:text-primary">
                <Image src={`/placeholder.svg?height=16&width=16`} alt={social} width={16} height={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Tabs and Content */}
    <Tabs defaultValue="recipes" className="space-y-6">
      <TabsList className="w-full flex mb-6">
        <TabsTrigger value="recipes">Recipes</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="mealplan">Meal Plan</TabsTrigger>
      </TabsList>

      <TabsContent value="recipes">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <Link href={`/recipes/details/${recipe.id}`} key={recipe.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={200}
                    height={150}
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 left-1 flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70">
                      <LucideIcons.Heart className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                    {recipe.time}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">{recipe.title}</h3>
                  <p className="text-sm text-muted-foreground">Craved by {recipe.craves}+ foodies</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="posts">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="mealplan">
        <div className="max-w-4xl mx-auto">
          {/* Info Section */}
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                      <h2 className="text-lg font-semibold">Meal Plan Information</h2>
                      <p className="text-sm text-muted-foreground">Details about the meal plan for the current month.</p>
                    </div>

                    {selectedDay ? (
                      <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedDay(null)}>
                            <ArrowLeft className="h-5 w-5" />
                          </Button>
                          <h2 className="text-xl font-semibold flex-grow">Day View</h2>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm" onClick={handleReplate}>Replate</Button>
                            <Button variant="outline" size="sm">Dishy Remix</Button>
                          </div>
                        </div>

                        <UserPostDetail 
                          morningImage="/placeholder.svg?height=300&width=400"
                          afternoonImage="/placeholder.svg?height=300&width=400"
                          eveningImage="/placeholder.svg?height=300&width=400"
                          morning="No meal planned"
                          afternoon="No meal planned"
                          evening="No meal planned"
                          profileImage="/placeholder.svg?height=40&width=40"
                          username="Your Meal Plan"
                          userBio={`Plan for ${selectedDay}`}
                          tweet="Your meal plan for the day"
                          likes={0}
                          reposts={0}
                          comments={0}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Week Buttons */}
                        <div className="flex sm:flex-col space-y-0 space-x-2 sm:space-x-0 sm:space-y-2 sm:h-[calc(80px*2+0.5rem)] justify-between">
                          {Object.keys(weekDates).map((week) => (
                            <Button
                              key={week}
                              variant={selectedWeek === week ? "default" : "outline"}
                              className="w-full sm:w-16"
                              onClick={() => setSelectedWeek(week)}
                            >
                              {week}
                            </Button>
                          ))}
                        </div>

                        {/* Days of the Week */}
                        <div className="grid grid-cols-4 gap-2 flex-grow">
                          {weekDates[selectedWeek as keyof typeof weekDates].map((date, index) => (
                            <Card
                              key={date}
                              className="flex flex-col h-40 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors relative"
                              onClick={() => setSelectedDay(date)}
                            >
                              <div className="absolute top-2 right-2 text-right">
                                <div className="font-semibold text-sm">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</div>
                                <div className="text-xs text-muted-foreground">{date}</div>
                              </div>
                              <CardContent className="p-2 flex-grow flex items-center justify-center">
                                <span className="text-sm text-muted-foreground">No meals planned</span>
                              </CardContent>
                            </Card>
                          ))}
                          <Card className="flex flex-col h-40 bg-gray-50 relative">
                            <div className="absolute top-2 right-2 text-right">
                              <div className="font-semibold text-sm">Actions</div>
                            </div>
                            <CardContent className="p-2 flex-grow flex flex-col items-center justify-center space-y-2">
                              <Button variant="outline" className="w-full text-xs" onClick={handleReplate}>Replate</Button>
                              <Button variant="outline" className="w-full text-xs">Dishy Remix</Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}
        </div>
      </TabsContent>
    </Tabs>

    {/* Replate Dialog */}
    <Dialog open={isReplateDialogOpen} onOpenChange={setIsReplateDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Replate and recreate your perfect meal plan.</DialogTitle>
          <DialogDescription>
            Are you sure you want to replate your meal plan?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsReplateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSetMyPlans}>Set My Plans</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  )
}

function PostCard({ post }: { post: PostData }) {
  const [currentMeal, setCurrentMeal] = useState<MealTime | null>(null)
  const [showMealDetails, setShowMealDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const meals = [
    { time: 'morning' as MealTime, icon: Sun, description: post.meals.morning.description },
    { time: 'afternoon' as MealTime, icon: Cloud, description: post.meals.afternoon.description },
    { time: 'evening' as MealTime, icon: Moon, description: post.meals.evening.description },
  ]

  const handleMealIconClick = (meal: MealTime, e: React.MouseEvent) => {
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
    <Link href={`/user-post-detail/${post.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200" ref={cardRef}>
        <div className="relative w-full h-48 group">
          <Image
            src={currentMeal ? post.meals[currentMeal].image : post.meals.morning.image}
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
          <div className="flex items-center gap-4 mb-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.username}</h3>
              <p className="text-sm text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3">{post.tweet}</p>
          <Separator className="my-2" />
          <ActionSection 
            likes={post.likes} 
            reposts={post.reposts} 
            comments={post.comments} 
          />
        </CardContent>
      </Card>
    </Link>
  )
}

function ActionSection({ likes, reposts, comments }: { likes: number; reposts: number; comments: number }) {
  return (
    <div className="flex justify-between mt-2">
      <ActionItem icon={<Heart className="w-5 h-5" />} count={likes} />
      <ActionItem icon={<MessageCircle className="w-5 h-5" />} count={comments} />
      <ActionItem icon={<Repeat2 className="w-5 h-5" />} count={reposts} />
    </div>
  )
}

function ActionItem({ icon, count }: { icon: React.ReactNode; count: number }) {
  return (
    <div className="flex items-center text-gray-500 cursor-pointer hover:text-gray-700">
      {icon}
      <span className="text-sm ml-1">{count}</span>
    </div>
  )
}

