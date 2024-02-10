import {
  DataTypes,
  Model,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/database.js";
import type User from "./user.js";

class UserToken extends Model<
  InferAttributes<UserToken>,
  InferCreationAttributes<UserToken>
> {
  declare userId: ForeignKey<User["id"]>;
  declare token: string;
  declare expiresAt: Date;
}

UserToken.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "user_tokens",
  },
);

export default UserToken;
