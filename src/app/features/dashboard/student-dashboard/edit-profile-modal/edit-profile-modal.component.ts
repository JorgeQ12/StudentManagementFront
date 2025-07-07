import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentProfileDTO } from '../../../../shared/models/student-profile.dto';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModalComponent {
    @Input() studentProfile!: StudentProfileDTO;

    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();

    form: FormGroup;
    documentTypes = ['CC', 'TI', 'CE', 'PP'];
    genders = ['Masculino', 'Femenino', 'Otro'];
    
    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            id: [],
            email: ['', [Validators.required, Validators.email]],
            documentType: ['', Validators.required],
            documentNumber: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            birthDate: ['', Validators.required],
            gender: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['studentProfile'] && this.studentProfile) {
            const profile = this.studentProfile;
            this.form.patchValue({
                id: profile.id,
                email: profile.email,
                documentType: profile.documentType,
                documentNumber: profile.documentNumber,
                phoneNumber: profile.phoneNumber,
                birthDate: new Date(profile.birthDate).toISOString().split('T')[0],
                gender: profile.gender,
                address: profile.address
            });
        }
    }


    submit(): void {
        if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
        }

        this.save.emit(this.form.value);
    }
}
