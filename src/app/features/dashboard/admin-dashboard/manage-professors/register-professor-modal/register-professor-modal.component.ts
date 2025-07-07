import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorResponseDTO } from '../../../../../shared/models/professor-response.dto';
import { CreateProfessorRequestDTO } from '../../../../../shared/models/create-professor-request.dto';

@Component({
  selector: 'app-register-professor-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-professor-modal.component.html',
})
export class RegisterProfessorModalComponent {
  private fb = inject(FormBuilder);

  @Input() professors: ProfessorResponseDTO[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() register = new EventEmitter<CreateProfessorRequestDTO>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.register.emit(this.form.value);
    this.form.reset();
  }

  closeModal(): void {
    this.close.emit();
  }
}
