import { SignatureRequestStatus, ValidationStatus, ObservationType } from '../enums';

export interface Observation {
  type: ObservationType;
  message: string;
  createdAt: string;
}

export interface SignatureRequest {
  id: string;
  referenceTransaction: string;
  payload: Record<string, any>;
  status: SignatureRequestStatus;
  validationStatus: ValidationStatus;
  observations: Observation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Province {
  id: string;
  name: string;
  code: string;
}

export interface City {
  id: string;
  name: string;
  code: string;
  provinceId: string;
}

export interface Catalog {
  provinces: Province[];
  cities: City[];
  periods: string[];
  applicationTypes: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}
