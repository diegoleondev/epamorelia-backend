import bcrypt from "bcryptjs";

export async function encrypt(value: string) {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(value, salt);

  return encrypted;
}

export async function compare(value: string, encrypted: string) {
  return await bcrypt.compare(value, encrypted);
}

export default { encrypt, compare };
