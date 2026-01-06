import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Holiday {
  holidayId?: number;
  holidayDate: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private apiUrl = `${environment.apiUrl}/api/holidays`;

  constructor(private http: HttpClient) { }

  getAllHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrl);
  }

  addHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(this.apiUrl, holiday);
  }

  updateHoliday(id: number, holiday: Holiday): Observable<Holiday> {
    return this.http.put<Holiday>(`${this.apiUrl}/${id}`, holiday);
  }

  deleteHoliday(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


