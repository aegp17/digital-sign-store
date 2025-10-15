import { ApplicationType, Period, DocumentType, CountryCode } from '../enums';

export interface CreateSignatureRequestDto {
  identificationNumber: string;
  fingerCode: string;
  emailAddress: string;
  cellphoneNumber: string;
  city: string;
  province: string;
  address: string;
  countryCode: CountryCode;
  documentType: DocumentType;
  applicationType: ApplicationType;
  referenceTransaction: string;
  period: Period;
  
  // Optional fields for LEGAL_REPRESENTATIVE
  ruc?: string;
  companyName?: string;
  appointmentDocument?: string;
  isIdentityCertificate?: boolean;
}
