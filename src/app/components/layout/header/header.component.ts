import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSticky: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = offset > 50; // Adjust the value as per your needs
  }
  @Output() sidebarToggle = new EventEmitter<void>();
  constructor(private router: Router, public dbService: DbService) { }
  ngOnInit(): void {
    console.log('hi');
    const userData = this.dbService.getUserData();
    if (userData) {
      this.dbService.isUserLoggedIn = true;
    }

  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  logout() {
    this.dbService.isUserLoggedIn = false;
    this.router.navigate(['/login']);
    sessionStorage.clear();
  }
  profile(empId:number){
    this.router.navigate(['/profile',empId])
  }

}
