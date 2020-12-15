import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { SubredditService } from 'src/app/subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits:Array<SubredditModel>=[];
  displayViewAll!: boolean;


  constructor(private subredditSerivice:SubredditService) { }

  ngOnInit(): void {

    this.subredditSerivice.getAllSubreddit().subscribe(data=>{
      if(data.length>3){
        this.subreddits=data.splice(0,3);
        this.displayViewAll=true;

      }else{
        this.subreddits=data;
      }
    })
  }

}
