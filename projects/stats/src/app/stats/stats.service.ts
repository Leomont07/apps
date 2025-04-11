import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { LogServiceDecorator } from '../../../../shared/service-decorator';

@Injectable({ providedIn: 'root' })
@LogServiceDecorator
export class StatsService {
  private apiUrl = 'http://localhost/api/stats/';
  private jugadoresUrl = 'http://localhost/api/jugadores/';
  private partidosUrl = 'http://localhost/api/partidos/';
  private equiposUrl = 'http://localhost/api/equipos/';

  constructor(private http: HttpClient, private notifier: UpdateNotifierService) {}

  getStats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getJugadores(): Observable<any[]> {
    return this.http.get<any[]>(this.jugadoresUrl);
  }

  getPartidos(): Observable<any[]> {
    return this.http.get<any[]>(this.partidosUrl);
  }

  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.equiposUrl);
  }

  addStat(stat: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, stat).pipe(
      tap(() => this.notifier.notifyUpdate('stat'))
    );
  }

  updateStat(id: number, stat: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, stat).pipe(
      tap(() => this.notifier.notifyUpdate('stat'))
    );
  }

  deleteStat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.notifier.notifyUpdate('stat'))
    );
  }
}