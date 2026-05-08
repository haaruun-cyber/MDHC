export interface Registration {
  id?: string;
  fullName: string;
  email: string;
  homeAddress: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  educationLevel: string;
  imageUrl?: string;
  qaraan: number;
  createdAt: any; // Type depends on if it's from client (Date) or server (Timestamp)
}

export type RegistrationFormData = Omit<Registration, 'id' | 'createdAt'>;
