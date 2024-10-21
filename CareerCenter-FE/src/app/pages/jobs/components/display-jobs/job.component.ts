import { Component, OnInit, TemplateRef } from '@angular/core';
import { Job } from '../../utilities/job-vm';
import { JobService } from '../../utilities/job.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogJobComponent } from '../dialog-job/dialog-job.component';
import { ProviderService } from 'src/app/pages/providers/services/provider.service';


@Component({
    selector: 'svs-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

    jobList: Job[] = []

    /**
     *
     */
    constructor(private matDialog: MatDialog,
        private providerService: ProviderService,
         private jobService: JobService) { }


    openDialog() {
        this.matDialog.open(
            DialogJobComponent, {
            width: '500px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
        }
        )
    }

    
    ngOnInit(): void {
        this.getJobs();
    }


    getJobs() {
        this.jobService.getJobs().subscribe(res => {
            this.jobList = res;
        })
    }


    categoriesList$ = this.providerService.categories$;
}
