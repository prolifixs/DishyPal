import { supabase } from "./supabaseClient"

// Run this once to set up your storage bucket
const createBucket = async () => {
  const { data, error } = await supabase.storage.createBucket('post-media', {
    public: true,
    fileSizeLimit: 1024 * 1024 * 10, // 10MB
    allowedMimeTypes: ['image/*', 'video/*']
  })
} 