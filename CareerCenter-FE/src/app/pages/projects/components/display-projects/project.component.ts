import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../utilities/project';
import { ProjectService } from '../../utilities/project.service';
import { DialogProjectComponent } from '../dialog-project/dialog-project.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy{

  projects: Project[] = [];
  pageSize = 3; // تحديد حجم الصفحة
  currentPage = 1; // تحديد الصفحة الحالية
  totalItems = 0;
  totalPageCount = 0;


  /**
   *
   */
  constructor(private projectService:ProjectService,
              private matDialog: MatDialog
  ) {}
   
    ngOnInit(): void {
      this.getProjects();
    }

    onPageChange(page: any) {
      this.currentPage = page;
      this.getProjects();
    }
    getProjects() {
      this.projectService.getProjects(this.currentPage, this.pageSize).subscribe(response => {       
        this.projects = response.body!;
 
        const paginationHeader = response.headers.get('X-Pagination');

        if (paginationHeader) {
          const pagination = JSON.parse(paginationHeader);
          this.totalItems = pagination.TotalItemCount;
          this.totalPageCount = pagination.TotalPageCount;
          this.currentPage = pagination.PageNumber;
        }
      });
    }

    ngOnDestroy(): void {
    }

    openDialog() {
      this.matDialog.open(
          DialogProjectComponent, {
          width: '500px',
          enterAnimationDuration: '100ms',
          exitAnimationDuration: '100ms',
      }
      )
  }
}