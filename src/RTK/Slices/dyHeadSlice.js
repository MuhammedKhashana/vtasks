import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db } from '../../fireConf';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, serverTimestamp, query, orderBy, Timestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// GET HEADERS LISTS
export const getDyHeaderDocs = createAsyncThunk('DyHeader/getDyHeaderDocs', async (headId) => {
    try {
        // Get a reference to the parent document (header) containing the subcollection
        const headerRef = doc(db, "users", auth.currentUser.uid, "DyHeaders", headId);

        // Get a reference to the subcollection "tasksList" within the parent document
        const tasksListRef = collection(headerRef, "tasksList");

        // ordering the collection by "timestamp" field
        const queryRef = query(tasksListRef, orderBy("timestamp", "desc"));

        // Get all documents from the "tasksList" subcollection
        const querySnapshot = await getDocs(queryRef);

        // Map the documents to an array of objects containing id and data
        // const tasks = querySnapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     data: doc.data()
        // }));

        const formattedTasks = querySnapshot.docs.map((doc) => {
            // Convert Timestamp to Date
            const data = doc.data();
            const timestamp = data.timestamp instanceof Timestamp ? data.timestamp.toMillis() : data.timestamp;
            return { id: doc.id, data: { ...data, timestamp } };
        });

        return formattedTasks;
    } catch (error) {
        console.log(error.message);
    }
})

// Create HEADER LIST 
export const addTaskInDyHeader = createAsyncThunk('DyHeader/addTaskInDyHeader', async ({ headId, title, desc }, { dispatch }) => {
    try {
        if (title.trim() !== "") {
            const collectionRef = collection(db, "users", auth.currentUser.uid, "DyHeaders", headId, "tasksList");
            // eslint-disable-next-line no-unused-vars
            const docRef = await addDoc((collectionRef), {
                title: title,
                desc: desc,
                timestamp: serverTimestamp()
            });
            dispatch(getDyHeaderDocs(headId))
        } else {
            toast.error('Please enter the title')
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const updateTaskInDyColl = createAsyncThunk('DyHeader/updateTaskInDyColl', async ({ headId, taskDocId, title, desc }, { dispatch }) => {
    try {
        if (title.trim() !== "") {
            const collectionRef = collection(db, "users", auth.currentUser.uid, "DyHeaders", headId, "tasksList");
            // eslint-disable-next-line no-unused-vars
            const docRef = await updateDoc(doc(collectionRef, taskDocId), {
                title: title,
                desc: desc
            });
            dispatch(getDyHeaderDocs(headId))
        } else {
            toast.error('Please enter the title')
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const isCompletedTaskInDy = createAsyncThunk('DyHeader/isCompletedTaskInDy', async ({ headId, taskDocId, isCompleted }, { dispatch }) => {
    try {
        const collectionRef = collection(db, "users", auth.currentUser.uid, "DyHeaders", headId, "tasksList");
        // eslint-disable-next-line no-unused-vars
        const docRef = await updateDoc(doc(collectionRef, taskDocId), {
            isCompleted: isCompleted
        });
        dispatch(getDyHeaderDocs(headId))
    } catch (error) {
        console.log(error.message);
    }
})

export const deleteTaskInDyColl = createAsyncThunk('DyHeader/deleteServiceDoc', async ({ headId, taskDocId }, { dispatch }) => {
    try {
        const collectionRef = collection(db, "users", auth.currentUser.uid, "DyHeaders", headId, "tasksList");
        // eslint-disable-next-line no-unused-vars
        const docRef = await deleteDoc(doc(collectionRef, taskDocId));
        dispatch(getDyHeaderDocs(headId))
    } catch (error) {
        console.log(error.message);
    }
})


export const DyHeaderSlice = createSlice({
    name: 'DyHeader',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDyHeaderDocs.fulfilled, (state, action) => {
                return action.payload
            })
    }
})


// Action creators are generated for each case reducer function
// export const {  } = userSrvsSlice.actions

export default DyHeaderSlice.reducer