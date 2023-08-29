import { UserEntity } from './../../user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  originalName: string;

  @Column()
  size: string;

  @Column()
  mimeType: string;

  @DeleteDateColumn()
  deleteAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
}
