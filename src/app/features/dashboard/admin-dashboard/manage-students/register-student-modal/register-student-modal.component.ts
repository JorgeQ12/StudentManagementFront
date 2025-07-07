import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterRequestDTO } from '../../../../../shared/models/register-request.dto';

@Component({
  selector: 'app-register-student-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-student-modal.component.html'
})
export class RegisterStudentComponent {
    private fb = inject(FormBuilder);

    @Output() close = new EventEmitter<void>();
    @Output() registerStudent = new EventEmitter<RegisterRequestDTO>();

    registerForm: FormGroup = this.fb.group({
      Username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });

    register(): void {
      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return;
      }

      const formValue = this.registerForm.value;

      const dto: RegisterRequestDTO = {
        username: formValue.Username,
        password: formValue.password,
        fullName: {
          firstName: formValue.firstName,
          middleName: formValue.middleName,
          lastName: formValue.lastName,
          secondLastName: formValue.secondLastName
        },
        info: {
          email: formValue.email,
          documentType: formValue.documentType,
          documentNumber: formValue.documentNumber,
          phoneNumber: formValue.phoneNumber,
          birthDate: formValue.birthDate,
          gender: formValue.gender,
          address: formValue.address
        }
      };

      this.registerStudent.emit(dto);
      this.registerForm.reset();
    }

    isInvalid(controlName: string): boolean {
      const control = this.registerForm.get(controlName);
      return !!control && control.touched && control.invalid;
    }
}
