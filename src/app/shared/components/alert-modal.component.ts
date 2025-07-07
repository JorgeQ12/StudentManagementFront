import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertType } from '../models/alert.model';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (show) {
      <div class="modal-backdrop fade show" style="z-index: 3000;"></div>
      <div class="modal d-block fade show" tabindex="-1" style="z-index: 4000;">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-4 text-center border-0" >
            <div class="mb-3">
              <i [ngClass]="iconClass" class="fs-1"></i>
            </div>
            <p class="mb-0 text-muted">{{ message }}</p>
          </div>
        </div>
      </div>
    }
  `
})
export class AlertModalComponent {
  @Input() message = '';
  @Input() type: AlertType = AlertType.Info;
  @Input() show = false;

  get iconClass(): string {
    switch (this.type) {
      case AlertType.Success: return 'bi bi-check-circle text-success';
      case AlertType.Error: return 'bi bi-x-circle text-danger';
      case AlertType.Info:
      default: return 'bi bi-info-circle text-primary';
    }
  }
}
