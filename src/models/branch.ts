import Branch from "../schemas/branch.js";
import sequelizeErrorHandler from "../utils/error-handler-sequelize.js";

interface CreateBranchProps {
  name: string;
  limit: number;
}

interface UpdateBranchProps {
  id: string;
  name?: string;
  limit?: number;
}

export const findByPKBranchModel = async (props: { id: string }) => {
  const response = await sequelizeErrorHandler(Branch.findByPk(props.id));

  return { ...response, data: response.data?.toJSON() ?? null };
};

export const findAllBranchesModel = async () => {
  const result = await sequelizeErrorHandler(Branch.findAll());

  return {
    ...result,
    data: result.data?.map((branch) => branch.toJSON()) ?? [],
  };
};

export const createBranchModel = async (props: CreateBranchProps) => {
  const branch = await sequelizeErrorHandler(
    Branch.create({
      name: props.name,
      limit: props.limit,
    }),
  );

  return branch;
};

export const updateBranchModel = async (props: UpdateBranchProps) => {
  await Branch.update(
    {
      name: props.name,
      limit: props.limit,
    },
    {
      where: {
        id: props.id,
      },
    },
  );
};

export const removeBranchModel = async (props: { id: string }) => {
  await Branch.destroy({
    where: {
      id: props.id,
    },
  });
};
