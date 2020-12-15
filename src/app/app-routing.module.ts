import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';

const routes: Routes = [
  {
    path:'sign-up',component:SignupComponent,
    
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'',component:HomeComponent
  },
  {
    path:'create-post',component:CreatePostComponent,canActivate:[AuthGuard]
  },
  {
    path:'create-subreddit',component:CreateSubredditComponent,canActivate:[AuthGuard]
  },
  {
    path:'list-subreddits',component:ListSubredditsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
