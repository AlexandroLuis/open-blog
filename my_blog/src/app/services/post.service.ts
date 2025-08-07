import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author_id: 2,
    title: "Exploring the Unknown",
    slug: "exploring-the-unknown",
    content: "Join me as I delve into the mysteries of the universe.",
    cover_image: "https://via.placeholder.com/600x200/FF5733",
    tags: ["space", "adventure"],
    is_published: true,
    views: 457,
    created_at: new Date("2025-08-07T14:00:00.000Z").toISOString(),
    updated_at: new Date("2025-08-07T14:00:00.000Z").toISOString()
  },
  {
    id: 2,
    author_id: 3,
    title: "10 Tips for a Productive Day",
    slug: "10-tips-for-a-productive-day",
    content: "Boost your daily efficiency with these 10 simple tips.",
    cover_image: "https://via.placeholder.com/600x200/33FF57",
    tags: ["productivity", "lifestyle"],
    is_published: false,
    views: 75,
    created_at: new Date("2025-07-20T09:30:00.000Z").toISOString(),
    updated_at: new Date("2025-07-21T11:00:00.000Z").toISOString()
  },
  {
    id: 3,
    author_id: 4,
    title: "A Journey Through Time",
    slug: "a-journey-through-time",
    content: "Let's take a walk through history and uncover the secrets of past civilizations.",
    cover_image: "https://via.placeholder.com/600x200/3398FF",
    tags: ["history", "education"],
    is_published: true,
    views: 330,
    created_at: new Date("2025-06-10T12:00:00.000Z").toISOString(),
    updated_at: new Date("2025-06-10T12:00:00.000Z").toISOString()
  },
  {
    id: 4,
    author_id: 5,
    title: "Mastering the Art of Cooking",
    slug: "mastering-the-art-of-cooking",
    content: "Learn how to prepare gourmet dishes with ease and impress your guests.",
    cover_image: "https://via.placeholder.com/600x200/FFC300",
    tags: ["cooking", "recipes"],
    is_published: true,
    views: 210,
    created_at: new Date("2025-05-05T17:45:00.000Z").toISOString(),
    updated_at: new Date("2025-05-06T09:00:00.000Z").toISOString()
  },
  {
    id: 5,
    author_id: 6,
    title: "The Future of Technology",
    slug: "the-future-of-technology",
    content: "What can we expect from AI, robotics, and space exploration in the next decade?",
    cover_image: "https://via.placeholder.com/600x200/FF5733",
    tags: ["tech", "future"],
    is_published: false,
    views: 120,
    created_at: new Date("2025-04-12T08:00:00.000Z").toISOString(),
    updated_at: new Date("2025-04-13T10:00:00.000Z").toISOString()
  },
  {
    id: 6,
    author_id: 7,
    title: "How to Stay Fit Without a Gym",
    slug: "how-to-stay-fit-without-a-gym",
    content: "No gym? No problem! Here are ways to stay fit from the comfort of your home.",
    cover_image: "https://via.placeholder.com/600x200/33A8FF",
    tags: ["fitness", "health"],
    is_published: true,
    views: 500,
    created_at: new Date("2025-03-22T10:30:00.000Z").toISOString(),
    updated_at: new Date("2025-03-22T10:30:00.000Z").toISOString()
  },
  {
    id: 7,
    author_id: 8,
    title: "Sustainable Living in 2025",
    slug: "sustainable-living-in-2025",
    content: "Explore how we can contribute to a greener world with simple changes in our lives.",
    cover_image: "https://via.placeholder.com/600x200/33FF8C",
    tags: ["sustainability", "environment"],
    is_published: true,
    views: 275,
    created_at: new Date("2025-02-18T14:15:00.000Z").toISOString(),
    updated_at: new Date("2025-02-18T14:15:00.000Z").toISOString()
  },
  {
    id: 8,
    author_id: 9,
    title: "The Psychology of Happiness",
    slug: "the-psychology-of-happiness",
    content: "Uncover the secrets behind happiness and how you can apply them to your life.",
    cover_image: "https://via.placeholder.com/600x200/FF33A8",
    tags: ["psychology", "wellness"],
    is_published: false,
    views: 98,
    created_at: new Date("2025-01-05T16:00:00.000Z").toISOString(),
    updated_at: new Date("2025-01-06T17:00:00.000Z").toISOString()
  },
  {
    id: 9,
    author_id: 10,
    title: "The Art of Minimalism",
    slug: "the-art-of-minimalism",
    content: "Learn how to declutter your mind and home to embrace a simpler life.",
    cover_image: "https://via.placeholder.com/600x200/33FF57",
    tags: ["minimalism", "lifestyle"],
    is_published: true,
    views: 420,
    created_at: new Date("2024-12-17T11:30:00.000Z").toISOString(),
    updated_at: new Date("2024-12-17T11:30:00.000Z").toISOString()
  },
  {
    id: 10,
    author_id: 11,
    title: "Mastering the Digital Marketing Game",
    slug: "mastering-the-digital-marketing-game",
    content: "In this post, we dive into the world of digital marketing strategies and how to succeed.",
    cover_image: "https://images.unsplash.com/photo-1552053831-71594a27632d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D",
    tags: ["marketing", "business"],
    is_published: true,
    views: 612,
    created_at: new Date("2024-11-29T08:45:00.000Z").toISOString(),
    updated_at: new Date("2024-11-29T08:45:00.000Z").toISOString()
  }
];


@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPublishedPosts(): Observable<Post[]> {
    return of(MOCK_POSTS.filter(p => p.is_published));
  }

  getPostBySlug(slug: string): Observable<Post | undefined> {
    return of(MOCK_POSTS.find(p => p.slug === slug));
  }

  getPendingPosts(): Observable<Post[]> {
    return of(MOCK_POSTS.filter(p => !p.is_published));
  }

  savePost(post: Post): Observable<Post> {
    // Simplified: just returns the post
    return of(post);
  }
}
