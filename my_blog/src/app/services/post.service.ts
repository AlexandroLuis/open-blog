import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post.model';

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author_id: 1,
    title: "Welcome to My Blog",
    slug: "welcome-to-my-blog",
    content: "This is the first post on my blog!",
    cover_image: "https://via.placeholder.com/600x200",
    tags: ["welcome", "intro"],
    is_published: true,
    views: 123,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    author_id: 1,
    title: "Draft Post",
    slug: "draft-post",
    content: "This post is still being edited.",
    cover_image: "",
    tags: ["draft"],
    is_published: false,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
