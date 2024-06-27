import { Component, OnInit } from '@angular/core';
import { PopoverRef } from '../popover/popover-ref';
import { AuthenticationService } from 'src/app/pages/pages/auth/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(private readonly popoverRef: PopoverRef, 
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  close(): void {
    setTimeout(() => this.popoverRef.close(), 250);
  }

  logout() {
    /** Wait for animation to complete and then close */
    this.authService.logout();
    setTimeout(() => this.popoverRef.close(), 250);
    this.router.navigate(['']);
  }
}
