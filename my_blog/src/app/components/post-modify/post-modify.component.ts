import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.component.html'
})
export class PostModifyComponent implements OnInit {

  postForm: FormGroup;
  editingPostId?: number;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form with empty values
    this.postForm = this.fb.group({
      title: [''],
      slug: [''],
      content: [''],
      cover_image: [''],
      author_name: [''],
      tags: [''],
      is_published: [false]
    });
  }

  ngOnInit() {
    // Get the slug from the URL to fetch the post data
    const slug = this.route.snapshot.paramMap.get('id');
    if (slug) {
      this.postService.getPostBySlug(slug).subscribe(post => {
        if (post) {
          this.editingPostId = post.id;
          // Patch the form with the post data, converting the tags array to a string
          this.postForm.patchValue({
            ...post,
            tags: post.tags.join(', ')
          });
        }
      });
    }
  }

  savePost(): void {
    if (this.postForm.invalid) {
      // Add custom validation feedback here
      return;
    }

    const formValue = this.postForm.value;
    const post: Post = {
      id: this.editingPostId!,
      author_id: 1, // Mock current user ID
      title: formValue.title,
      slug: formValue.slug,
      content: formValue.content,
      cover_image: formValue.cover_image,
      tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [],
      is_published: formValue.is_published,
      views: 0, // Views are not changed on edit
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.postService.savePost(post).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
