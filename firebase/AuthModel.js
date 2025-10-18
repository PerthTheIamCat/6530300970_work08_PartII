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
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
// No Storage used; we only store external photo URLs in Firestore

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
      uid: user.uid,
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

export const signUpPromise = (
  firstname,
  lastname,
  studentID,
  email,
  password
) =>
  new Promise((resolve, reject) =>
    signUp(firstname, lastname, studentID, email, password, resolve, reject)
  );

export const fetchUserProfileByEmail = async (email) => {
  const q = query(usersCollection, where("email", "==", email));
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

// FRIENDS APIs
export const addFriendByEmail = async (email) => {
  const user = auth.currentUser;
  if (!user || !user.uid || !user.email) throw new Error("Not authenticated");
  const targetEmail = (email || "").trim().toLowerCase();
  if (!targetEmail || !targetEmail.includes("@"))
    throw new Error("Please enter a valid email");
  if (targetEmail === user.email.toLowerCase())
    throw new Error("You cannot add yourself");

  const profile = await fetchUserProfileByEmail(targetEmail);
  if (!profile) throw new Error("No user found with that email");

  const itemsCol = collection(db, "friends", user.uid, "items");
  const friendDocRef = doc(itemsCol, profile.id);
  const existsSnap = await getDoc(friendDocRef);
  if (existsSnap.exists()) throw new Error("This user is already your friend");

  const payload = {
    friendUserDocId: profile.id,
    email: profile.email || targetEmail,
    firstname: profile.firstname || "",
    lastname: profile.lastname || "",
    studentID: profile.studentID || "",
    photoURL: profile.photoURL || "",
    createdAt: serverTimestamp(),
  };
  await setDoc(friendDocRef, payload);
  return { id: profile.id, ...payload };
};

export const fetchFriendsForCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user || !user.uid) throw new Error("Not authenticated");
  const itemsCol = collection(db, "friends", user.uid, "items");
  const snap = await getDocs(itemsCol);
  const base = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const withPhotos = await Promise.all(
    base.map(async (f) => {
      try {
        const userDocId = f.friendUserDocId || f.id;
        if (userDocId) {
          const uref = doc(usersCollection, userDocId);
          const usnap = await getDoc(uref);
          const pdata = usnap.exists() ? usnap.data() : {};
          return { ...f, photoURL: pdata.photoURL || f.photoURL || "" };
        }
      } catch (_) {}
      return { ...f, photoURL: f.photoURL || "" };
    })
  );
  return withPhotos;
};

// PROFILE APIs
const getCurrentUserDocRef = async () => {
  const user = auth.currentUser;
  if (!user || !user.uid) throw new Error("Not authenticated");
  let q1 = query(usersCollection, where("uid", "==", user.uid));
  let snap = await getDocs(q1);
  if (snap.empty && user.email) {
    const q2 = query(usersCollection, where("email", "==", user.email));
    snap = await getDocs(q2);
  }
  if (snap.empty) throw new Error("Profile not found");
  return snap.docs[0].ref;
};

export const updateUserProfile = async (updates) => {
  const refDoc = await getCurrentUserDocRef();
  await updateDoc(refDoc, updates);
  return true;
};
