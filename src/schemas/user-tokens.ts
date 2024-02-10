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
  declare user_id: ForeignKey<User["id"]>;
  declare token: string;
  declare expires_at: Date;
}

UserToken.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    expires_at: {
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
