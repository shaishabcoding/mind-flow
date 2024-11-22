"use server";

export const loginWithEmailAndPass = async ({ email, password }) => {
  const response = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return response;
};
