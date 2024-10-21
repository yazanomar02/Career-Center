import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, ProfileComponent } from '../display-info/display-info.component';
import { ProfileService } from '../../services/profile.service';
import { Project } from 'src/app/pages/projects/utilities/project';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'svs-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  
  constructor(
    private profileService : ProfileService,
    private toastr: ToastrService
  ){
    
  }
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ProfileComponent>);
  editProjectForm! : FormGroup;
  project = { 
    title: '',
    description : ''
  };
  type: any;
  id : any;
  editProject() {
    this.profileService.updateProject(this.data.id,this.project).subscribe(res => {
            
      this.toastr.success('The project has been updated successfully', 'Career Center');
    });
    
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProject(){
    this.profileService.deleteProject(this.data.id).subscribe(res => {
            
      this.toastr.success('The project has been deleted successfully', 'Career Center');
    });
  }
}
