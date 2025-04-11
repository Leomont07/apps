import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WarningsComponent } from './warnings/warnings.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WarningsComponent],
  template: `
    <div class="container-fluid">
      <app-warnings></app-warnings>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
          <a class="navbar-brand" href="/">Gestión de Jugadores.</a>
        </div>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {}
