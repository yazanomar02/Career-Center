import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-panel.service';

@Component({
  selector: 'svs-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {
  /**
   *
   */
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    
  }

  audits$ = this.adminService.audits$;

}
