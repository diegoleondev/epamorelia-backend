import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/database.js";
import type User from "./user.js";

class UserInvitation extends Model<
  InferAttributes<UserInvitation>,
  InferCreationAttributes<UserInvitation>
> {
  declare id: string;
  declare origin_user_id: ForeignKey<User["id"]>;
  declare target_user_id: ForeignKey<User["id"]> | null;
  declare created_at: CreationOptional<Date>;
}

UserInvitation.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    origin_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    target_user_id: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "user_invitations",
  },
);

export default UserInvitation;
