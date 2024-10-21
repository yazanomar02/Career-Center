import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'svs-setup',
  templateUrl: './local-setup.component.html',
  styleUrls: ['./local-setup.component.css'],
})
export class SetupComponent implements OnInit {
  /**
   *
   */
  constructor(private route: Router, private transServes: TranslateService) {}

  ngOnInit(): void {}

  selectCountry(event: any) {
    localStorage.setItem('country', event.target.value);
  }
  selectLanguage(event: any) {
    this.transServes.use(event.target.value);
    localStorage.setItem('lan', event.target.value);
  }
  selectTheme(event: any) {
    localStorage.setItem('theme', event.target.value);
  }
  continue() {
    this.route.navigate(['/welcome']);
  }
}
