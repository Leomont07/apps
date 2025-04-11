// projects/jugadores/src/app/jugadores/lista-jugadores/lista-jugadores.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadJugadores, addJugador, deleteJugador, updateJugador } from '../store/jugadores.actions';
import { Observable, Subscription } from 'rxjs';
import { JugadoresService } from '../jugadores/jugadores.service';
import { FutbolFactory } from '../../../../shared/futbol-factory';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-jugadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2 class="text-center">Gestión de Jugadores</h2>

      <!-- Formulario para agregar -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Agregar Jugador</h5>
          <div *ngIf="equipos$ | async as equipos">
            <div class="row">
              <div class="col-md-4">
                <input #name class="form-control" placeholder="Nombre del Jugador" />
              </div>
              <div class="col-md-4">
                <input #position class="form-control" placeholder="Posición" />
              </div>
              <div class="col-md-3">
                <select #teamId class="form-select">
                  <option value="" disabled selected>Selecciona un equipo</option>
                  <option *ngFor="let equipo of equipos" [value]="equipo.id">{{ equipo.name }}</option>
                </select>
              </div>
              <div class="col-md-1">
                <button class="btn btn-primary w-100" (click)="add(name.value, position.value, teamId.value)">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario para editar -->
      <div class="card mb-4" *ngIf="editingJugador">
        <div class="card-body">
          <h5 class="card-title">Editar Jugador: {{ editingJugador.name }}</h5>
          <div *ngIf="equipos$ | async as equipos">
            <div class="row">
              <div class="col-md-4">
                <input class="form-control" [(ngModel)]="editingJugador.name" placeholder="Nombre del Jugador" />
              </div>
              <div class="col-md-4">
                <input class="form-control" [(ngModel)]="editingJugador.position" placeholder="Posición" />
              </div>
              <div class="col-md-3">
                <select class="form-select" [(ngModel)]="editingJugador.team">
                  <option value="" disabled>Selecciona un equipo</option>
                  <option *ngFor="let equipo of equipos" [value]="equipo.id">{{ equipo.name }}</option>
                </select>
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

      <!-- Lista de jugadores -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Jugadores</h5>
          <ul class="list-group">
            <li *ngFor="let jugador of jugadores$ | async" class="list-group-item">
              <span>{{ jugador.name }} - {{ jugador.position }}</span>
              <div>
                <button class="btn btn-warning btn-sm me-2" (click)="edit(jugador)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="delete(jugador.id)">Eliminar</button>
              </div>
            </li>
            <li *ngIf="(jugadores$ | async)?.length === 0" class="list-group-item text-muted">
              No hay jugadores registrados.
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class ListaJugadoresComponent implements OnInit, OnDestroy {
  jugadores$: Observable<any[]>;
  equipos$: Observable<any[]>;
  private updateSubscription!: Subscription;
  editingJugador: any = null;

  constructor(
    private store: Store<{ jugadores: { jugadores: any[] } }>,
    private service: JugadoresService,
    private notifier: UpdateNotifierService
  ) {
    this.jugadores$ = this.store.select((state) => state.jugadores.jugadores);
    this.equipos$ = this.service.getEquipos();
  }

  ngOnInit() {
    this.store.dispatch(loadJugadores());
    this.updateSubscription = this.notifier.update$.subscribe((entityType) => {
      if (entityType === 'jugador') {
        this.store.dispatch(loadJugadores());
      }
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  add(name: string, position: string, teamId: string) {
    if (!name || !position || !teamId) {
      console.error('Todos los campos son requeridos');
      return;
    }

    try {
      const jugador = FutbolFactory.createEntity('jugador');
      jugador.name = name;
      jugador.position = position;
      jugador.team = parseInt(teamId);

      console.log('Agregando jugador:', jugador);

      this.service.addJugador(jugador).subscribe({
        next: (newJugador) => {
          console.log('Jugador agregado exitosamente:', newJugador);
          this.store.dispatch(addJugador(newJugador));
        },
        error: (error) => {
          console.error('Error al agregar jugador:', error);
        }
      });
    } catch (error) {
      console.error('Error al crear el jugador:', error);
    }
  }

  edit(jugador: any) {
    // Clonamos el jugador para evitar modificar el objeto original directamente
    this.editingJugador = { ...jugador };
  }

  update() {
    if (!this.editingJugador.name || !this.editingJugador.position || !this.editingJugador.team) {
      console.error('Todos los campos son requeridos');
      return;
    }

    this.service.updateJugador(this.editingJugador.id, this.editingJugador).subscribe({
      next: (updatedJugador) => {
        console.log('Jugador actualizado exitosamente:', updatedJugador);
        this.store.dispatch(updateJugador(updatedJugador));
        this.editingJugador = null;
      },
      error: (error) => {
        console.error('Error al actualizar jugador:', error);
      }
    });
  }

  cancelEdit() {
    this.editingJugador = null;
  }

  delete(id: number) {
    this.service.deleteJugador(id).subscribe({
      next: () => {
        this.store.dispatch(deleteJugador({ id }));
      },
      error: (error) => {
        console.error('Error al eliminar jugador:', error);
      }
    });
  }
}