import { Exclude } from "class-transformer";
import { UserToken } from "src/user-tokens/entities/user-token.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number

    @Column()
    fname: string

    @Column()
    lname: string

    @Column()
    address: string

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    age: number

    @Column()
    phone: string


    @Column()
    image: string

    @Column()
    gender: string

    @OneToMany((type) => UserToken, (UserToken: UserToken) => UserToken.user)
    token: UserToken[];
}
