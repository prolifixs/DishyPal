export type PostMediaType = 'image' | 'video';

export interface PostMedia {
  id: string;
  post_id: string;
  media_type: PostMediaType;
  url: string;
  order: number;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  has_media: boolean;
  created_at: string;
  media?: PostMedia[];
  tags?: Tag[];
  mentions?: string[];
}

export interface CreatePostPayload {
  content: string;
  tags?: string[];
  mentions?: string[];
  media_urls?: string[];
}