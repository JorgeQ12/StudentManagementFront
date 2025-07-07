export interface StudentProfileDTO {
    id: string; 
    fullName: string;
    email: string;
    documentType: string;
    documentNumber: string;
    phoneNumber: string;
    birthDate: Date; 
    gender: string;
    address: string;
    enrollmentDate: Date;  
    isActive: boolean;
}