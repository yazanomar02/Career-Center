import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { EditProvider } from "./edit-model";
import { ToastrService } from "ngx-toastr";
import { ProfileService } from "../../services/profile.service";

@Component({
    selector: 'edit-provider',
    templateUrl: './edit.component.html'
})

export class EditProviderComponent implements OnInit, OnDestroy{
    private subs = new Subscription();
    EditForm!: FormGroup;
    edit!: EditProvider;
    @Output() closeModal = new EventEmitter<boolean>();
    @Input() id!: string;
    @Input() type!: string;
    @Input() patchValue!: boolean;
    messageForStopService!: string;
    /**
     *
     */
    constructor(private fb: FormBuilder,
                private profileService: ProfileService,
                private toastr: ToastrService) {
        this.EditForm =  this.fb.group({
            skills: ['',Validators.required],
            title: ['',Validators.required],
            description: ['',Validators.required],
            durationTime: ['',Validators.required],
            serviceMode: ['',Validators.required],
            phone: ['',Validators.required],
            telegram: ['',Validators.required]
        })
    }
    
    ngOnInit(): void {
        this.messageForStopService = "Do you really want to stop this service?";
    }

    ngOnDestroy(): void {
       
    }

    editService() {
        this.edit = new EditProvider(this.EditForm.value);
        this.subs.add(this.profileService.updateMyService(this.id,this.edit).subscribe(res => 
            {
                this.closeModal.emit(true)
                this.toastr.success('Service data has been updated successfully', 'Career Center');
            }
        ));
    }
    stopService() {
        this.profileService.patchMyService(this.id,this.patchValue).subscribe(res => {
            this.closeModal.emit(true)
            this.toastr.success('The service has been stopped successfully', 'Career Center');
        });
    }
    resumeService() {
        this.profileService.patchMyService(this.id,this.patchValue).subscribe(res => {
            this.closeModal.emit(true)
            this.toastr.success('The service has been successfully resumed', 'Career Center');
        });
    }
    deleteService() {
        this.profileService.deleteMyService(this.id).subscribe(res => {
            this.closeModal.emit(true);
            this.toastr.success('The service has been deleted successfully', 'Career Center');
        });
    }




}