// projects/equipos/src/app/equipos/lista-equipos/lista-equipos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEquipos, addEquipo, deleteEquipo, updateEquipo } from '../store/equipos.actions';
import { Observable, Subscription } from 'rxjs';
import { EquiposService } from '../equipos/equipos.service';
import { FutbolFactory } from '../../../../shared/futbol-factory';
import { UpdateNotifierService } from '../../../../shared/update-notifier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-equipos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2 class="text-center">Gestión de Equipos</h2>

      <!-- Formulario para agregar -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Agregar Equipo</h5>
          <div class="row">
            <div class="col-md-5">
              <input #name class="form-control" placeholder="Nombre del Equipo" />
            </div>
            <div class="col-md-5">
              <input #city class="form-control" placeholder="Ciudad" />
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary w-100" (click)="add(name.value, city.value)">Agregar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario para editar -->
      <div class="card mb-4" *ngIf="editingEquipo">
        <div class="card-body">
          <h5 class="card-title">Editar Equipo: {{ editingEquipo.name }}</h5>
          <div class="row">
            <div class="col-md-5">
              <input class="form-control" [(ngModel)]="editingEquipo.name" placeholder="Nombre del Equipo" />
            </div>
            <div class="col-md-5">
              <input class="form-control" [(ngModel)]="editingEquipo.city" placeholder="Ciudad" />
            </div>
            <div class="col-md-2">
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

      <!-- Lista de equipos -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Equipos</h5>
          <ul class="list-group">
            <li *ngFor="let equipo of equipos$ | async" class="list-group-item">
              <span>{{ equipo.name }} - {{ equipo.city }}</span>
              <div>
                <button class="btn btn-warning btn-sm me-2" (click)="edit(equipo)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="delete(equipo.id)">Eliminar</button>
              </div>
            </li>
            <li *ngIf="(equipos$ | async)?.length === 0" class="list-group-item text-muted">
              No hay equipos registrados.
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class ListaEquiposComponent implements OnInit, OnDestroy {
  equipos$: Observable<any[]>;
  private updateSubscription!: Subscription;
  editingEquipo: any = null;

  constructor(
    private store: Store<{ equipos: { equipos: any[] } }>,
    private service: EquiposService,
    private notifier: UpdateNotifierService
  ) {
    this.equipos$ = this.store.select((state) => state.equipos.equipos);
  }

  ngOnInit() {
    this.store.dispatch(loadEquipos());
    this.updateSubscription = this.notifier.update$.subscribe((entityType) => {
      if (entityType === 'equipo') {
        this.store.dispatch(loadEquipos());
      }
    });
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  add(name: string, city: string) {
    const equipo = FutbolFactory.createEntity('equipo');
    equipo.name = name;
    equipo.city = city;
    this.service.addEquipo(equipo).subscribe((newEquipo) => this.store.dispatch(addEquipo(newEquipo)));
  }

  edit(equipo: any) {
    this.editingEquipo = { ...equipo };
  }

  update() {
    if (!this.editingEquipo.name || !this.editingEquipo.city) {
      console.error('Todos los campos son requeridos');
      return;
    }

    this.service.updateEquipo(this.editingEquipo.id, this.editingEquipo).subscribe({
      next: (updatedEquipo) => {
        console.log('Equipo actualizado exitosamente:', updatedEquipo);
        this.store.dispatch(updateEquipo(updatedEquipo));
        this.editingEquipo = null;
      },
      error: (error) => {
        console.error('Error al actualizar equipo:', error);
      }
    });
  }

  cancelEdit() {
    this.editingEquipo = null;
  }

  delete(id: number) {
    this.service.deleteEquipo(id).subscribe(() => this.store.dispatch(deleteEquipo({ id })));
  }
}