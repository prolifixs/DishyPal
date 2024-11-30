"use client"

import { UserPostDetail } from "@/components/user-post-detail"

export default function UserPostDetailPage({ params }: { params: { id: string } }) {
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
    tweet: `Post #${params.id} - Just finished my meal prep for the day! Excited to try out these new recipes.`,
    likes: 42,
    reposts: 7,
    comments: 15,
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Post Details</h1>
        <UserPostDetail {...sampleData} />
      </div>
    </div>
  )
} 