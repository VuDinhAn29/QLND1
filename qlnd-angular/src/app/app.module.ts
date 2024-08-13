import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



// import { RegisterComponent } from './register/resgister.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {TokenInterceptor} from './interceptors/token.interceptor';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component'
import { RegisterComponent } from './components/register/resgister.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
  declarations: [
    
  
            RegisterComponent,
            LoginComponent,
            AppComponent,
  
            HeaderComponent,
               HomeComponent,
               AdminComponent,
           
            
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPopoverModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
