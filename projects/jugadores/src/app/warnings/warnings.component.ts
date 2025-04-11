// projects/jugadores/src/app/warnings/warnings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningsService, Warning } from '../../../../shared-warnings/src/lib/shared-warnings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-warnings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="warnings-container">
      <div class="alert alert-warning alert-dismissible fade show" role="alert" *ngFor="let warning of warnings$ | async">
        <strong>Advertencia:</strong> {{ warning.message }}
        <button type="button" class="btn-close" (click)="dismiss(warning.id)" aria-label="Close"></button>
      </div>
    </div>
  `,
  styles: [`
    .warnings-container {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 1000;
      max-width: 400px;
    }
  `]
})
export class WarningsComponent implements OnInit {
  warnings$: Observable<Warning[]>;

  constructor(private warningsService: WarningsService) {
    this.warnings$ = this.warningsService.warnings$;
  }

  ngOnInit() {
    this.warningsService.clearWarnings();
  }

  dismiss(warningId: string) {
    this.warningsService.removeWarning(warningId);
  }
}