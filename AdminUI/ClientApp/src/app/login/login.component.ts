import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/services/Data/login';
import{NgxNotificationService}from 'ngx-notification'
import{CommonService} from '../../services/common.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: any;
    public password: any;
    public submitted: boolean = false;
    public error: any;
    public login1 = new Login();
    constructor(private authSvc: AuthService, private router: Router,private notification:NgxNotificationService,private cvc:CommonService)  { }
  ngOnInit() {
   
    //this.submitted=true;
   
  }
    
      //this.sendmotification()
      
      login(data) {
        console.log(data);
        this.submitted = true;
    debugger
        this.authSvc.login(data).subscribe(
          res => {
            debugger;
            console.log("Return : ", res);
            if (res != null) {
              debugger
             // this.ngxNotificationService.sendMessage('Login Successfull', 'success', 'top-right')
              // debugger
               localStorage.setItem('isLoggedIn', '1');
              // var userdetail = {
              //   UserId: res.userId,
              //   Username: res.userName,
              //   IsAdmin: res.isAdmin
              // }
              // localStorage.setItem('UserDetails', JSON.stringify(userdetail));
              this.router.navigate(['/']);
            }
            else
            {
              // this.ngxNotificationService.sendMessage('Invalid username & password', 'success', 'top-right')
            }
          });
       
      }
           
    

    // sendmotification()
    // {
    //   this.authSvc.isLogedIn.subscribe((res)=>
    //   {
    //     let result:any
    //     result=res
    //     if(result == 1)
    //     {
    //      this.notification.sendMessage('succesfullyloggedin','success','top-right')
    //     }
    //     else
    //     {
    //       this.notification.sendMessage('succesfullyloggedin','danger','top-right')
    //     }
    //   })
    // }
}





