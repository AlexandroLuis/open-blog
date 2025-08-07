import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];
  currentPost: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameter changes to handle both list and detail views
    this.route.paramMap.subscribe(params => {
      const slug = params.get('id');

      // If a slug exists, fetch a single post
      if (slug) {
        this.posts = []; // Clear the list
        this.postService.getPostBySlug(slug).subscribe(post => {
          this.currentPost = post;
        });
      } else {
        // If no slug exists, fetch all posts
        this.currentPost = undefined; // Clear the single post view
        this.postService.getPublishedPosts().subscribe(posts => {
          this.posts = posts;
        });
      }
    });
  }
  
}
