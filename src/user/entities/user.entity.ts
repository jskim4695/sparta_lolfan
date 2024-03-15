import { SupportMessage } from 'src/support-message/entities/support-message.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../types/userRole.type';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => SupportMessage, (supportMessage) => supportMessage.user) // 서포트 메시지 엔티티에는 반대로 ManytoOne임을 인지할 것.
  supportMessages: SupportMessage[];
}