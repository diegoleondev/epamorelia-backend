import { z } from "zod";
import { DETAILS } from "../constants/index.js";
import { branchId } from "./branch.js";
import { schemaHandler } from "./handler.js";

// SCHEMAS
const textSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(2, DETAILS.SHORT)
  .max(200, DETAILS.LONG);

const idSchema = z.string({
  required_error: DETAILS.EMPTY,
  invalid_type_error: DETAILS.TYPE,
});

const userTypeSchema = z.number({
  required_error: DETAILS.EMPTY,
  invalid_type_error: DETAILS.TYPE,
});

const fullNameSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(5, DETAILS.SHORT)
  .max(30, DETAILS.LONG);

const phoneSchema = z
  .string({
    required_error: DETAILS.EMPTY,
    invalid_type_error: DETAILS.TYPE,
  })
  .min(10, DETAILS.SHORT)
  .max(15, DETAILS.LONG);

const sexSchema = z.boolean({
  required_error: DETAILS.EMPTY,
  invalid_type_error: DETAILS.TYPE,
});

const emergencyContactFullNameSchema = fullNameSchema;
const emergencyContactPhoneSchema = phoneSchema;
const allergiesSchema = textSchema;
const diseasesSchema = textSchema;
const medicineSchema = textSchema;

const getFormUserDataSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});
export const getFormUserDataValidator = schemaHandler(getFormUserDataSchema);
export type GetFormUserDataParams = z.infer<
  typeof getFormUserDataSchema
>["params"];

const getAllFormUserDataSchema = z.object({
  query: z.object({
    branchId: branchId.optional(),
  }),
});
export const getAllFormUserDataValidator = schemaHandler(
  getAllFormUserDataSchema,
);
export type GetAllFormUserDataQuery = z.infer<
  typeof getAllFormUserDataSchema
>["query"];

const createFormUserDataSchema = z.object({
  body: z.object({
    fullName: fullNameSchema,
    branchId,
  }),
});
export const createFormUserDataValidator = schemaHandler(
  createFormUserDataSchema,
);
export type CreateFormUserDataBody = z.infer<
  typeof createFormUserDataSchema
>["body"];

/* UPDATE ADMIN */
const updateFormUserDataSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    editable: z.boolean().optional(),
    deleted: z.boolean().optional(),
  }),
});
export const updateFormUserDataValidator = schemaHandler(
  updateFormUserDataSchema,
);
export type UpdateFormUserDataParams = z.infer<
  typeof updateFormUserDataSchema
>["params"];
export type UpdateFormUserDataBody = z.infer<
  typeof updateFormUserDataSchema
>["body"];

/* UPDATE PUBLIC */
const updateFormUserDataPublicSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    userType: userTypeSchema,
    phone: phoneSchema,
    sex: sexSchema,
    emergencyContactFullName: emergencyContactFullNameSchema,
    emergencyContactPhone: emergencyContactPhoneSchema,
    allergies: allergiesSchema,
    diseases: diseasesSchema,
    medicine: medicineSchema,
  }),
});
export const updateFormUserDataPublicValidator = schemaHandler(
  updateFormUserDataPublicSchema,
);
export type UpdateFormUserDataPublicParams = z.infer<
  typeof updateFormUserDataPublicSchema
>["params"];
export type UpdateFormUserDataPublicBody = z.infer<
  typeof updateFormUserDataPublicSchema
>["body"];

/* DELETE */
const deleteFormUserDataSchema = z.object({
  params: z.object({
    id: idSchema,
  }),
});
export const deleteFormUserDataValidator = schemaHandler(
  deleteFormUserDataSchema,
);
export type DeleteFormUserDataParams = z.infer<
  typeof deleteFormUserDataSchema
>["params"];
