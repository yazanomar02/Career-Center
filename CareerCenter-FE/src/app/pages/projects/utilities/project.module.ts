import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectComponent } from '../components/display-projects/project.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogProjectComponent } from '../components/dialog-project/dialog-project.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ProjectComponent,
    DialogProjectComponent
    
  ],
  imports: [
    FormsModule,
    MatDialogModule,
    TranslateModule,
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild([
        {path: "all", component:ProjectComponent},
        {path: "this/Offers", component:ProjectComponent},
    ]),
    SharedModule
  ],

})
export class ProjectModule { }
