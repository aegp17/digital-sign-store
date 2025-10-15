// Local types for the web app
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
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

export interface Observation {
  type: ObservationType;
  message: string;
  createdAt: string;
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

// Enums
export enum SignatureRequestStatus {
  REGISTERED = 'REGISTERED',
  VALIDATING = 'VALIDATING',
  REFUSED = 'REFUSED',
  ERROR = 'ERROR',
  APPROVED = 'APPROVED',
  GENERATED = 'GENERATED',
  EXPIRED = 'EXPIRED'
}

export enum ValidationStatus {
  PENDING = 'PENDING',
  MANUALLY_VALIDATING = 'MANUALLY_VALIDATING',
  AUTOMATICALLY_VALIDATING = 'AUTOMATICALLY_VALIDATING',
  ERROR = 'ERROR',
  REFUSED = 'REFUSED',
  COMPLETED = 'COMPLETED'
}

export enum ObservationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ALERT = 'ALERT'
}
