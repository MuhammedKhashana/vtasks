import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db } from '../../fireConf';
import { doc, getDoc } from "firebase/firestore";
import { updateProfile, updateEmail, updatePassword, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logoutXr } from './userSlice';

export const getUserDocs = createAsyncThunk('userData/getUserDocs', async () => {
    try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        return docSnap.data()
    } catch (error) {
        console.log("No such document!");
        // console.log(error.message);
    }
})

export const updateUserData = createAsyncThunk(
    'userData/updateUserData',
    async ({ fullName, photoURL }, { dispatch }) => {
        try {
            if (fullName.trim() !== "") {
                await updateProfile(auth.currentUser, {
                    displayName: fullName,
                    photoURL: photoURL,
                }).then(toast.success('Your Data Updated Successfully'))

                dispatch(getUserDocs())
            } else {
                toast.error('Please Enter Your Name')
            }
        } catch (error) {
            // console.log(error.message);
            toast.error('Please Enter Your Name')
            throw error;
        }
    }
);

export const updateMail = createAsyncThunk('userData, updateMail', async ({ email, newMail, password }, { dispatch }) => {
    try {
        if (email.trim() !== "" && newMail.trim() !== "" && password.trim() !== "") {
            // reAuthunticate the user before update it's email
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(auth.currentUser, credential)

            // update user email
            await updateEmail(auth.currentUser, newMail);

            // Send email verification
            await sendEmailVerification(auth.currentUser);

            // Display success message
            toast.success(`A verification email has been sent to Your new email address ${newMail}!. Please verify your email to login`);

            // Dispatch action to fetch updated user data
            dispatch(getUserDocs());
            console.log(auth.currentUser);
        } else {
            toast.error('Please complete your data')
        }
    } catch (error) {
        toast.error('Incorrect Email / Password')
        // console.log(error.message);
    }
})

export const updateUserPassword = createAsyncThunk('userData, updateUserPassword', async ({ password, newPassword, nav }, { dispatch }) => {
    try {
        if (password.trim() === "" || password.trim() === "" || password.trim().length < 7) {
            toast.error('Please enter your current password')
            return;
        }
        if (newPassword.trim() === "" || newPassword.trim() === "") {
            toast.error('Please enter your new password')
            return;
        }
        // validate the old password 
        const credential = EmailAuthProvider.credential(`${auth.currentUser.email}`, password);
        // reAuthunticate user
        await reauthenticateWithCredential(auth.currentUser, credential)

        // update password 
        await updatePassword(auth.currentUser, newPassword)

        await nav()
        setTimeout(() => {
            dispatch(logoutXr())
        }, 500);
        toast.success('Password updated successfully')
    } catch (error) {
        toast.error('Incorrect current Password')
        // console.log(error.message);
    }
})


export const userDataSlice = createSlice({
    name: 'userData',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDocs.fulfilled, (state, action) => {
                return action.payload
            })
    }
})



// Action creators are generated for each case reducer function
// export const {  } = userDataSlice.actions

export default userDataSlice.reducer