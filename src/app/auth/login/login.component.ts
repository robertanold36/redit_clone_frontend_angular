import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  loginRequestPayload!:LoginRequestPayload;
  registerSuccessMessage!: string;
  isError!:boolean;

  constructor(private auth:AuthService,private toastr:ToastrService
    ,private activatedRoute:ActivatedRoute,
    private router:Router) { 

    this.loginRequestPayload={
      username:'',
      password:''
    };
  }

  ngOnInit(): void {

    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params=>{
      if(params.registered!==undefined&&params.registered==='true'){
        this.toastr.success('successfully signup the user');
        this.registerSuccessMessage='Please Check your inbox for activation email '
        + 'activate your account before you Login!';
      }
    });

  }

  get f(){
    return this.loginForm.controls;
  }

  login(){
    
    this.loginRequestPayload.username=this.loginForm.get('username')?.value;
    this.loginRequestPayload.password=this.loginForm.get('password')?.value;

    this.auth.login(this.loginRequestPayload).subscribe(data=>{
     if(data){
        this.isError=false;
        this.router.navigateByUrl('/');
        this.toastr.success('login succesfully');
     }
    },()=>{
      this.isError=true;
      this.toastr.error('error to sign in ');
    });
  }

}
