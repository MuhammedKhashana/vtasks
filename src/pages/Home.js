import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDocs } from '../RTK/Slices/userDataSlice'
import { getMainHeadDocs } from '../RTK/Slices/mainHeadSlice'
import { getDyHeadersDocs } from '../RTK/Slices/dyHeadersSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from "react-awesome-reveal";
import ProfileControll from '../components/profileControll'
import TabS from '../components/tabs'


export default function Home() {
    const dispatch = useDispatch()

    // eslint-disable-next-line no-unused-vars
    const userData = useSelector((state) => state.userData)

    // ==== TESTING AREA ==== //
    // console.log(auth.currentUser);
    // console.log(userData);


    useEffect(() => {
        dispatch(getUserDocs())
        dispatch(getMainHeadDocs())
        dispatch(getDyHeadersDocs())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
            <Container className='mt-5'>
                <Slide direction='down'>
                    <ProfileControll />
                </Slide>
                {/* ================================ STARTING TABS / USER CONTENT =====================================  */}
                <TabS />
            </Container >
            <ToastContainer style={{ zIndex: "999999" }} />
        </div >
    )
}
