import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  // Logic for posts
  posts: Post[] = [];

  // Logic for the navigation menu dropdown
  showPostsMenu = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPublishedPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  // Toggles the visibility of the post list dropdown
  togglePostsMenu(): void {
    this.showPostsMenu = !this.showPostsMenu;
  }
}
