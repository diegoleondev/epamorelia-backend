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
  declare id: CreationOptional<string>;
  declare sourceUserId: ForeignKey<User["id"]>;
  declare targetUserId: ForeignKey<User["id"]> | null;
  declare createdAt: CreationOptional<Date>;
}

UserInvitation.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    sourceUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    targetUserId: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: true,
    },
    createdAt: {
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
