// projects/partidos/src/app/partidos/lista-partidos/lista-partidos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPartidos, addPartido, deletePartido, updatePartido } from '../store/partidos.actions';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { PartidosService } from '../partidos/partidos.service';
import { FutbolFactory } from '../../../../shared/futbol-factory';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-partidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2 class="text-center">Gestión de Partidos</h2>

      <!-- Formulario para agregar -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Agregar Partido</h5>
          <div *ngIf="equipos$ | async as equipos">
            <div class="row">
              <div class="col-md-4">
                <select #homeTeamId class="form-select">
                  <option value="" disabled selected>Selecciona el equipo local</option>
                  <option *ngFor="let equipo of equipos" [value]="equipo.id">{{ equipo.name }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <select #awayTeamId class="form-select">
                  <option value="" disabled selected>Selecciona el equipo visitante</option>
                  <option *ngFor="let equipo of equipos" [value]="equipo.id">{{ equipo.name }}</option>
                </select>
              </div>
              <div class="col-md-3">
                <input #date class="form-control" placeholder="Fecha (YYYY-MM-DD)" />
              </div>
              <div class="col-md-1">
                <button class="btn btn-primary w-100" (click)="add(homeTeamId.value, awayTeamId.value, date.value)">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario para editar -->
      <div class="card mb-4" *ngIf="editingPartido">
        <div class="card-body">
          <h5 class="card-title">Editar Partido</h5>
          <div *ngIf="equipos$ | async as equipos">
            <div class="row">
              <div class="col-md-4">
                <select class="form-select" [(ngModel)]="editingPartido.home_team">
                  <option value="" disabled>Selecciona el equipo local</option>
                  <option *ngFor="let equipo of equipos" [value]="equipo.id">{{ equipo.name }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <select class="form-select" [(ngModel)]="editingPartido.away_team">
                  <option value="" disabled>Selecciona el equipo visitante</option>
                  <option *ngFor="let equipo of equipos" [value]="equipo.id">{{ equipo.name }}</option>
                </select>
              </div>
              <div class="col-md-3">
                <input class="form-control" [(ngModel)]="editingPartido.date" placeholder="Fecha (YYYY-MM-DD)" />
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

      <!-- Lista de partidos -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Partidos</h5>
          <ul class="list-group">
            <li *ngFor="let partido of partidosWithTeamNames$ | async" class="list-group-item">
              <span>{{ partido.homeTeamName }} vs {{ partido.awayTeamName }} - {{ partido.date }}</span>
              <div>
                <button class="btn btn-warning btn-sm me-2" (click)="edit(partido)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="delete(partido.id)">Eliminar</button>
              </div>
            </li>
            <li *ngIf="(partidosWithTeamNames$ | async)?.length === 0" class="list-group-item text-muted">
              No hay partidos registrados.
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class ListaPartidosComponent implements OnInit, OnDestroy {
  partidos$: Observable<any[]>;
  equipos$: Observable<any[]>;
  partidosWithTeamNames$: Observable<any[]>;
  private updateSubscription!: Subscription;
  editingPartido: any = null;

  constructor(
    private store: Store<{ partidos: { partidos: any[] } }>,
    private service: PartidosService,
    private notifier: UpdateNotifierService
  ) {
    this.partidos$ = this.store.select((state) => state.partidos.partidos);
    this.equipos$ = this.service.getEquipos();

    // Combinar partidos y equipos para mapear los nombres
    this.partidosWithTeamNames$ = combineLatest([this.partidos$, this.equipos$]).pipe(
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
  }

  ngOnInit() {
    this.store.dispatch(loadPartidos());
    this.updateSubscription = this.notifier.update$.subscribe((entityType) => {
      if (entityType === 'partido') {
        this.store.dispatch(loadPartidos());
      }
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  add(homeTeamId: string, awayTeamId: string, date: string) {
    const partido = FutbolFactory.createEntity('partido');
    partido.home_team = parseInt(homeTeamId); 
    partido.away_team = parseInt(awayTeamId);
    partido.date = date;
    partido.result = '';
    this.service.addPartido(partido).subscribe((newPartido) => this.store.dispatch(addPartido(newPartido)));
  }

  edit(partido: any) {
    this.editingPartido = { ...partido };
  }

  update() {
    if (!this.editingPartido.home_team || !this.editingPartido.away_team || !this.editingPartido.date) {
      console.error('Todos los campos son requeridos');
      return;
    }

    this.service.updatePartido(this.editingPartido.id, this.editingPartido).subscribe({
      next: (updatedPartido) => {
        console.log('Partido actualizado exitosamente:', updatedPartido);
        this.store.dispatch(updatePartido(updatedPartido));
        this.editingPartido = null;
      },
      error: (error) => {
        console.error('Error al actualizar partido:', error);
      }
    });
  }

  cancelEdit() {
    this.editingPartido = null;
  }

  delete(id: number) {
    this.service.deletePartido(id).subscribe(() => this.store.dispatch(deletePartido({ id })));
  }
}