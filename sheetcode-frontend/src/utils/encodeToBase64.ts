import { Buffer } from "buffer";

export const encodeToBase64 = (input: string): string => {
  return Buffer.from(input, "utf-8").toString("base64");
};
