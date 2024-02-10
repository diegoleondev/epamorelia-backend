import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/database.js";
import UserInvitation from "./user-invitations.js";
import UserToken from "./user-tokens.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare username: string;
  declare password: string;
  declare verified: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "users",
  },
);

User.hasMany(UserToken, {
  foreignKey: "user_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});

UserToken.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});

User.hasMany(UserInvitation, {
  foreignKey: "origin_user_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});

UserInvitation.belongsTo(User, {
  foreignKey: "origin_user_id",
  targetKey: "id",
});

User.hasMany(UserInvitation, {
  foreignKey: "target_user_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});

UserInvitation.belongsTo(User, {
  foreignKey: "target_user_id",
  targetKey: "id",
});

export default User;
