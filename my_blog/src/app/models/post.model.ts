export interface Post {
  id: number;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  tags: string[];
  is_published: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}
