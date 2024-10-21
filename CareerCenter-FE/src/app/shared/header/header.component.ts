import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
@Component({
  selector: 'shared-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'ClientApp';
  username!: string;
  role!: string;
  showHeader: boolean = false;
  refresh: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private router: Router,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.userHandler();
    this.listenRoutingEvent();
  }

  listenRoutingEvent() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showHeader = !this.utilitiesService.isExcludedPage(
          this.utilitiesService.extractPageName(event.urlAfterRedirects)
        );
      });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('roles');
    this.router.navigate(['/']);
  }

  userHandler() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.username = `${localStorage.getItem('userName')}`;
        const rolesString = localStorage.getItem('roles');
        if (rolesString) {
          this.isAdmin = rolesString.includes('Admin') == true ? true : false;
          this.role = this.utilitiesService
            .sortRoles(rolesString)
            .replace(/["\[\]]/g, '');
        }
      });
  }
}
