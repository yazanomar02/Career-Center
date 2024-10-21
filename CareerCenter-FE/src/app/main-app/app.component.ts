import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UtilitiesService } from '../core/services/utilities.service';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'svs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  username!: string;
  role!: string;
  showHeader: boolean = false;
  refresh: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private router: Router,
    private utilitiesService: UtilitiesService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }
  ngOnInit(): void {
   this.userHandler();
   this.listenRoutingEvent();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }


  listenRoutingEvent() {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(
      (event: any) => {
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
    this.router.navigate(['/'])
  }

  userHandler() {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(
      (event: any) => {
          this.username = `${localStorage.getItem('userName')}`;
          const rolesString = localStorage.getItem('roles');
          if (rolesString) {
            this.isAdmin = rolesString.includes('Admin') == true ? true : false
           this.role = this.utilitiesService.sortRoles(rolesString).replace(/["\[\]]/g,'');
         }
    });
  }

}