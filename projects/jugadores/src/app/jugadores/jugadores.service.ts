// projects/jugadores/src/app/jugadores/jugadores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { LogServiceDecorator } from '../../../../shared/service-decorator';

@Injectable({ providedIn: 'root' })
@LogServiceDecorator
export class JugadoresService {
  private apiUrl = 'http://localhost/api/jugadores/';
  private equiposUrl = 'http://localhost/api/equipos/';

  constructor(private http: HttpClient, private notifier: UpdateNotifierService) {}

  getJugadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.equiposUrl);
  }

  addJugador(jugador: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, jugador).pipe(
      tap(() => this.notifier.notifyUpdate('player'))
    );
  }

  updateJugador(id: number, jugador: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, jugador).pipe(
      tap(() => this.notifier.notifyUpdate('player'))
    );
  }

  deleteJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.notifier.notifyUpdate('player'))
    );
  }
}