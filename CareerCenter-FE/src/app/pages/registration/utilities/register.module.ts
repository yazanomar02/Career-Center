import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../components/user-register/user-register.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SetupComponent } from '../components/local-setup/local-setup.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SetupComponent, UserRegisterComponent],
  imports: [
    TranslateModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UserRegisterComponent },
      { path: 'selection-page', component: SetupComponent },
    ]),
  ],
})
export class RegisterModule {}
