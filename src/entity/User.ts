import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {Monster} from './Monster'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    level: number;

    @Column()
    attackPower: number;

    @OneToOne(()=>Monster, {cascade: true})
    @JoinColumn()
    monster: Monster


}
