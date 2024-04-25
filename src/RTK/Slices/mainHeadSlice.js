import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db } from '../../fireConf';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, orderBy, Timestamp, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getMainHeadDocs = createAsyncThunk('mainHead/getMainHeadDocs', async () => {
    try {
        const collectionRef = collection(db, "users", auth.currentUser.uid, "mainHead")
        const queryRef = query(collectionRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(queryRef);

        const formattedTasks = querySnapshot.docs.map((doc) => {
            // Convert Timestamp to Date
            const data = doc.data();
            const timestamp = data.timestamp instanceof Timestamp ? data.timestamp.toMillis() : data.timestamp;
            return { id: doc.id, data: { ...data, timestamp } };
        });

        return formattedTasks
    } catch (error) {
        console.log(error.message);
    }
})

// CREATE HEADER
export const addTaskInMain = createAsyncThunk('mainHead/addTaskInMain', async ({ title, desc }, { dispatch }) => {
    try {
        if (title.trim() !== "") {
            // eslint-disable-next-line no-unused-vars
            const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "mainHead"), {
                title: title,
                desc: desc,
                isCompleted: false,
                timestamp: serverTimestamp()
            });
            dispatch(getMainHeadDocs())
        } else {
            toast.error('Please enter the title')
        }
    } catch (error) {
        console.log(error.message);
    }
})


export const updateTaskInMain = createAsyncThunk('mainHead/updateTaskInMain', async ({ taskID, title, desc }, { dispatch }) => {
    try {
        if (title.trim() !== "") {
            // eslint-disable-next-line no-unused-vars
            const docRef = await updateDoc(doc(db, "users", auth.currentUser.uid, "mainHead", taskID), {
                title: title,
                desc: desc
            });
            dispatch(getMainHeadDocs())
        } else {
            toast.error('Please enter the title')
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const isCompletedTaskInMain = createAsyncThunk('mainHead/isCompletedTaskInMain', async ({ taskID, isCompleted }, { dispatch }) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const docRef = await updateDoc(doc(db, "users", auth.currentUser.uid, "mainHead", taskID), {
            isCompleted: isCompleted
        });
        dispatch(getMainHeadDocs())
    } catch (error) {
        console.log(error.message);
    }
})

export const deleteTaskInMain = createAsyncThunk('mainHead/deleteTaskInMain', async (taskID, { dispatch }) => {
    try {
        // Add a new document with a generated id.
        // eslint-disable-next-line no-unused-vars
        const docRef = await deleteDoc(doc(db, "users", auth.currentUser.uid, "mainHead", taskID));
        dispatch(getMainHeadDocs())
    } catch (error) {
        console.log(error.message);
    }
})


export const mainHeadSlice = createSlice({
    name: 'mainHead',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMainHeadDocs.fulfilled, (state, action) => {
                return action.payload
            })
    }
})


// Action creators are generated for each case reducer function
// export const {  } = userSrvsSlice.actions

export default mainHeadSlice.reducer