import { ClassmateDTO } from './classmate.dto';

export interface StudentClassDetailsDTO {
  subjectId: string;
  subjectName: string;
  professorName: string;
  classmates: ClassmateDTO[];
}
