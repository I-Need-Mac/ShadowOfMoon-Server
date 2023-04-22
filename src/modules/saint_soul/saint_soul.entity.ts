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

@Entity('saint_soul')
export class Saint_soul extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'int',
    comment: '스팀 아이디',
  })
  stream_id: number;

  @Column({
    comment: '첫 번째 소울 해금상태',
    type: 'bool',
  })
  saint_soul1!: boolean;

  @Column({
    comment: '두 번째 소울 해금상태',
    type: 'bool',
  })
  saint_soul2!: boolean;

  @Column({
    comment: '세 번째 소울 해금상태',
    type: 'bool',
  })
  saint_soul3!: boolean;

  @Column({
    comment: '네 번째 소울 해금상태',
    type: 'bool',
  })
  saint_soul4!: boolean;

  @Column({
    comment: '다섯 번째 소울 해금상태',
    type: 'bool',
  })
  saint_soul5!: boolean;

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

  @ManyToOne(() => Users, (users) => users.stream_ids)
  @JoinColumn({ name: 'stream_id' })
  users: Users;
}
