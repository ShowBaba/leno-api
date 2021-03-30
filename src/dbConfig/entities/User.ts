import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// only models defined as entities will be added as a db table
@Entity('User')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
