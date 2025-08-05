import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html'
})
export class PostEditorComponent implements OnInit {

  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: [''],
      slug: [''],
      content: [''],
      cover_image: [''],
      tags: [''],
      is_published: [false]
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('id');
    if (slug) {
      this.postService.getPostBySlug(slug).subscribe(post => {
        if (post) {
          this.postForm.patchValue({
            ...post,
            tags: post.tags.join(', ')
          });
        }
      });
    }
  }

  save() {
    const formValue = this.postForm.value;
    const post: Post = {
      id: 0, // new post
      author_id: 1, // mock current user id
      title: formValue.title,
      slug: formValue.slug,
      content: formValue.content,
      cover_image: formValue.cover_image,
      tags: formValue.tags.split(',').map((tag: string) => tag.trim()),
      is_published: formValue.is_published,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.postService.savePost(post).subscribe(() => {
      alert('Post saved!');
      this.router.navigate(['/home']);
    });
  }
}
