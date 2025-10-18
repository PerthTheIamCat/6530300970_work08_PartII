import app, { auth } from "./connect";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

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

export const doSignOut = async () => {
  await signOut(auth);
};

export const signInPromise = (email, password) =>
  new Promise((resolve, reject) => signIn(email, password, resolve, reject));

export const fetchUserProfileByEmail = async (email) => {
  const q = query(usersCollection, where("username", "==", email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const changePassword = async (oldPassword, newPassword) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("No authenticated user");
  const credential = EmailAuthProvider.credential(user.email, oldPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
  return true;
};

export const recoverPassword = async (email) => {
  if (!email) throw new Error("Please enter your email");
  return await sendPasswordResetEmail(auth, email);
};
