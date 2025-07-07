import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultRequestDTO } from '../models/result-request.dto';
import { environment } from '../../../environment/environment';
import { StudentClassDetailsDTO } from '../models/student-class-details.dto';
import { SubjectEnrollmentRequestDTO } from '../models/subject-enrollment-request.dto';
import { DeleteEnrollmentRequestDTO } from '../models/delete-enrollment-request.dto';
import { StudentProfileDTO } from '../models/student-profile.dto';
import { UpdateStudentRequestDTO } from '../models/update-student-request.dto';
import { StudentsWithSubjectsDTO } from '../models/students-with-subjects.dto';
import { DeleteStudentProfileDTO } from '../models/delete-student-profile.dto';

@Injectable({ providedIn: 'root' })
export class StudentService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/Student`;

    getAllStudents():  Observable<ResultRequestDTO<StudentProfileDTO[]>> {
        return this.http.get<ResultRequestDTO<StudentProfileDTO[]>>(`${this.baseUrl}/GetAllStudents`);
    }

    getStudentClassDetails(): Observable<ResultRequestDTO<StudentClassDetailsDTO[]>> {
        return this.http.get<ResultRequestDTO<StudentClassDetailsDTO[]>>(`${this.baseUrl}/GetStudentClassDetails`);
    }

    getStudentProfile(): Observable<ResultRequestDTO<StudentProfileDTO>> {
        return this.http.get<ResultRequestDTO<StudentProfileDTO>>(`${this.baseUrl}/GetStudentProfile`);
    }

    getAllStudentsWithSubjects(): Observable<ResultRequestDTO<StudentsWithSubjectsDTO[]>> {
        return this.http.get<ResultRequestDTO<StudentsWithSubjectsDTO[]>>(`${this.baseUrl}/GetAllStudentsWithSubjects`);
    }

    enrollInSubjects(request: SubjectEnrollmentRequestDTO): Observable<ResultRequestDTO<string>> {
        return this.http.post<ResultRequestDTO<string>>(`${this.baseUrl}/EnrollInSubjects`, request);
    }

    updateStudentProfile(data: UpdateStudentRequestDTO): Observable<ResultRequestDTO<null>> {
        return this.http.put<ResultRequestDTO<null>>(`${this.baseUrl}/UpdateStudentProfile`, data);
    }

    deleteEnrollInSubjects(request: DeleteEnrollmentRequestDTO): Observable<ResultRequestDTO<string>> {
        return this.http.delete<ResultRequestDTO<string>>(
            `${this.baseUrl}/DeleteEnrollInSubjects`,
            {
                body: request 
            }
        );
    }

    deleteStudentProfile(request: DeleteStudentProfileDTO): Observable<ResultRequestDTO<string>> {
        return this.http.delete<ResultRequestDTO<string>>(
            `${this.baseUrl}/DeleteStudentProfile`,
            {
                body: request 
            }
        );
    }

}
