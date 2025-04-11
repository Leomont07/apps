import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateNotifierService {
  private updateSubject = new Subject<string>();
  update$ = this.updateSubject.asObservable();

  notifyUpdate(entityType: string) {
    this.updateSubject.next(entityType);
  }
}