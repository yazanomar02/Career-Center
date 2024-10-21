import { Component, inject, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { Subscription } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Provider } from "src/app/core/models/provider";
import { ProfileService } from "../../services/profile.service";
import { DialogJobComponent } from "src/app/pages/jobs/components/dialog-job/dialog-job.component";
import { MatDialog } from "@angular/material/dialog";
import { DialogProjectComponent } from "src/app/pages/projects/components/dialog-project/dialog-project.component";
import { EditProjectComponent } from "../edit-project/edit-project.component";
import { ProjectService } from "src/app/pages/projects/utilities/project.service";
import { Project } from "src/app/pages/projects/utilities/project";
import { EditJobComponent } from "../edit-job/edit-job.component";
import { Job } from "src/app/pages/jobs/utilities/job-vm";
import { JobService } from "src/app/pages/jobs/utilities/job.service";

export interface DialogData {
    type: string;
    id : string;
  }
@Component({
    selector: 'svs-portfolio',
    templateUrl: './display-info.component.html',
    styleUrls: ['./display-info.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
    readonly dialog = inject(MatDialog);
    private subs = new Subscription();
    modalRef?: BsModalRef;
    myServices: Provider[] = [];
    projects: Project[] = [];
    jobList: Job[] = [];
    idService!: string;
    actionType!: string;
    patchValue!: boolean;
    userId = localStorage.getItem('userId');
    userName= localStorage.getItem('userName');
    Email= localStorage.getItem('userEmail');
    fullName= localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    


    /**
     *
     */
    constructor(private profileService: ProfileService,
                private jobService: JobService,
                private modalService: BsModalService) {}
                matDialog = inject(MatDialog)
    ngOnInit(): void {
        this.getServices();
        this.getProjects();
        this.getJobs();
    }
    

    openDialog() {
        this.matDialog.open(
            DialogJobComponent, {
            width: '500px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
        }
        )
    }
    openProjectDialog(){
        this.matDialog.open(
            DialogProjectComponent, {
            width: '500px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
        }
        )
    }
    
    openModal(template: TemplateRef<void>,id: any,type:any,patchvalue: any) {
        this.patchValue = patchvalue;
        this.actionType = type;
        this.idService = id;
        this.modalRef = this.modalService.show(template);
    }
    openEditProject(type:any , id : any){
        console.log(type,id)
        this.matDialog.open(
            EditProjectComponent, {
            data:{type:type , id : id},
            width: '500px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
        }
        )

    }
    openEditJob(type:any , id : any){
        this.matDialog.open(
            EditJobComponent, {
            data:{type:type , id : id},
            width: '500px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
        }
        )

    }


    getJobs() {
        this.jobService.getJobs().subscribe(res => {
            this.jobList = res;
        })
    }

    getServices() {
        if('userId' in localStorage) {
            var id = `${localStorage.getItem('userId')}`;
        this.subs.add(this.profileService.getMyServices(id).subscribe(res => {
             this.myServices = res;
         }));
        }
    }

    closeModal() {
        this.getServices();
        this.modalService.hide(this.modalRef?.id);
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    getProjects() {
        this.profileService.getProjects().subscribe(response => {       
          const result : Project[] = response.body!;
          this.projects = result.filter(el=>el.userId==this.userId);
          console.log(this.userId,result,this.projects);
        });
    }
    


}




