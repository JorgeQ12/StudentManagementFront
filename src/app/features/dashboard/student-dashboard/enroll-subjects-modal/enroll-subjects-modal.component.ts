import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectWithProfessorDTO } from '../../../../shared/models/subject-with-professor.dto';
import { NotificationService } from '../../../../shared/services/notification.service';
import { StudentClassDetailsDTO } from '../../../../shared/models/student-class-details.dto';

@Component({
  selector: 'app-enroll-subjects-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enroll-subjects-modal.component.html'
})
export class EnrollSubjectsModalComponent {
    private notification = inject(NotificationService);

    @Input() availableSubjects: SubjectWithProfessorDTO[] = [];
    @Input() subjects: StudentClassDetailsDTO[] = [];

    @Output() close = new EventEmitter<void>();
    @Output() enroll = new EventEmitter<string[]>();

    selectedSubjectIds: string[] = [];

    isSelected(subject: SubjectWithProfessorDTO): boolean {
        return this.selectedSubjectIds.includes(subject.id);
    }

    toggleSelection(subject: SubjectWithProfessorDTO): void {
        if (this.isSelected(subject)) {
            this.selectedSubjectIds = this.selectedSubjectIds.filter(id => id !== subject.id);
        } 
        else 
        {
            this.selectedSubjectIds.push(subject.id);

            if (this.selectedSubjectIds.length + this.subjects.length  > 3) {
                this.notification.error('Solo puedes seleccionar 3 materias.');
                this.selectedSubjectIds = this.selectedSubjectIds.filter(id => id !== subject.id); 
                return;
            }

            const currentProfessorNames = this.subjects.map(subject => subject.professorName);
            const selectedNewProfessorNames = this.selectedSubjectIds.map(id => this.availableSubjects.find(subject => subject.id === id)?.professorName)
                    .filter((name): name is string => !!name);

            const hasDuplicateInNewSelection = selectedNewProfessorNames.length !== new Set(selectedNewProfessorNames).size;
            const hasDuplicateWithCurrent = selectedNewProfessorNames.some(name => currentProfessorNames.includes(name));

            if (hasDuplicateInNewSelection || hasDuplicateWithCurrent) {
                this.notification.error('Cada materia debe tener un profesor distinto.');
                this.selectedSubjectIds = this.selectedSubjectIds.filter(id => id !== subject.id); 
                return;
            }
        }
    }

    confirmSelection(): void {
        if (this.selectedSubjectIds.length + this.subjects.length !== 3) {
            this.notification.error('Debes seleccionar exactamente 3 materias.');
            return;
        }

        this.enroll.emit(this.selectedSubjectIds);
    }
}
