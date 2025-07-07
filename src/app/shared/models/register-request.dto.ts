import { FullNameDTO } from "./full-name.dto";
import { StudentInfoDTO } from "./student-info.dto";

export interface RegisterRequestDTO {
  username: string;
  password: string;
  fullName: FullNameDTO;
  info: StudentInfoDTO;
}
