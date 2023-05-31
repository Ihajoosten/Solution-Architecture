import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'traffic_planning', schema: 'cargo_management' })
export class TrafficPlanning {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Generated("uuid")
  public stream_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public dock_name: string;

  @Column({ type: 'timestamp', nullable: false })
  public arrival: Date;

  @Column({ type: 'timestamp', nullable: false })
  public departure: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

