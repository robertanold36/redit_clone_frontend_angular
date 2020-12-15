import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './SignupRequestPayload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup=new FormGroup({});

  signupRequestPayload!: SignupRequestPayload;

  constructor(private authService:AuthService,private router:Router,private toastr:ToastrService) { 
    this.signupRequestPayload={
      email:'',
      password:'',
      username:''
    }
  }

  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email,Validators.required])
    });
  }

  signup(){
    
    this.signupRequestPayload.username=this.form.get('username')?.value;
    this.signupRequestPayload.password=this.form.get('password')?.value;
    this.signupRequestPayload.email=this.form.get('email')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(()=>{
        this.router.navigate(['/login'],{ queryParams:{ registered:'true' } });
    },()=>{
        this.toastr.error('regisration failed please try again');
    });
  }

}
