const DB_SYNC_MODES = {
  DELETE: "delete",
  CREATE_IF_NOT_EXISTS: "create_if_not_exists",
  UPDATE: "update",
} as const;

export default DB_SYNC_MODES;
