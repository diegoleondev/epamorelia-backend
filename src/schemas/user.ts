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
  declare createdAt: CreationOptional<Date>;
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
    createdAt: {
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
  foreignKey: "userId",
  sourceKey: "id",
  onDelete: "CASCADE",
});

UserToken.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

User.hasMany(UserInvitation, {
  foreignKey: "sourceUserId",
  sourceKey: "id",
  onDelete: "CASCADE",
});

UserInvitation.belongsTo(User, {
  foreignKey: "sourceUserId",
  targetKey: "id",
});

User.hasMany(UserInvitation, {
  foreignKey: "targetUserId",
  sourceKey: "id",
  onDelete: "CASCADE",
});

UserInvitation.belongsTo(User, {
  foreignKey: "targetUserId",
  targetKey: "id",
});

export default User;
