import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Warning {
  id: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class WarningsService {
  private warnings = new BehaviorSubject<Warning[]>([]);
  warnings$: Observable<Warning[]> = this.warnings.asObservable();

  addWarning(message: string): void {
    const newWarning: Warning = {
      id: new Date().getTime().toString(),
      message
    };
    const currentWarnings = this.warnings.getValue();
    this.warnings.next([...currentWarnings, newWarning]);
  }

  removeWarning(warningId: string): void {
    const currentWarnings = this.warnings.getValue();
    this.warnings.next(currentWarnings.filter(warning => warning.id !== warningId));
  }

  clearWarnings(): void {
    this.warnings.next([]);
  }
}