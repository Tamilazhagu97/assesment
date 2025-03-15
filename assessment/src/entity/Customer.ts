import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    @Length(2, 100)
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ type: "text" })
    address: string;
}
