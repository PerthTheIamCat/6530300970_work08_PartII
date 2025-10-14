import app from "./connect";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore, addDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);
export const usersCollection = collection(db, "users");

export const signIn = async (email, password, success, unsuccess) => {
  console.log("signing in...", email);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Login Success with email :", email);
    success(user);
  } catch (error) {
    console.log("Error signing in:", error);
    unsuccess(error);
  }
};

export const signUp = async (
  firstname,
  lastname,
  studentID,
  email,
  password,
  success,
  unsuccess
) => {
  console.log("signing up...", email);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userDoc = {
      firstname: firstname,
      lastname: lastname,
      studentID: studentID,
      email: email,
    };
    const doc_ref = await addDoc(usersCollection, userDoc);
    console.log("Document written with ID: ", doc_ref.id);
    success(user);
  } catch (error) {
    console.log("Error signing up:", error);
    unsuccess(error);
  }
};
