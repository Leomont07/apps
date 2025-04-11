// projects/stats/src/app/stats/lista-stats/lista-stats.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadStats, addStat, deleteStat, updateStat } from '../store/stats.actions';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { StatsService } from '../stats/stats.service';
import { FutbolFactory } from '../../../../shared/futbol-factory';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2 class="text-center">Gestión de Estadísticas</h2>

      <!-- Formulario para agregar -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Agregar Estadística</h5>
          <div *ngIf="(jugadores$ | async) && (partidosWithTeamNames$ | async)">
            <div class="row">
              <div class="col-md-3">
                <select #playerId class="form-select">
                  <option value="" disabled selected>Selecciona un jugador</option>
                  <option *ngFor="let jugador of jugadores$ | async" [value]="jugador.id">{{ jugador.name }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <select #matchId class="form-select">
                  <option value="" disabled selected>Selecciona un partido</option>
                  <option *ngFor="let partido of partidosWithTeamNames$ | async" [value]="partido.id">
                    {{ partido.homeTeamName }} vs {{ partido.awayTeamName }} - {{ partido.date }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <input #goals class="form-control" placeholder="Goles" type="number" />
              </div>
              <div class="col-md-2">
                <input #assists class="form-control" placeholder="Asistencias" type="number" />
              </div>
              <div class="col-md-1">
                <button class="btn btn-primary w-100" (click)="add(playerId.value, matchId.value, goals.value, assists.value)">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario para editar -->
      <div class="card mb-4" *ngIf="editingStat">
        <div class="card-body">
          <h5 class="card-title">Editar Estadística</h5>
          <div *ngIf="(jugadores$ | async) && (partidosWithTeamNames$ | async)">
            <div class="row">
              <div class="col-md-3">
                <select class="form-select" [(ngModel)]="editingStat.player">
                  <option value="" disabled>Selecciona un jugador</option>
                  <option *ngFor="let jugador of jugadores$ | async" [value]="jugador.id">{{ jugador.name }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <select class="form-select" [(ngModel)]="editingStat.match">
                  <option value="" disabled>Selecciona un partido</option>
                  <option *ngFor="let partido of partidosWithTeamNames$ | async" [value]="partido.id">
                    {{ partido.homeTeamName }} vs {{ partido.awayTeamName }} - {{ partido.date }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
                <input class="form-control" [(ngModel)]="editingStat.goals" placeholder="Goles" type="number" />
              </div>
              <div class="col-md-2">
                <input class="form-control" [(ngModel)]="editingStat.assists" placeholder="Asistencias" type="number" />
              </div>
              <div class="col-md-1">
                <button class="btn btn-success w-100" (click)="update()">Guardar</button>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-12">
                <button class="btn btn-secondary w-100" (click)="cancelEdit()">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de estadísticas -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Estadísticas</h5>
          <ul class="list-group">
            <li *ngFor="let stat of statsWithNames$ | async" class="list-group-item">
              <span>{{ stat.playerName }} - {{ stat.matchName }} - Goles: {{ stat.goals }} - Asistencias: {{ stat.assists }}</span>
              <div>
                <button class="btn btn-warning btn-sm me-2" (click)="edit(stat)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="delete(stat.id)">Eliminar</button>
              </div>
            </li>
            <li *ngIf="(statsWithNames$ | async)?.length === 0" class="list-group-item text-muted">
              No hay estadísticas registradas.
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class ListaStatsComponent implements OnInit, OnDestroy {
  stats$: Observable<any[]>;
  jugadores$: Observable<any[]>;
  partidos$: Observable<any[]>;
  partidosWithTeamNames$: Observable<any[]>;
  statsWithNames$: Observable<any[]>;
  private updateSubscription!: Subscription;
  editingStat: any = null;

  constructor(
    private store: Store<{ stats: { stats: any[] } }>,
    private service: StatsService,
    private notifier: UpdateNotifierService
  ) {
    this.stats$ = this.store.select((state) => state.stats.stats);
    this.jugadores$ = this.service.getJugadores();
    this.partidos$ = this.service.getPartidos();

    // Mapear los nombres de los equipos en los partidos
    this.partidosWithTeamNames$ = combineLatest([this.partidos$, this.service.getEquipos()]).pipe(
      map(([partidos, equipos]) => {
        return partidos.map(partido => {
          const homeTeam = equipos.find(equipo => equipo.id === partido.home_team);
          const awayTeam = equipos.find(equipo => equipo.id === partido.away_team);
          return {
            ...partido,
            homeTeamName: homeTeam ? homeTeam.name : 'Desconocido',
            awayTeamName: awayTeam ? awayTeam.name : 'Desconocido'
          };
        });
      })
    );

    // Mapear los nombres de jugadores y partidos en las estadísticas
    this.statsWithNames$ = combineLatest([this.stats$, this.jugadores$, this.partidosWithTeamNames$]).pipe(
      map(([stats, jugadores, partidos]) => {
        return stats.map(stat => {
          const player = jugadores.find(jugador => jugador.id === stat.player);
          const match = partidos.find(partido => partido.id === stat.match);
          return {
            ...stat,
            playerName: player ? player.name : 'Desconocido',
            matchName: match ? `${match.homeTeamName} vs ${match.awayTeamName} - ${match.date}` : 'Desconocido'
          };
        });
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(loadStats());
    this.updateSubscription = this.notifier.update$.subscribe((entityType) => {
      if (entityType === 'stat') {
        this.store.dispatch(loadStats());
      }
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  add(playerId: string, matchId: string, goals: string, assists: string) {
    if (!playerId || !matchId || !goals || !assists) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const stat = FutbolFactory.createEntity('stat');
    stat.player = parseInt(playerId);
    stat.match = parseInt(matchId);
    stat.goals = parseInt(goals);
    stat.assists = parseInt(assists);

    this.service.addStat(stat).subscribe({
      next: (newStat) => {
        this.store.dispatch(addStat(newStat));
      },
      error: (error) => {
        console.error('Error al agregar stat:', error);
      }
    });
  }

  edit(stat: any) {
    this.editingStat = { ...stat };
  }

  update() {
    if (!this.editingStat.player || !this.editingStat.match || !this.editingStat.goals || !this.editingStat.assists) {
      console.error('Todos los campos son requeridos');
      return;
    }

    this.service.updateStat(this.editingStat.id, this.editingStat).subscribe({
      next: (updatedStat) => {
        console.log('Estadística actualizada exitosamente:', updatedStat);
        this.store.dispatch(updateStat(updatedStat));
        this.editingStat = null;
      },
      error: (error) => {
        console.error('Error al actualizar estadística:', error);
      }
    });
  }

  cancelEdit() {
    this.editingStat = null;
  }

  delete(id: number) {
    this.service.deleteStat(id).subscribe(() => this.store.dispatch(deleteStat({ id })));
  }
}