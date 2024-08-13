import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NgForm } from '@angular/forms';
import {LoginResponse} from '../../responses/user/LoginResponse';
import { TokenService } from 'src/app/service/token.service';
import { Role } from './models/role';
import { RoleService } from 'src/app/service/role.service';
import {UserRespose} from '../../responses/user/UserRosponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(`loginForm`) loginForm!:NgForm;
  phoneNumber: string = '';
  password: string = ''; 
  
  rememberMe: boolean = true;
  roles: Role[] = [];
  selectedRole: Role | undefined;
  userRespose?: UserRespose;


  

  onPhoneNumberChange(){
    console.log(`Phone typed: ${this.phoneNumber}`)
    
  }

  ngOnInit(): void {
   
    this.roleService.getRoles().subscribe({
      next: (roles:Role[]) =>{
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0]: undefined
        console.log("roles",this.roles);
    
      },
      complete: ()=>{

      },
      error: (error: any) =>{
        console.log('Error getting roles:',error);
        
      }
    })
  }


  constructor( private router: Router, private userService: UserService,
    private tokenService: TokenService,private roleService: RoleService,){
  }

  login(){
    
    const loginDTO:LoginDTO = {
      "phone_number": this.phoneNumber,
      "password": this.password,
      "role_id": this.selectedRole?.id ?? 1
     
    }
    this.userService.login(loginDTO).subscribe( {
      next: (response: LoginResponse) => {
       
        
       const {token} = response;
       if(this.rememberMe){
        this.tokenService.setToken(token);
        
        this.userService.getUserDetail(token).subscribe({
          next: (response: any) =>{
            this.userRespose = {
            ...response,
            date_of_birth: new Date(response.date_of_birth),

            };
            console.log("userRespose",this.userRespose);
            this.userService.saveUserResponseToLocalStorage(this.userRespose);
            if (this.userRespose?.role.name == 'admin') {
              this.router.navigate(['/admin'])
            } else if (this.userRespose?.role.name == 'user') {
              this.router.navigate(['/'])
            }
          },
          complete: () =>{

          },
          error: (error: any) =>{
            alert(error.error.message);
            console.log("Lỗi api");
            
          }
        })
       }
      
       
       this.tokenService.setToken(token);
          
     
      },
     
      complete: () => {
        // debugger
      },
      error: (error: any) => {
        console.log("Data",loginDTO);
        console.log("Đăng nhập không thành công",error);
        
      }
    })
    // this.Http.post(apiUrl,registerData,{headers})
    // .subscribe(
      
    // );
  }
}
