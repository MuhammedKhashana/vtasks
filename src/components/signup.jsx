import React, { useRef } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'
import { signWithgoogleXr, signupXr } from '../RTK/Slices/userSlice';
import { useNavigate } from 'react-router-dom'
import { auth } from '../fireConf';
import { Separator } from '@radix-ui/themes'
import { Google } from 'react-bootstrap-icons'


export default function Signup() {
    const navi = useNavigate()
    const dispatch = useDispatch()

    const displayName = useRef()
    // const phoneNumber = useRef()
    const email = useRef()
    const password = useRef()

    const handleSignup = (e) => {
        e.preventDefault()

        dispatch(signupXr({
            email: email.current.value,
            password: password.current.value,
            displayName: displayName.current.value,
            nav: () => {
                navi(`/${auth.currentUser.uid}/home`)
            }
        }))
    }


    return (
        <div>
            <Form onSubmit={handleSignup}>
                <FloatingLabel controlId="floatingName" label="Full Name">
                    <Form.Control ref={displayName} type="text" placeholder="Full Name" className="mb-3" />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control ref={email} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control ref={password} type="password" placeholder="Password" />
                </FloatingLabel>
                <button className='btn mt-3 bg-black text-white w-100' type='submit'>Sign-up</button>
                <Separator my="3" size="4" />
            </Form>
            <button className='btn bg-black text-white w-100' type='submit' onClick={() => dispatch(signWithgoogleXr({
                nav: () => {
                    navi(`/${auth.currentUser.uid}/home`)
                }
            }))}><Google className='my-1' size='20' /> Sign-up with your google Acount</button>
        </div>
    )
}
