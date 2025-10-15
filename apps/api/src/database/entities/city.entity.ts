import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity('cities')
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @Column()
  provinceId!: string;

  @ManyToOne(() => ProvinceEntity, (province) => province.cities)
  @JoinColumn({ name: 'provinceId' })
  province!: ProvinceEntity;
}
