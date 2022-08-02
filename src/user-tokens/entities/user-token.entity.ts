import { Exclude } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";


@Entity()
export class UserToken {
    @PrimaryGeneratedColumn('increment', { name: 'id' })
    id: number;

    @Column()
    userId: number;

    @Column({ type: 'text' })
    token: string

    @ManyToOne((type) => User, (user: User) => user.token)
    @JoinColumn({ name: 'userId' })
    user: User;


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({ type: "varchar", default: String(new Date(+Date.now() + (86400000 * 30)).toISOString()) }) // 30 day
    expireAt: string;

    @Column({ type: "boolean", default: false })
    isDeleted: boolean;


}
