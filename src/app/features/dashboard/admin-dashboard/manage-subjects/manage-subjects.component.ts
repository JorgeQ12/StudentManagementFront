import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterSubjectModalComponent } from './register-subject-modal/register-subject-modal.component';
import { ProfessorResponseDTO } from '../../../../shared/models/professor-response.dto';
import { SubjectWithProfessorDTO } from '../../../../shared/models/subject-with-professor.dto';
import { CreateSubjectRequestDTO } from '../../../../shared/models/create-subject-request.dto';

@Component({
  selector: 'app-manage-subjects',
  standalone: true,
  imports: [CommonModule, RegisterSubjectModalComponent],
  templateUrl: './manage-subjects.component.html',
})
export class ManageSubjectsComponent {
    @Input() subjects: SubjectWithProfessorDTO[] = [];
    @Input() professors: ProfessorResponseDTO[] = [];

    @Output() deleteSubject = new EventEmitter<string>();
    @Output() registerSubject = new EventEmitter<CreateSubjectRequestDTO>();
    @Output() close = new EventEmitter<void>();

    showRegisterModal = false;

    openRegisterSubject(): void {
        this.showRegisterModal = true;
    }

    closeRegisterModal(): void {
        this.showRegisterModal = false;
    }

    closePanel(): void {
        this.close.emit();
    }

    handleRegisterSubject(data: CreateSubjectRequestDTO): void {
        this.registerSubject.emit(data);
        this.closeRegisterModal();
    }
}
