import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorResponseDTO } from '../../../../../shared/models/professor-response.dto';
import { CreateSubjectRequestDTO } from '../../../../../shared/models/create-subject-request.dto';

@Component({
  selector: 'app-register-subject-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-subject-modal.component.html',
})
export class RegisterSubjectModalComponent {
  private fb = inject(FormBuilder);

  @Input() professors: ProfessorResponseDTO[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() register = new EventEmitter<CreateSubjectRequestDTO>();

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    professorId: ['', Validators.required],
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
