import { Component, OnInit } from '@angular/core';
import { Holiday, HolidayService } from '../services/services/holiday.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-holiday',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent implements OnInit {
  holidays: Holiday[] = [];
  showForm = false;
  isEdit = false;
  holidayForm: Holiday = { holidayDate: '', description: '' };

  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {
    this.loadHolidays();
  }

  loadHolidays(): void {
    this.holidayService.getAllHolidays().subscribe(data => this.holidays = data);
  }

  toggleForm(edit: boolean = false, holiday?: Holiday): void {
    this.showForm = true;
    this.isEdit = edit;
    if (edit && holiday) {
      this.holidayForm = { ...holiday };
    } else {
      this.holidayForm = { holidayDate: '', description: '' };
    }
  }

  saveHoliday(): void {
    if (this.isEdit && this.holidayForm.holidayId) {
      this.holidayService.updateHoliday(this.holidayForm.holidayId, this.holidayForm)
        .subscribe(() => {
          this.loadHolidays();
          this.showForm = false;
        });
    } else {
      this.holidayService.addHoliday(this.holidayForm)
        .subscribe(() => {
          this.loadHolidays();
          this.showForm = false;
        });
    }
  }

  cancelForm(): void {
    this.showForm = false;
  }

  deleteHoliday(id: number): void {
    this.holidayService.deleteHoliday(id).subscribe(() => this.loadHolidays());
  }
}
