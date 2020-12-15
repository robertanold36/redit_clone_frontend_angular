import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostResponse } from './post-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  
   }

  ngOnInit(): void {
  }

}
