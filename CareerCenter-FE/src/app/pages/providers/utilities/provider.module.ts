import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderComponent } from '../components/display-categories-services-providers/provider.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { RegisterComponent } from '../components/register-as-provider/register.component';
import { TranslateModule } from '@ngx-translate/core';




@NgModule({
  declarations: [
    ProviderComponent,
    RegisterComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule.forChild([
      {path: "", component:ProviderComponent},
      {path: "register-as-provider",component:RegisterComponent}
    ]),
    SharedModule,
    StoreModule.forFeature('providers',{})
  ],

})
export class ProviderModule { }
