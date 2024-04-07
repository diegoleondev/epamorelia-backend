import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/database.js";

class FormUserData extends Model<
  InferAttributes<FormUserData>,
  InferCreationAttributes<FormUserData>
> {
  declare id: CreationOptional<string>;
  declare createdBy: string;
  declare editable: CreationOptional<boolean>;
  declare completed: CreationOptional<boolean>;
  declare deleted: CreationOptional<boolean>;

  declare userType: CreationOptional<number | null>;
  declare name: string;
  declare surname: CreationOptional<string | null>;
  declare phone: CreationOptional<string | null>;
  declare branchId: string | null;
  declare sex: CreationOptional<boolean | null>;
  declare emergencyContactFullName: CreationOptional<string | null>;
  declare emergencyContactPhone: CreationOptional<string | null>;
  declare allergies: CreationOptional<string | null>;
  declare diseases: CreationOptional<string | null>;
  declare medicine: CreationOptional<string | null>;
}

FormUserData.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    editable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    userType: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branchId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    emergencyContactFullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diseases: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "form_user_data",
    timestamps: false,
  },
);

export default FormUserData;
