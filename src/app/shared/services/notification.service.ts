import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private alertSubject = new BehaviorSubject<any>({
    message: '',
    type: AlertType.Info,
    show: false,
  });

  alert$ = this.alertSubject.asObservable();

  showAlert(message: string, type: AlertType = AlertType.Info) {
    this.alertSubject.next({message, type, show: true });

    setTimeout(() => {
      this.alertSubject.next({ ...this.alertSubject.value, show: false });
    }, 2000);
  }

  succes(message: string){
    this.showAlert(message, AlertType.Success)
  }

  error(message: string){
    this.showAlert(message, AlertType.Error)
  }

  info(message: string){
    this.showAlert(message, AlertType.Info)
  }
}
