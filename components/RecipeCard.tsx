import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from 'lucide-react'

interface RecipeCardProps {
  imageUrl: string
  title: string
  description: string
  username: string
  cookTime: string
  className?: string
  profileImage?: string
}

export function RecipeCard({ imageUrl, title, description, username, cookTime, className, profileImage }: RecipeCardProps) {
  return (
    <Card className="w-full overflow-hidden group cursor-pointer">
      <div className="relative">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full p-4">
          <h2 className="text-lg font-semibold text-white mb-1 line-clamp-2">{title}</h2>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={profileImage} alt={username} />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">{username}</span>
        </div>
        <div className="p-1 rounded-full cursor-pointer hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </Card>
  )
}

