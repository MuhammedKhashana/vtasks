import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import userDataSlice from './Slices/userDataSlice'
import mainHeadSlice from './Slices/mainHeadSlice'
import DyHeadersSlice from './Slices/dyHeadersSlice'
import dyHeadSlice from './Slices/dyHeadSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        userData: userDataSlice,
        mainHead: mainHeadSlice,
        DyHeaders: DyHeadersSlice,
        dyHead: dyHeadSlice
    },
})