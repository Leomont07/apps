// projects/equipos/src/app/equipos/equipos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { LogServiceDecorator } from '../../../../shared/service-decorator';
import { LogService } from '../../../../shared/log.service';

@Injectable({ providedIn: 'root' })
@LogServiceDecorator
export class EquiposService {
  private apiUrl = 'http://localhost/api/equipos/';

  constructor(private http: HttpClient, private notifier: UpdateNotifierService, private logService: LogService) {
    this.logService.log('Service EquiposService instantiated');
  }

  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEquipo(equipo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, equipo).pipe(
      tap(() => this.notifier.notifyUpdate('equipo'))
    );
  }

  updateEquipo(id: number, equipo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, equipo).pipe(
      tap(() => this.notifier.notifyUpdate('equipo'))
    );
  }

  deleteEquipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.notifier.notifyUpdate('equipo'))
    );
  }
}