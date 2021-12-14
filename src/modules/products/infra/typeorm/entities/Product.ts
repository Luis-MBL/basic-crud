import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price: number | null;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('jsonb', { default: {} })
  info: Record<string, unknown>;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at: Date | null;

  constructor() {
    if (!this.product_id) {
      this.product_id = uuidv4();
      this.is_active = true;
    }
  }
}
