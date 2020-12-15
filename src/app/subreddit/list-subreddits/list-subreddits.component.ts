import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { SubredditModel } from '../subreddit-model';
import { SubredditService } from '../subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits!:Array<SubredditModel>;

  constructor(private subredditService:SubredditService) {}

  ngOnInit(): void {
    this.subredditService.getAllSubreddit().subscribe(data=>{
      console.log(data);
      this.subreddits=data;
    },(error)=>{
      throwError(error);
    })
  }

}
