import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { UserComponent } from '../components/users/user.component';
import { AuditingComponent } from '../components/auditing/auditing.component';
import { TranslateModule } from '@ngx-translate/core';







@NgModule({
  declarations: [
    AuditingComponent,
    UserComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule.forChild([
        {path: 'dashboard/users',component:UserComponent},
        {path: 'dashboard/Audits',component:AuditingComponent}
    ]),
    SharedModule,
  ],

})
export class AdminPanelModule { }
