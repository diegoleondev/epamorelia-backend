import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/database.js";
import UserInvitation from "./user-invitations.js";

class Branch extends Model<
  InferAttributes<Branch>,
  InferCreationAttributes<Branch>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare limit: number;
  declare counter: CreationOptional<number>;
}

Branch.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "branch",
  },
);

Branch.hasMany(UserInvitation, {
  foreignKey: "branchId",
});

UserInvitation.belongsTo(Branch, {
  foreignKey: "branchId",
});

export default Branch;
