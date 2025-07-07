import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5)">
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
          <h5 class="mb-3 text-center">{{ title }}</h5>
          <p class="text-muted text-center">{{ message }}</p>
          <div class="text-center mt-3">
            <button class="btn btn-sm btn-outline-danger" (click)="confirm.emit()">Sí, eliminar</button>
            <button class="btn btn-sm btn-outline-secondary ms-2" (click)="cancel.emit()">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() title = '¿Estás seguro?';
  @Input() message = 'Esta acción no se puede deshacer.';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
