import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/database.js";
import type Branch from "./branch.js";
import type User from "./user.js";

class UserInvitation extends Model<
  InferAttributes<UserInvitation>,
  InferCreationAttributes<UserInvitation>
> {
  declare id: CreationOptional<string>;
  declare sourceUserId: ForeignKey<User["id"]>;
  declare targetUserId: ForeignKey<User["id"]> | null;

  declare reference: string | null;
  declare roleId: string;
  declare branchId: ForeignKey<Branch["id"]>;

  declare createdAt: CreationOptional<Date>;
}

// branchId is defined in the Branch model

UserInvitation.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
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
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
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
