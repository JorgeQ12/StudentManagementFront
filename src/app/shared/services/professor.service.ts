import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment/environment";
import { Injectable } from "@angular/core";
import { ResultRequestDTO } from "../../shared/models/result-request.dto";
import { ProfessorResponseDTO } from "../models/professor-response.dto";
import { CreateProfessorRequestDTO } from "../models/create-professor-request.dto";

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private base = `${environment.apiUrl}/Professor`;
  constructor(private http: HttpClient) {}

  getAllProfessors() {
    return this.http.get<ResultRequestDTO<ProfessorResponseDTO[]>>(
      `${this.base}/GetAllProfessors`
    );
  }

  createProfessor(dto: CreateProfessorRequestDTO) {
    return this.http.post<ResultRequestDTO<string>>(
      `${this.base}/CreateProfessor`,
        dto
    );
  }

  deleteProfessor(id: string) {
    return this.http.delete<ResultRequestDTO<string>>(
      `${this.base}/DeleteProfessor`,
      { params: { professorId: id } }
    );
  }
}
