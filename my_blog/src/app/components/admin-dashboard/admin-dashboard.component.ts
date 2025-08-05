import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  pendingPosts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.postService.getPendingPosts().subscribe(posts => this.pendingPosts = posts);
  }

  approve(post: Post) {
    post.is_published = true;
    this.postService.savePost(post).subscribe(() => this.loadPending());
  }

  reject(post: Post) {
    // For simplicity, just remove from pending (no backend here)
    this.pendingPosts = this.pendingPosts.filter(p => p.id !== post.id);
  }
}
