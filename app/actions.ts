"use server";

export const getPaystackPublicKey = async (): Promise<string> => {
  return process.env.PAYSTACK_PUBLIC_KEY as string;
};
