import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  createPost(postModel: CreatePostPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8081/api/post', postModel);
  }

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any> {
    return this.httpClient.get('http://localhost:8081/api/post')
  }
}
