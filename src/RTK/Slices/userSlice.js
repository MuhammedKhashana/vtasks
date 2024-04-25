import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from '../../fireConf';
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const signupXr = createAsyncThunk('user/signupXr', async ({ email, password, displayName, nav }, { dispatch }) => {
    try {
        if (displayName.trim() === "") {
            toast.error('Please enter the Name')
            return;
        }
        if (email.trim() === "") {
            toast.error('Please enter the email')
            return;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.trim())) {
            toast.error('Please enter a valid email')
            return;
        }
        if (password.trim() === "") {
            toast.error('Please enter the password')
            return;
        }
        // == create new user
        // eslint-disable-next-line no-unused-vars
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // == create data in db for user with his ID and sitting the stracture for his data
        await updateProfile(auth.currentUser, {
            displayName: displayName
        })
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: auth.currentUser.displayName,
        })

        nav()
        sendEmailVerification(auth.currentUser)
            .then(() => {
            });
        // return res.user.uid;
    } catch (error) {
        // console.log(error.message);
        toast.error(error.message.slice(15))
    }
})

export const signWithgoogleXr = createAsyncThunk('user/signupWithgoogleXr', async ({ nav }) => {
    try {
        const provider = await new GoogleAuthProvider();
        // eslint-disable-next-line no-unused-vars
        await signInWithPopup(auth, provider);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            name: auth.currentUser.displayName,
            about: ""
        })

        nav()
    } catch (error) {
        console.error(error.message);
        toast.error(error.message.slice(15));
    }
})


export const loginXr = createAsyncThunk('user/loginXr', async ({ email, password, nav }, { dispatch }) => {
    try {
        if (email.trim() === "") {
            toast.error('Please enter the email')
            return;
        }
        if (password.trim() === "") {
            toast.error('Please enter the password')
            return;
        }
        // eslint-disable-next-line no-unused-vars
        const res = await signInWithEmailAndPassword(auth, email, password);
        nav()
        // return res.user.uid;
    } catch (error) {
        // console.log(error.message);
        toast.error(error.message.slice(15))
    }
})

export const logoutXr = createAsyncThunk('user/logoutXr', async (state) => {
    try {
        signOut(auth);
        // return null
    } catch (error) {
        // console.log(error.message);
        toast.error(error.message.slice(15))
    }
})

export const forgetPassword = createAsyncThunk('user/forgetPassword', async (email) => {
    try {
        if (email.trim() === "") {
            toast.error('Please Enter your email')
            return;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.trim())) {
            toast.error('Please enter a valid email')
            return;
        }
        await sendPasswordResetEmail(auth, email)
        toast.success(`Please check your mail ${email} and open the link to reset your password`)

    } catch (error) {
        // console.log(error.message);
        toast.error("There's no account with that email")
    }
})

export const signupSlice = createSlice({
    name: 'user',
    initialState: false,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupXr.fulfilled, (state) => {
                return true
            })
            .addCase(loginXr.fulfilled, (state) => {
                return true
            })
            .addCase(logoutXr.pending, (state) => {
                return false;
            })
    }
})


// Action creators are generated for each case reducer function
// export const {  } = signupSlice.actions

export default signupSlice.reducer