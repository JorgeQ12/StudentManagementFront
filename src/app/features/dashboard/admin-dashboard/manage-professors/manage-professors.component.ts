import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorResponseDTO } from '../../../../shared/models/professor-response.dto';
import { CreateProfessorRequestDTO } from '../../../../shared/models/create-professor-request.dto';
import { RegisterProfessorModalComponent } from "./register-professor-modal/register-professor-modal.component";

@Component({
  selector: 'app-manage-professors',
  standalone: true,
  imports: [CommonModule, RegisterProfessorModalComponent],
  templateUrl: './manage-professors.component.html',
})
export class ManageProfessorComponent {
    @Input() professors: ProfessorResponseDTO[] = [];

    @Output() deleteProfessor = new EventEmitter<string>();
    @Output() registerProfessor = new EventEmitter<CreateProfessorRequestDTO>();
    @Output() close = new EventEmitter<void>();

    showRegisterModal = false;

    openRegisterProfessor(): void {
        this.showRegisterModal = true;
    }

    closeRegisterModal(): void {
        this.showRegisterModal = false;
    }

    closePanel(): void {
        this.close.emit();
    }

    handleRegisterProfessor(data: CreateProfessorRequestDTO): void {
        this.registerProfessor.emit(data);
        this.closeRegisterModal();
    }
}
