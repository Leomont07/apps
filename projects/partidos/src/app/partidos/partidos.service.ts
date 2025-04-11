// projects/partidos/src/app/partidos/partidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { LogServiceDecorator } from '../../../../shared/service-decorator';

@Injectable({ providedIn: 'root' })
@LogServiceDecorator
export class PartidosService {
  private apiUrl = 'http://localhost/api/partidos/';
  private equiposUrl = 'http://localhost/api/equipos/';

  constructor(private http: HttpClient, private notifier: UpdateNotifierService) {}

  getPartidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.equiposUrl);
  }

  addPartido(partido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, partido).pipe(
      tap(() => this.notifier.notifyUpdate('match'))
    );
  }

  updatePartido(id: number, partido: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, partido).pipe(
      tap(() => this.notifier.notifyUpdate('match'))
    );
  }

  deletePartido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.notifier.notifyUpdate('match'))
    );
  }
}