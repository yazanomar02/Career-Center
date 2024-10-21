import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobComponent } from '../components/display-jobs/job.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { DialogJobComponent } from '../components/dialog-job/dialog-job.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        JobComponent,
        DialogJobComponent
    ],
    imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        TranslateModule,
        CommonModule,
        TranslateModule,
        CommonModule,
        RouterModule.forChild([
            { path: "find-job", component: JobComponent }
        ]),
        SharedModule
    ]
})
export class JobModule { }
