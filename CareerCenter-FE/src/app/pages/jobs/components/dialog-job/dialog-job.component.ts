




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../utilities/job-vm';
import { ProviderService } from 'src/app/pages/providers/services/provider.service';
import { JobService } from '../../utilities/job.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'svs-dialog-job',
    templateUrl: './dialog-job.component.html',
    styleUrls: ['./dialog-job.component.css']
})

export class DialogJobComponent implements OnInit {
  private subs = new Subscription();
  addJobForm!: FormGroup;
  job!: Job;
  serviceId: any;
  filteredServices: any;
  servicesList: any;
  id: any;
  



  constructor(private fb: FormBuilder,
    private providerService: ProviderService,
    private jobServiece: JobService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.addJobForm = this.fb.group({
      
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      count: ['', [Validators.required, Validators.min(1)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
    
  }

  submitJob(): void {
    // this.job.isStoped=true;
    // this.jobServiece.postJob(this.id,this.job)
    // console.log(this.id,this.job)

    this.job = new Job(this.addJobForm.value);
    this.job.isStoped = true;
    console.log(this.job)
        this.subs.add(this.jobServiece.postJob(this.id,this.job).subscribe(res => 
            {
                this.toastr.success('Job has been added successfully', 'Career Center');
            }
        ));
  }

  categoriesList$ = this.providerService.categories$;
  onClickCategory(event: any) {
   
        this.id = event.target.value;
  
        
  }
  
}
