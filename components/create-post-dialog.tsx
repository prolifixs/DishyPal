"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Image from 'next/image'
import { useState } from 'react'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: {
    id: number
    content: string
    tags?: string[]
    mediaUrls?: string[]
  }
  isEditing?: boolean
}

export default function CreatePostDialog({
  open,
  onOpenChange,
  initialData,
  isEditing = false
}: CreatePostDialogProps) {
  const [tagInputs, setTagInputs] = useState<string[]>(initialData?.tags?.map(tag => `@${tag}`) || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [postData, setPostData] = useState({
    content: initialData?.content || '',
    tags: initialData?.tags || [],
  })
  const [files, setFiles] = useState<File[]>([])
  const supabase = createClientComponentClient()

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const lastChar = value[value.length - 1]
    
    setPostData(prev => ({ ...prev, content: value }))
    
    if (lastChar === '@' && tagInputs.length < 3) {
      setTagInputs([...tagInputs, '@'])
    }
  }

  const handleAddTagInput = () => {
    if (tagInputs.length < 3) {
      setTagInputs([...tagInputs, '@'])
    }
  }

  const handleTagInputChange = (index: number, value: string) => {
    const newTagInputs = [...tagInputs]
    if (!value.includes('@')) {
      handleRemoveTagInput(index)
      return
    }
    newTagInputs[index] = value
    setTagInputs(newTagInputs)
    
    // Update postData tags
    const newTags = newTagInputs.map(tag => tag.replace('@', '').trim()).filter(Boolean)
    setPostData(prev => ({ ...prev, tags: newTags }))
  }

  const handleRemoveTagInput = (index: number) => {
    setTagInputs(tagInputs.filter((_, i) => i !== index))
  }

  const handleCreatePost = async () => {
    try {
      // Handle media uploads
      const mediaUrls = []
      if (files.length > 0) {
        for (const file of files) {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(fileName, file)

          if (uploadError) {
            throw uploadError
          }

          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(fileName)

          mediaUrls.push(publicUrl)
        }
      }

      // Choose endpoint based on whether we're editing or creating
      const endpoint = isEditing ? `/api/posts/${initialData?.id}` : '/api/posts'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: postData.content,
          tags: postData.tags,
          media_urls: mediaUrls.length > 0 ? mediaUrls : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? 'update' : 'create'} post`)
      }

      // Reset form and close dialog
      setPostData({ content: '', tags: [] })
      setFiles([])
      onOpenChange(false)
      
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, error)
    }
  }

  const isExpanded = tagInputs.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? "sm:max-w-[900px]" : "sm:max-w-[525px]"
        }`}
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </DialogTitle>
          {isExpanded && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTagInputs([])}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </DialogHeader>

        <div className={`flex ${isExpanded ? 'gap-6' : 'gap-4'}`}>
          <div className={`${isExpanded ? 'w-2/3' : 'flex-1'} space-y-4`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Image 
                  src="/placeholder.svg" 
                  alt="User Profile" 
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-medium">John Doe</span>
            </div>

            <div className="relative">
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 resize-none"
                placeholder="What's cooking in your kitchen?"
                value={postData.content}
                onInput={handleTextAreaInput}
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <button 
                  className="p-1.5 hover:bg-muted rounded-md transition-colors"
                  onClick={handleAddTagInput}
                  disabled={tagInputs.length >= 3}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M20 12H4" />
                    <path d="M12 4v16" />
                  </svg>
                </button>
              </div>
            </div>

            {tagInputs.length > 0 && (
              <div className="space-y-2">
                {tagInputs.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={tag}
                      onChange={(e) => handleTagInputChange(index, e.target.value)}
                      placeholder="@username"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTagInput(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="w-1/3 space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Add user search results here */}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreatePost}>
            {isEditing ? 'Save Changes' : 'Create Post'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 