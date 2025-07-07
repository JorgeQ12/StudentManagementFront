import { Component, EventEmitter, Input, Output, inject, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { StudentProfileDTO } from '../../../../shared/models/student-profile.dto';
import { UpdateStudentRequestDTO } from '../../../../shared/models/update-student-request.dto';
import { RegisterStudentComponent } from './register-student-modal/register-student-modal.component';
import { RegisterRequestDTO } from '../../../../shared/models/register-request.dto';

@Component({
  selector: 'app-manage-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RegisterStudentComponent],
  templateUrl: './manage-students.component.html',
})
export class ManageStudentsComponent implements  OnChanges {
    private fb = inject(FormBuilder);

    @Input() studentProfile: StudentProfileDTO[] = [];
    @Output() updateStudent = new EventEmitter<UpdateStudentRequestDTO>();
    @Output() deleteStudent = new EventEmitter<string>();
    @Output() registerStudent = new EventEmitter<RegisterRequestDTO>(); 
    @Output() close = new EventEmitter<void>();

    formArray: FormArray<FormGroup> = this.fb.array<FormGroup>([]);
    editingRow: boolean[] = [];
    documentTypes = ['CC', 'TI', 'CE', 'PP'];
    genders = ['Masculino', 'Femenino', 'Otro'];
    showRegisterModal = false;

    ngOnChanges(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.formArray.clear();
        this.studentProfile.forEach((student, index) => {
        const group = this.fb.group({
            id: [student.id],
            email: [student.email, [Validators.required, Validators.email]],
            documentType: [student.documentType, Validators.required],
            documentNumber: [student.documentNumber, Validators.required],
            phoneNumber: [student.phoneNumber, Validators.required],
            birthDate: [new Date(student.birthDate).toISOString().split('T')[0], Validators.required],
            gender: [student.gender, Validators.required],
            address: [student.address, Validators.required],
            isActive: [student.isActive],
        });

        this.formArray.push(group);
        this.editingRow.push(false);
        });
    }

    editRow(index: number): void {
        this.editingRow[index] = true;
    }

    save(index: number): void {
        const group = this.formArray.at(index) as FormGroup;
        if (group.invalid) {
        group.markAllAsTouched();
        return;
        }

        const dto: UpdateStudentRequestDTO = group.getRawValue();
        this.updateStudent.emit(dto);
        this.editingRow[index] = false;
    }

    openRegisterStudent(): void {
        this.showRegisterModal = true;
    }

    closeRegisterModal(): void {
        this.showRegisterModal = false;
    }

    handleRegisterStudent(dto: RegisterRequestDTO): void {
        this.registerStudent.emit(dto);
        this.showRegisterModal = false;
    }

    closePanel(): void {
        this.close.emit();
    }
}
