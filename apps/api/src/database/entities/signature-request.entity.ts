import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SignatureRequestStatus, ValidationStatus } from '@shared';

@Entity('signature_requests')
export class SignatureRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  referenceTransaction!: string;

  @Column('jsonb')
  payload!: Record<string, any>;

  @Column({
    type: 'enum',
    enum: SignatureRequestStatus,
    default: SignatureRequestStatus.REGISTERED,
  })
  status!: SignatureRequestStatus;

  @Column({
    type: 'enum',
    enum: ValidationStatus,
    default: ValidationStatus.PENDING,
  })
  validationStatus!: ValidationStatus;

  @Column('jsonb', { default: [] })
  observations!: Array<{
    type: 'INFO' | 'WARNING' | 'ALERT';
    message: string;
    createdAt: string;
  }>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
