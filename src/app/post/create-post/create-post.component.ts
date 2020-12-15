import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { CreatePostPayload } from './post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm!: FormGroup;
  postModel!: CreatePostPayload;
  subreddits!:Array<SubredditModel>;

  constructor(private router: Router,
    private subredditService: SubredditService,
    private postService: PostService) {
    this.postModel = {
      createdDate: Date.now(),
      description: '',
      postName: '',
      url: '',
      subredditName: ''
    }
  }

  ngOnInit(): void {

    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddit().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });

  }

  createPost() {
    this.postModel.postName = this.createPostForm.get('postName')?.value;
    this.postModel.subredditName = this.createPostForm.get('subredditName')?.value;
    this.postModel.url = this.createPostForm.get('url')?.value;
    this.postModel.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postModel).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
