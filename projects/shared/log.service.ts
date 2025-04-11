import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  log(message: string, ...args: any[]) {
    console.log(`[Log] ${message}`, ...args);
  }
}