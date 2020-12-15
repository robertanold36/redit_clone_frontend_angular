import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from 'src/app/home/post-response';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post!:PostResponse;
  faArrowUp=faArrowUp;
  faArrowDown=faArrowDown;

  constructor() { }

  ngOnInit(): void {
  }

}
