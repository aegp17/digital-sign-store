import { IsString, IsEmail, IsIn, Length, MaxLength, MinLength, Matches, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationType, Period, DocumentType, CountryCode } from '../enums';

export class CreateSignatureRequestDto {
  @ApiProperty({ description: 'Identification number', maxLength: 10 })
  @IsString()
  @MaxLength(10)
  identificationNumber!: string;

  @ApiProperty({ 
    description: 'Finger code - exactly 10 alphanumeric characters with at least 1 uppercase and 6 digits',
    example: 'ABC1234567'
  })
  @IsString()
  @Length(10, 10)
  @Matches(/^(?=(?:.*[A-Z]){1,})(?=(?:.*\d){6,})[A-Z0-9]+$/)
  fingerCode!: string;

  @ApiProperty({ description: 'Email address', maxLength: 100 })
  @IsEmail()
  @MaxLength(100)
  emailAddress!: string;

  @ApiProperty({ 
    description: 'Cellphone number in Ecuador format',
    example: '+593912345678'
  })
  @Matches(/^\+5939\d{8}$/)
  cellphoneNumber!: string;

  @ApiProperty({ description: 'City code' })
  @IsString()
  city!: string;

  @ApiProperty({ description: 'Province code' })
  @IsString()
  province!: string;

  @ApiProperty({ description: 'Address', minLength: 15, maxLength: 100 })
  @IsString()
  @MinLength(15)
  @MaxLength(100)
  address!: string;

  @ApiProperty({ description: 'Country code', enum: CountryCode })
  @IsIn(['ECU'])
  countryCode!: CountryCode;

  @ApiProperty({ description: 'Document type', enum: DocumentType })
  @IsIn(['CI'])
  documentType!: DocumentType;

  @ApiProperty({ description: 'Application type', enum: ApplicationType })
  @IsIn(['NATURAL_PERSON', 'LEGAL_REPRESENTATIVE'])
  applicationType!: ApplicationType;

  @ApiProperty({ description: 'Reference transaction', maxLength: 150 })
  @IsString()
  @MaxLength(150)
  referenceTransaction!: string;

  @ApiProperty({ description: 'Period', enum: Period })
  @IsIn(['ONE_WEEK', 'ONE_MONTH', 'ONE_YEAR', 'TWO_YEARS', 'THREE_YEARS', 'FOUR_YEARS', 'FIVE_YEARS'])
  period!: Period;

  // Optional fields for LEGAL_REPRESENTATIVE
  @ApiProperty({ description: 'RUC for legal representative', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(13)
  ruc?: string;

  @ApiProperty({ description: 'Company name for legal representative', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  companyName?: string;

  @ApiProperty({ description: 'Appointment document for legal representative', required: false })
  @IsOptional()
  @IsString()
  appointmentDocument?: string;

  @ApiProperty({ description: 'Is identity certificate required', required: false })
  @IsOptional()
  @IsBoolean()
  isIdentityCertificate?: boolean;
}
