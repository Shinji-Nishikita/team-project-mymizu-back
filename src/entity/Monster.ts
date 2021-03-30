import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from './User'

@Entity()
export class Monster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    currentHP: number;

    @Column()
    maxHP: number;

    @Column({type: 'date'})
    startDate: Date;
}
