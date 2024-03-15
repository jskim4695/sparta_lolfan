import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Team } from '../../team/entities/team.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'support_messages',
})
export class SupportMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.supportMessages) // 한개의 유저가 여러 메시지 소유 가능
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' }) // 컬럼을 유저아이디로 해서 외래키 설정
  user_id: number;

  @ManyToOne(() => Team, (team) => team.supportMessages, { // 한개의 팀이 여러 메시지 소유 가능
    onDelete: 'CASCADE', // 팀이 삭제되면 메시지도 일괄 삭제하겠다. / 유저는 삭제기능 없음.
  })
  team: Team;

  @Column({ type: 'bigint', name: 'team_id' }) // 컬럼을 팀아이디로 해서 외래키 설정
  team_id: number;
}