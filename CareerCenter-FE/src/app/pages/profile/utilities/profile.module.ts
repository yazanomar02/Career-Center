import { NgModule } from '@angular/core';
import {  ProfileComponent } from '../components/display-info/display-info.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProviderComponent } from '../components/edit-provider/edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EditJobComponent } from '../components/edit-job/edit-job.component';
import { EditProjectComponent } from '../components/edit-project/edit-project.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        
        ProfileComponent,
        EditProviderComponent,
        EditJobComponent,
        EditProjectComponent
    ],
    imports: [
        FormsModule,
        TranslateModule,
        SharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        RouterModule.forChild([
            {path: 'profile', component:ProfileComponent}
        ])
    ]
})

export class ProfileModule {}