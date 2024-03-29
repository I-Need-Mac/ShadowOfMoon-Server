import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('reward_boxes')
export class RewardBoxes extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'varchar',
    comment: '스팀 아이디',
  })
  steam_id: string;

  @Column({
    type: 'int',
    comment: '상자 등급',
  })
  box_type!: number;

  @Column({
    type: 'int',
    comment: '획득한 스테이지',
  })
  stage_id!: number;

  @Column({
    type: 'datetime',
    nullable: true,
    comment: '오픈 시간',
  })
  open_start_time: Date;

  @Column({
    type: 'bool',
    default: () => 'false',
    comment: '보상 받았는지 여부',
  })
  is_open!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '수정일',
  })
  updated_at!: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
}
