import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // register user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   update user profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //   log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //  observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   all info
  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
