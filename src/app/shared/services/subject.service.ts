import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ResultRequestDTO } from '../models/result-request.dto';
import { SubjectWithProfessorDTO } from '../models/subject-with-professor.dto';
import { CreateSubjectRequestDTO } from '../models/create-subject-request.dto';

@Injectable({ providedIn: 'root' })
export class SubjectService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/Subject`;

    getAllSubjects(): Observable<ResultRequestDTO<SubjectWithProfessorDTO[]>> {
        return this.http.get<ResultRequestDTO<SubjectWithProfessorDTO[]>>(`${this.baseUrl}/GetAllSubjects`);
    }

    CreateSubject(dto: CreateSubjectRequestDTO) {
        return this.http.post<ResultRequestDTO<string>>(`${this.baseUrl}/CreateSubject`, dto);
    }

    deleteSubject(id: string) {
        return this.http.delete<ResultRequestDTO<string>>(
        `${this.baseUrl}/DeleteSubject`,
            { params:
                { subjectId: id }
            }
        );
    }
}
