"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, Heart, MessageCircle, Repeat2, Sun, Cloud, Moon, X, UserPlus, BookmarkPlus, Flag, Send, Share2, Edit, Trash2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreatePostDialog from '@/components/create-post-dialog'

interface UserPostDetailProps {
  id: number
  content: string
  username: string
  userBio: string
  profileImage: string
  likes: number
  comments: number
  reposts: number
  mediaUrls?: string[]
  tags?: string[]
  createdAt: string
  onEdit?: (post: PostData & { id: number }) => void
}

type MealTime = 'morning' | 'afternoon' | 'evening'

interface Comment {
  id: string
  username: string
  profileImage: string
  content: string
  timestamp: string
}

interface PostData {
  id: string
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

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    username: string;
    avatar_url?: string;
  };
}

export default function UserPostDetail({
  id,
  content,
  username,
  userBio,
  profileImage,
  likes,
  comments,
  reposts,
  mediaUrls,
  tags,
  createdAt,
  onEdit
}: UserPostDetailProps) {
  const { user } = useAuth()
  const [currentMeal, setCurrentMeal] = useState<MealTime | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMealDetails, setShowMealDetails] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [editPostData, setEditPostData] = useState<any>(null)

  const { data: commentList = [], isLoading, refetch } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}/comments`)
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      return response.json()
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  })
  const [newComment, setNewComment] = useState('')

  const mealImages = {
    morning: mediaUrls?.[0] || '/placeholder.svg',
    afternoon: mediaUrls?.[1] || '/placeholder.svg',
    evening: mediaUrls?.[2] || '/placeholder.svg',
  }

  const meals = [
    { time: 'morning' as MealTime, icon: Sun, description: mediaUrls?.[0] || '' },
    { time: 'afternoon' as MealTime, icon: Cloud, description: mediaUrls?.[1] || '' },
    { time: 'evening' as MealTime, icon: Moon, description: mediaUrls?.[2] || '' },
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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content: newComment.trim() }),
        headers: { 'Content-Type': 'application/json' },
      })
      refetch() // Refresh comments after posting
      setNewComment('')
    }
  }

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      // Redirect to the previous page
      router.back()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleEditClick = () => {
    console.log('Edit clicked', { id, content, tags })
    setEditPostData({
      id,
      content,
      tags: tags || [],
      mediaUrls
    })
    setIsCreatePostOpen(true)
    setShowDropdown(false)
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
    <>
      <Card className="w-full overflow-hidden" ref={cardRef}>
        <div className="relative w-full h-48 group cursor-pointer" onClick={handleImageClick}>
          <Image
            src={currentMeal ? mealImages[currentMeal] : mediaUrls?.[0] || '/placeholder.svg'}
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
                <DropdownMenu 
                  username={username} 
                  isCurrentUser={user?.username === username}
                  onDeleteClick={() => setShowDeleteDialog(true)}
                  onEditClick={handleEditClick}
                />
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
          <TweetSection tweet={content} />
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
        {showDeleteDialog && (
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this post? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeletePost}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </Card>

      <CreatePostDialog 
        open={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
        initialData={editPostData}
        isEditing={true}
      />
    </>
  )
}

function DropdownMenu({ 
  username, 
  isCurrentUser,
  onDeleteClick,
  onEditClick
}: { 
  username: string; 
  isCurrentUser: boolean;
  onDeleteClick: () => void;
  onEditClick: () => void;
}) {
  if (isCurrentUser) {
    return (
      <div className="py-1">
        <DropdownItem icon={<BookmarkPlus className="w-4 h-4 mr-2 flex-shrink-0" />} text="Save" />
        <DropdownItem icon={<Share2 className="w-4 h-4 mr-2 flex-shrink-0" />} text="Share" />
        <DropdownItem 
          icon={<Edit className="w-4 h-4 mr-2 flex-shrink-0" />} 
          text="Edit post" 
          onClick={() => onEditClick?.()}
        />
        <DropdownItem 
          icon={<Trash2 className="w-4 h-4 mr-2 flex-shrink-0 text-red-500" />} 
          text="Delete" 
          className="text-red-500 hover:bg-red-50"
          onClick={onDeleteClick}
        />
      </div>
    );
  }

  return (
    <div className="py-1">
      <DropdownItem icon={<X className="w-4 h-4 mr-2 flex-shrink-0" />} text="Not interested" />
      <DropdownItem icon={<UserPlus className="w-4 h-4 mr-2 flex-shrink-0" />} text={`Follow ${username}`} />
      <DropdownItem icon={<BookmarkPlus className="w-4 h-4 mr-2 flex-shrink-0" />} text="Save" />
      <DropdownItem icon={<Flag className="w-4 h-4 mr-2 flex-shrink-0" />} text="Report" />
    </div>
  );
}

function DropdownItem({ 
  icon, 
  text, 
  className = "",
  onClick
}: { 
  icon: React.ReactNode; 
  text: string; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      role="menuitem"
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {icon}
      <span className="truncate">{text}</span>
    </button>
  );
}

function ProfileSection({ profileImage, username, userBio }: { profileImage: string; username: string; userBio: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-2">
          <AvatarImage 
            src={profileImage || ''} 
            alt={username || 'User'} 
          />
          <AvatarFallback>
            {username ? username.charAt(0).toUpperCase() : '?'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{username || 'Anonymous'}</span>
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
            <AvatarImage src={comment.profiles?.avatar_url} alt={comment.profiles?.username} />
            <AvatarFallback>
              {comment.profiles?.username?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{comment.profiles?.username || 'Anonymous'}</span>
              <span className="text-xs text-gray-500">{comment.created_at}</span>
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

