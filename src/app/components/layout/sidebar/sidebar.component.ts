import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  //selectedOption: boolean = false;
  isFeature1Route:boolean = false
  isFeature2Route:boolean = false
  constructor(private router: Router,public dbService:DbService) { 
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.isFeature1Route = event.url.includes('/feature1');
      this.isFeature2Route = event.url.includes('/feature2');
      console.log('feature1',this.isFeature1Route);
      console.log('feature2',this.isFeature2Route);
      
    });
  }

  ngOnInit(): void {
   
  }
 
  

}
