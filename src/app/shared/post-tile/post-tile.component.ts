import { Component, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/home/post-response';
import { PostService } from '../post.service';
import {  faComment } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  

  faComments=faComment;


  posts$:Array<PostResponse>=[]

  constructor(private postSerivice:PostService) {
    this.postSerivice.getPosts().subscribe(post=>{
      this.posts$=post;
    });
   }

  ngOnInit(): void {
  }

  read(){
    console.log('read post');
  }


}
