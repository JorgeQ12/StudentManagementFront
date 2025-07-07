import { Component, inject } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { AlertModalComponent } from './shared/components/alert-modal.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AlertModalComponent],
  template: `
    <router-outlet />
    @let alert = alert$ | async;
    @if (alert && alert.show) {
      <app-alert-modal
        [title]="alert.title"
        [message]="alert.message"
        [type]="alert.type"
        [show]="alert.show"
      />
    }
  `
})

export class App {
  protected title = 'StudentManagementFront';
  private notification = inject(NotificationService);
  alert$ = this.notification.alert$;
}