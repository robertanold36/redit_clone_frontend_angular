import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditModel } from './subreddit-model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  createSubreddit(subredditModel: SubredditModel):Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>('http://localhost:8081/api/subreddit',subredditModel);
  }

  constructor(private httpClient:HttpClient) { }

  getAllSubreddit():Observable<Array<SubredditModel>>{
    return this.httpClient.get<Array<SubredditModel>>('http://localhost:8081/api/subreddit');
  }

}
