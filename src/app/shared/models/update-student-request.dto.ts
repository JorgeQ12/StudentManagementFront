export interface UpdateStudentRequestDTO
{
    id: string;
    email: string;
    documentType: string;
    documentNumber: string;
    phoneNumber: string;
    birthDate: Date;
    gender: string;
    address: string;
}