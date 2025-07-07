import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../shared/services/student.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { StudentProfileDTO } from '../../../shared/models/student-profile.dto';
import { UpdateStudentRequestDTO } from '../../../shared/models/update-student-request.dto';
import { RegisterRequestDTO } from '../../../shared/models/register-request.dto';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal.component';
import { AuthService } from '../../auth/login/service/auth.service';
import { ManageSubjectsComponent } from "./manage-subjects/manage-subjects.component";
import { SubjectService } from '../../../shared/services/subject.service';
import { SubjectWithProfessorDTO } from '../../../shared/models/subject-with-professor.dto';
import { ProfessorService } from '../../../shared/services/professor.service';
import { ProfessorResponseDTO } from '../../../shared/models/professor-response.dto';
import { CreateSubjectRequestDTO } from '../../../shared/models/create-subject-request.dto';
import { ManageProfessorComponent } from "./manage-professors/manage-professors.component";
import { CreateProfessorRequestDTO } from '../../../shared/models/create-professor-request.dto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ManageStudentsComponent, ConfirmModalComponent, ManageSubjectsComponent, ManageProfessorComponent],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
    private studentService = inject(StudentService);
    private subjectService = inject(SubjectService);
    private authService = inject(AuthService);
    private professorService = inject(ProfessorService);
    private notification = inject(NotificationService);

    studentProfile: StudentProfileDTO[] = [];
    subjects: SubjectWithProfessorDTO[] = [];
    professors: ProfessorResponseDTO[] = [];

    showManageStudent = false;
    showManageSubject = false;
    showManageProfessor = false;
    selectedStudentDelete = false;
    studentIdDelete!: string;
    subjectIdToDelete!: string;
    showDeleteSubjectModal = false;
    professorIdToDelete!: string;
    showDeleteProfessorModal = false;

    openManageStudent() {
        this.loadStudents();
    }

    loadStudents(): void {
        this.studentService.getAllStudents().subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.studentProfile = res.value;
                    this.showManageStudent = true;
                } else {
                    this.notification.error('No se pudieron obtener los estudiantes.');
                }
            },
            error: () => {
                this.notification.error('Error de servidor al obtener estudiantes.');
            }
        });
    }

    updateStudent(dto: UpdateStudentRequestDTO): void {
        this.studentService.updateStudentProfile(dto).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.notification.succes('Estudiante actualizado correctamente.');
                    this.loadStudents();
                } else {
                    this.notification.error(res.error || 'Error al actualizar el estudiante.');
                }
            },
            error: () => {
                this.notification.error('Error del servidor al actualizar el estudiante.');
            }
        });
    }

    deleteStudent(id: string): void {
        this.studentIdDelete = id;
        this.selectedStudentDelete = true;
    }

    handleDelete(): void {
        const request = { id: this.studentIdDelete };
        this.studentService.deleteStudentProfile(request).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.notification.succes('Estudiante eliminado.');
                    this.loadStudents();
                } else {
                    this.notification.error(res.error || 'No se pudo eliminar el estudiante.');
                }
            },
            error: () => {
                this.notification.error('Error al eliminar estudiante.');
            }
        });
        this.selectedStudentDelete = false;
    }

    registerStudent(dto: RegisterRequestDTO): void {
        this.authService.registerStudentAsync(dto).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.notification.succes('Estudiante registrado.');
                    this.loadStudents();
                } else {
                    this.notification.error(res.error || 'No se pudo registrar el estudiante.');
                }
                if (!res.isSuccess) {
                    this.notification.error(res.error || 'No se pudo registrar el estudiante.');
                    return;
                }
            },
            error: () => {
                this.notification.error('Error del servidor al registrar estudiante.');
            }
        });
    }

    openManageSubject() {
        this.loadSubjects();
        this.loadAllProfessor();
    }

    loadAllProfessor(){
        this.professorService.getAllProfessors().subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.professors = res.value;
                } else {
                    this.notification.error(res.error || 'No se pudieron obtener los profesores.');
                }
            },
            error: () => this.notification.error('Error del servidor al obtener profesores.')
        });
    }

    loadSubjects(): void {
        this.subjectService.getAllSubjects().subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.showManageSubject = true;
                    this.subjects = res.value;
                } else {
                    this.notification.error(res.error || 'No se pudieron obtener las materias.');
                }
            },
            error: () => this.notification.error('Error del servidor al obtener materias.')
        });
    }

    confirmDeleteSubject(subjectId: string): void {
        this.subjectIdToDelete = subjectId;
        this.showDeleteSubjectModal = true;
    }

    saveSubject(dto: CreateSubjectRequestDTO) {
        this.subjectService.CreateSubject(dto).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.loadSubjects();
                    this.notification.succes('Materia Creada.');
                } else {
                    this.notification.error(res.error || 'No se pudo crear la materia.');
                }
            },
            error: () => this.notification.error('Error del servidor al crear la materia.')
        });
    }

    deleteSubject(): void {
        this.subjectService.deleteSubject(this.subjectIdToDelete).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.loadSubjects();
                    this.notification.succes('Materia eliminada.');
                } else {
                    this.notification.error(res.error || 'No se pudo eliminar la materia.');
                }
            },
            error: () => this.notification.error('Error del servidor al eliminar la materia.')
        });
        this.showDeleteSubjectModal = false;
    }

    openManageProfessor() {
        this.showManageProfessor = true;
        this.loadAllProfessor();
    }

    confirmDeleteProfessor(ProfessorId: string): void {
        this.professorIdToDelete = ProfessorId;
        this.showDeleteProfessorModal = true;
    }

    saveProfessor(dto: CreateProfessorRequestDTO) {
        this.professorService.createProfessor(dto).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.loadAllProfessor();
                    this.notification.succes('Profesor Creado.');
                } else {
                    this.notification.error(res.error || 'No se pudo crear el Profesor.');
                }
            },
            error: () => {
                this.notification.error('Error del servidor al crear el Profesor.');
            }  
        });
    }

    deleteProfessor(): void {
        this.professorService.deleteProfessor(this.professorIdToDelete).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.loadAllProfessor();
                    this.notification.succes('Profesor eliminado.');
                } else {
                    this.notification.error(res.error || 'No se pudo eliminar el Profesor.');
                }
            },
            error: () => this.notification.error('Error del servidor al eliminar el Profesor.')
        });
        this.showDeleteProfessorModal = false;
    }
}
