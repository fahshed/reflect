import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./config";

export async function signUpWithEmail(
  email: string,
  password: string,
  fullname: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: fullname,
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}
