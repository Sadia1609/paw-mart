import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const registerWithEmailPassword = (email, pass)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,pass)
    }

    const loginWithEmailPassword = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }

    const handleGoogleSignin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Save user to database
    const saveUser = async (user) => {
        const userData = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            role: 'user'
        };
        
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
        } catch (error) {
            console.log('Error saving user:', error);
        }
    }

    // Get user role from database
    const getUserRole = async (email) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${email}`);
            return response.data?.role || 'user';
        } catch (error) {
            console.log('Error getting user role:', error);
            return 'user';
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
            if (currentUser) {
                setUser(currentUser);
                // Save user to database
                await saveUser(currentUser);
                // Get user role
                const role = await getUserRole(currentUser.email);
                setUserRole(role);
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        })
        return ()=>{
           unsubscribe()
        }
    },[])

    const authData = {
        registerWithEmailPassword,
        loginWithEmailPassword,
        setUser,
        user,
        userRole,
        handleGoogleSignin,
        logOut,
        loading,
        saveUser,
        getUserRole
    }

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;