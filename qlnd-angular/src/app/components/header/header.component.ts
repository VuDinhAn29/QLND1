import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRespose } from 'src/app/responses/user/UserRosponse';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userResponse?: UserRespose | null;
  isPopoverOpen = false;
    constructor(
      private userService: UserService,
      private tokenService: TokenService,
    private router: Router
      
    ){}
    ngOnInit() {
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
      
    }

    handleItemClick(index: number): void {
      //alert(`Clicked on "${index}"`);
      if (index === 0) {
        // debugger
        this.router.navigate(['/user-profile'])
      } else if (index === 1) {
        this.userService.removeUserFromLocalStorage()
        this.tokenService.removeToken()
        this.userResponse = this.userService.getUserResponseFromLocalStorage()
      }
      this.isPopoverOpen = false // Close the popover after clicking an item
    }

    togglePopover(event: Event): void {
      event.preventDefault()
      this.isPopoverOpen = !this.isPopoverOpen
    }
}
