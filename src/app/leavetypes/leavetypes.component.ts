import { Component } from '@angular/core';
import { LeaveType, LeavetypesService } from '../services/services/leavetypes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../services/services/alert.service';


@Component({
  selector: 'app-leavetypes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './leavetypes.component.html',
  styleUrl: './leavetypes.component.css'
})
export class LeavetypesComponent {
  leaveTypes: LeaveType[] = [];

  showForm = false;
  isEdit = false;
  editId?: number;

  form: LeaveType = {
    leaveCode: '',
    leaveName: '',
    annualAllocation: 0,
    carryForward: false,
    leaveTypeId: 0
  };

  constructor(private service: LeavetypesService,private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.service.getAll().subscribe(res => this.leaveTypes = res);
  }

  toggleForm(edit = false, lt?: LeaveType) {
    this.showForm = true;
    this.isEdit = edit;

    if (edit && lt) {
      this.editId = lt.leaveTypeId;
      this.form = { ...lt };
    } else {
      this.editId = undefined;
      this.form = {
        leaveCode: '',
        leaveName: '',
        annualAllocation: 0,
        carryForward: false,
        leaveTypeId:0
      };
    }
  }

  save() {
    if (this.isEdit && this.editId) {
      this.service.update(this.editId, this.form).subscribe(() => {
        this.alertService.success('Leave type updated');
        this.showForm = false;
        this.loadAll();
      });
    } else {
      this.service.create(this.form).subscribe(() => {
        this.alertService.success('Leave type created');
        this.showForm = false;
        this.loadAll();
      });
    }
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this record?')) return;

    this.service.delete(id).subscribe(() => this.loadAll());
  }
  
  

}
