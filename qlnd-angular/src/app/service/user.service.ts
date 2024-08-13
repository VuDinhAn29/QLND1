import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { UserRespose } from '../responses/user/UserRosponse';
import {HttpUtilService} from './http.until.service';
import { UpdateUserDTO } from '../dtos/user/updateUser.dto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;

  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }

  constructor(private http: HttpClient,private httpUtilService: HttpUtilService,) { }
  
  register(registerDTO:RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegister,registerDTO,this.apiConfig);
  };
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin,loginDTO,this.apiConfig);
  };
  getUserDetail(token: string){
    return this.http.post(this.apiUserDetail,{},{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }
  saveUserResponseToLocalStorage(userRespose?:UserRespose) {
    try{
      if(userRespose == null || !userRespose) {
        return
      }
        const userResposeJSON = JSON.stringify(userRespose);
        localStorage.setItem('user',userResposeJSON);
        console.log('User response saved to local storage');
        
    }catch(error){
      console.log('Error saving user response to local storage', error);
      

    }
  }
  getUserResponseFromLocalStorage():UserRespose | null {
    try {
      const userResposeJSON = localStorage.getItem('user');
      if(userResposeJSON == null || userResposeJSON == undefined) {
        return null;
      }
      const userRespose = JSON.parse(userResposeJSON!);
      console.log('User response retrieved from ls');
      return userRespose;
      
    } catch(error) {
      console.error('Error retrieving user response from ls',error);
      return null
    }
  }

  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }

  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO) {
    // debugger
    let userResponse = this.getUserResponseFromLocalStorage()
    return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`, updateUserDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
}
