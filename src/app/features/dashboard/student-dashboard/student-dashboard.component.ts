import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrollSubjectsModalComponent } from "./enroll-subjects-modal/enroll-subjects-modal.component";
import { StudentService } from '../../../shared/services/student.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { SubjectWithProfessorDTO } from '../../../shared/models/subject-with-professor.dto';
import { SubjectService } from '../../../shared/services/subject.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal.component';
import { StudentClassDetailsDTO } from '../../../shared/models/student-class-details.dto';
import { StudentProfileDTO } from '../../../shared/models/student-profile.dto';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { UpdateStudentRequestDTO } from '../../../shared/models/update-student-request.dto';
import { StudentsWithSubjectsDTO } from '../../../shared/models/students-with-subjects.dto';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, EnrollSubjectsModalComponent, ConfirmModalComponent, EditProfileModalComponent],
  templateUrl: './student-dashboard.component.html'
})
export class StudentDashboardComponent {
    private studentService = inject(StudentService);
    private subjectService = inject(SubjectService);
    private notification = inject(NotificationService);

    showModalSubject = false;
    showModalEdit = false;
    subjects: StudentClassDetailsDTO[] = [];
    availableSubjects: SubjectWithProfessorDTO[] = [];
    selectedSubjectIdToDelete: string | null = null;
    studentProfile!: StudentProfileDTO;
    studentsWithSubjectsDTO: StudentsWithSubjectsDTO[] = [];

    ngOnInit() {
        this.loadStudentClassDetails();
        this.loadStudentsWithSubjects();
    }

    loadStudentsWithSubjects(): void{
        this.studentService.getAllStudentsWithSubjects().subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.studentsWithSubjectsDTO = res.value;
                } else {
                    this.notification.error('Error al obtener estudiantes');
                }
            },
            error: () => {
                this.notification.error('No se pudo conectar con el servidor. Verifica tu conexión.');
            }
        });
    }

    loadStudentClassDetails(): void {
        this.studentService.getStudentClassDetails().subscribe({
        next: res => {
            if (res.isSuccess) {
                this.subjects = res.value;
                this.loadStudentsWithSubjects();
            } else {
                this.notification.error('Error al obtener materias');
            }
        },
        error: () => {
            this.notification.error('No se pudo conectar con el servidor. Verifica tu conexión.');
        }
        });
    }

    loadAvailableSubjects(): void {
        if(this.subjects.length >= 3){
            this.notification.error('Solo puedes inscribir 3 materias.');
            return;
        }

        this.subjectService.getAllSubjects().subscribe({
            next: res => {
            if (res.isSuccess) {
                this.availableSubjects = res.value.filter(x => !this.subjects.some(z => z.subjectId === x.id));
                this.showModalSubject = true;
            } else {
                this.notification.error('No se pudieron obtener las materias.');
            }
            },
            error: () => {
                this.notification.error('No se pudo conectar con el servidor. Verifica tu conexión.');
            }
        });
    }

    openModalSubject() {
        this.loadAvailableSubjects();
    }

    handleEnrollment(subjectIds: string[]) {
        this.showModalSubject = false;

        const request = { subjectIds: subjectIds };
        this.studentService.enrollInSubjects(request).subscribe({
            next: res => {
                if (res.isSuccess) {
                    this.notification.succes('Materias inscritas correctamente.');
                    this.loadStudentClassDetails(); 
                } else {
                    this.notification.error(res.error || 'No se pudo inscribir las materias.');
                }
            },
            error: () => {
                this.notification.error('Ocurrió un error al inscribirte en las materias.');
            }
        });
    }

    confirmUnenroll(subjectId: string) {
        this.selectedSubjectIdToDelete = subjectId; 
    }

    handleDelete() {
        if (!this.selectedSubjectIdToDelete) return;

        const request = { subjectId: this.selectedSubjectIdToDelete };

        this.studentService.deleteEnrollInSubjects(request).subscribe({
            next: res => {
            if (res.isSuccess) {
                this.notification.succes('Materia eliminada correctamente');
                this.loadStudentClassDetails(); 
            } else {
                this.notification.error(res.error || 'No se pudo eliminar la materia.');
            }
            },
            error: () => {
            this.notification.error('Ocurrió un error al eliminar la materia.');
            }
        });

        this.selectedSubjectIdToDelete = null;
        this.loadStudentClassDetails();
    }

    getShortClassmates(subject: StudentClassDetailsDTO): string {
        const classmates = subject.classmates.map(c => c.fullName);
        const max = 8;

        if (classmates.length <= max) return classmates.join(', ');
        return `${classmates.slice(0, max).join(', ')} y ${classmates.length - max} más`;
    }

    openModalEdit(){
        this.loadStudentProfile();
    }

    loadStudentProfile(): void {
        this.studentService.getStudentProfile().subscribe({
            next: res => {
            if (res.isSuccess) {
                this.studentProfile = res.value;
                this.showModalEdit = true;
            } else {
                this.notification.error('No se pudo obtener la informacion del estudiante.');
            }
            },
            error: () => {
                this.notification.error('No se pudo conectar con el servidor. Verifica tu conexión.');
            }
        });
    }

    handleProfileUpdate(data: UpdateStudentRequestDTO): void {
        this.studentService.updateStudentProfile(data).subscribe({
            next: res => {
            if (res.isSuccess) {
                this.notification.succes('Perfil actualizado correctamente.');
                this.showModalEdit = false;
            } else {
                this.notification.error(res.error || 'No se pudo actualizar el perfil.');
            }
            },
            error: () => {
            this.notification.error('Ocurrió un error al actualizar el perfil.');
            }
        });
    }
}
