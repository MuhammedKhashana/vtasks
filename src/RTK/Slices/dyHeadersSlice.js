import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db } from '../../fireConf';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// GET HEADERS LISTS
export const getDyHeadersDocs = createAsyncThunk('DyHeaders/getDyHeadersDocs', async () => {
    try {
        const collectionRef = collection(db, "users", auth.currentUser.uid, "DyHeaders");
        const queryRef = query(collectionRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(queryRef);

        const formattedData = querySnapshot.docs.map((doc) => {
            // Convert Timestamp to Date
            const data = doc.data();
            const timestamp = data.timestamp instanceof Timestamp ? data.timestamp.toMillis() : data.timestamp;
            return { id: doc.id, data: { ...data, timestamp } };
        });

        return formattedData;
    } catch (error) {
        console.log(error.message);
    }
})

// Create HEADER LIST 
export const addHeader = createAsyncThunk('DyHeaders/addTaskDoc', async ({ title }, { dispatch }) => {
    try {
        if (title.trim() !== "") {
            // eslint-disable-next-line no-unused-vars
            const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "DyHeaders"), {
                title: title,
                timestamp: serverTimestamp()
            });
            dispatch(getDyHeadersDocs())
        } else {
            toast.error('Please enter list Name')
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const updateListTitle = createAsyncThunk('DyHeaders/updateListTitle', async ({ listTitleDocId, title }, { dispatch }) => {
    try {
        if (title.trim() !== "") {
            // eslint-disable-next-line no-unused-vars
            const docRef = await updateDoc(doc(db, "users", auth.currentUser.uid, "DyHeaders", listTitleDocId), {
                title: title,
            });
            dispatch(getDyHeadersDocs())
            .then(toast.success('Data updated successfully'))
        } else {
            toast.error('Please enter list Name')
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const deleteList = createAsyncThunk('DyHeaders/deleteList', async (listTitleDocId, { dispatch }) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const docRef = await deleteDoc(doc(db, "users", auth.currentUser.uid, "DyHeaders", listTitleDocId));
        dispatch(getDyHeadersDocs())
    } catch (error) {
        console.log(error.message);
    }
})


export const DyHeadersSlice = createSlice({
    name: 'DyHeaders',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDyHeadersDocs.fulfilled, (state, action) => {
                return action.payload
            })
    }
})


// Action creators are generated for each case reducer function
// export const {  } = userSrvsSlice.actions

export default DyHeadersSlice.reducer