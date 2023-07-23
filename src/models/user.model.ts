import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttr {
  user_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  real_name: string;
  username: string;
  last_state: string;
  message_id: string;
  lang: string;
  is_admin: boolean;
}
@Table({ tableName: 'user', timestamps: false })
export class User extends Model<User, UserAttr> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  user_id: string;

  @Column({ type: DataType.STRING })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING })
  real_name: string;

  @Column({ type: DataType.STRING })
  phone_number: string;

  @Column({ type: DataType.STRING })
  username: string;

  @Column({ type: DataType.STRING })
  message_id: string;

  @Column({ type: DataType.STRING })
  last_state: string;

  @Column({ type: DataType.STRING })
  lang: string;

  @Column({ type: DataType.STRING, defaultValue: false })
  status: boolean;

  @Column({ type: DataType.STRING, defaultValue: false })
  is_admin: boolean;
}
