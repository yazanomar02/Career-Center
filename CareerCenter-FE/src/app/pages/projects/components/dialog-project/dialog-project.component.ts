import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../utilities/project';
import { ProjectService } from '../../utilities/project.service';

@Component({
  selector: 'svs-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.css'],
})
export class DialogProjectComponent {
  projectForm!: FormGroup;
  projectModel!: Project;
  project!: Project;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  submitProject() {
    if (this.projectForm.valid) {
      // this.projectModel = new Project(this.projectForm.value);
      this.project = new Project(this.projectForm.value);
      this.project.userId = localStorage.getItem('userId') || '';
      const date = new Date().toISOString();
      this.project.createdDate = date;
      this.projectService.addProject(this.project).subscribe({
        next: () => {
          this.toastr.success(
            'Your project has been successfully added.',
            'Career Center'
          );
        },
        error: () => {
          this.toastr.error(
            'An error occurred while adding your project.',
            'Career Center'
          );
        },
      });
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Warning');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.projectForm.patchValue({
          imgUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
