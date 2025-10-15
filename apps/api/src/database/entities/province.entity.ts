import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CityEntity } from './city.entity';

@Entity('provinces')
export class ProvinceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => CityEntity, (city) => city.province)
  cities!: CityEntity[];
}
