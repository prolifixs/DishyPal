"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Heart, MessageCircle, Repeat2, Sun, Cloud, Moon, X, UserPlus, BookmarkPlus, Flag, Send } from 'lucide-react'

interface UserPostDetailProps {
  morningImage: string
  afternoonImage: string
  eveningImage: string
  morning: string
  afternoon: string
  evening: string
  profileImage: string
  username: string
  userBio: string
  tweet: string
  likes: number
  reposts: number
  comments: number
}

type MealTime = 'morning' | 'afternoon' | 'evening'

interface Comment {
  id: string
  username: string
  profileImage: string
  content: string
  timestamp: string
}

export function UserPostDetail({
  morningImage,
  afternoonImage,
  eveningImage,
  morning,
  afternoon,
  evening,
  profileImage,
  username,
  userBio,
  tweet,
  likes,
  reposts,
  comments,
}: UserPostDetailProps) {
  const [currentMeal, setCurrentMeal] = useState<MealTime | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMealDetails, setShowMealDetails] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [commentList, setCommentList] = useState<Comment[]>([
    {
      id: '1',
      username: 'JaneSmith',
      profileImage: '/placeholder.svg?height=40&width=40',
      content: 'Great meal plan! I might try this tomorrow.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      username: 'MikeBrown',
      profileImage: '/placeholder.svg?height=40&width=40',
      content: 'The salmon dish looks delicious!',
      timestamp: '1 hour ago'
    }
  ])
  const [newComment, setNewComment] = useState('')

  const mealImages = {
    morning: morningImage,
    afternoon: afternoonImage,
    evening: eveningImage,
  }

  const meals = [
    { time: 'morning' as MealTime, icon: Sun, description: morning },
    { time: 'afternoon' as MealTime, icon: Cloud, description: afternoon },
    { time: 'evening' as MealTime, icon: Moon, description: evening },
  ]

  const handleImageClick = () => {
    console.log('Image clicked')
    // Add your desired functionality here
  }

  const handleOptionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  const handleMealIconClick = (meal: MealTime, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMeal(meal)
    setShowMealDetails(true)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: 'CurrentUser', // This would normally come from the authenticated user
        profileImage: '/placeholder.svg?height=40&width=40',
        content: newComment.trim(),
        timestamp: 'Just now'
      }
      setCommentList([...commentList, comment])
      setNewComment('')
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    function handleMouseLeave() {
      setShowMealDetails(false)
    }

    const card = cardRef.current
    document.addEventListener("mousedown", handleClickOutside)
    card?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      card?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <Card className="w-full overflow-hidden" ref={cardRef}>
      <div className="relative w-full h-48 group cursor-pointer" onClick={handleImageClick}>
        <Image
          src={currentMeal ? mealImages[currentMeal] : morningImage}
          alt={`${currentMeal || 'morning'} meal`}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div 
            className="p-1 bg-white rounded-full shadow-md cursor-pointer"
            onClick={handleOptionClick}
          >
            <MoreHorizontal className="w-5 h-5" />
          </div>
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
            >
              <DropdownMenu username={username} />
            </div>
          )}
        </div>
        <div className="absolute bottom-2 left-2 flex flex-col-reverse gap-2">
          {meals.map((meal, index) => (
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
        <ProfileSection profileImage={profileImage} username={username} userBio={userBio} />
        <TweetSection tweet={tweet} />
        <Separator className="my-2" />
        <ActionSection likes={likes} reposts={reposts} comments={comments} />
      </CardContent>
      <CardContent className="p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        <CommentList comments={commentList} />
        <CommentForm
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentSubmit={handleCommentSubmit}
        />
      </CardContent>
    </Card>
  )
}

function DropdownMenu({ username }: { username: string }) {
  return (
    <div className="py-1">
      <DropdownItem icon={<X className="w-4 h-4 mr-2 flex-shrink-0" />} text="Not interested" />
      <DropdownItem icon={<UserPlus className="w-4 h-4 mr-2 flex-shrink-0" />} text={`Follow ${username}`} />
      <DropdownItem icon={<BookmarkPlus className="w-4 h-4 mr-2 flex-shrink-0" />} text="Save" />
      <DropdownItem icon={<Flag className="w-4 h-4 mr-2 flex-shrink-0" />} text="Report" />
    </div>
  )
}

function DropdownItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      role="menuitem"
    >
      {icon}
      <span className="truncate">{text}</span>
    </button>
  )
}

function ProfileSection({ profileImage, username, userBio }: { profileImage: string; username: string; userBio: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-2">
          <AvatarImage src={profileImage} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{username}</span>
          <span className="text-sm text-gray-500">{userBio}</span>
        </div>
      </div>
      <MoreHorizontal className="text-gray-500 cursor-pointer" />
    </div>
  )
}

function TweetSection({ tweet }: { tweet: string }) {
  return (
    <div className="mb-3">
      <p className="text-sm text-gray-700">{tweet}</p>
    </div>
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

function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4 mb-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.profileImage} alt={comment.username} />
            <AvatarFallback>{comment.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{comment.username}</span>
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CommentForm({
  newComment,
  setNewComment,
  handleCommentSubmit
}: {
  newComment: string
  setNewComment: (comment: string) => void
  handleCommentSubmit: (e: React.FormEvent) => void
}) {
  return (
    <form onSubmit={handleCommentSubmit} className="mt-4 flex items-start space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current user" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full min-h-[80px]"
        />
        <Button type="submit" className="mt-2">
          <Send className="w-4 h-4 mr-2" />
          Post Comment
        </Button>
      </div>
    </form>
  )
}

export default function UserPostDetailPage() {
  // Sample data for the UserPostDetail component
  const sampleData = {
    morningImage: "/placeholder.svg?height=300&width=400",
    afternoonImage: "/placeholder.svg?height=300&width=400",
    eveningImage: "/placeholder.svg?height=300&width=400",
    morning: "Oatmeal with fresh berries",
    afternoon: "Grilled chicken salad",
    evening: "Baked salmon with roasted vegetables",
    profileImage: "/placeholder.svg?height=40&width=40",
    username: "JohnDoe",
    userBio: "Food enthusiast | Healthy living",
    tweet: "Just finished my meal prep for the day! Excited to try out these new recipes. #HealthyEating #MealPrep",
    likes: 42,
    reposts: 7,
    comments: 15,
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Post Detail</h1>
      <UserPostDetail {...sampleData} />
    </div>
  )
}

