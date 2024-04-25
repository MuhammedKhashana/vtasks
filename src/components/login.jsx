import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'
import { forgetPassword, loginXr } from '../RTK/Slices/userSlice';
import { auth } from '../fireConf';
import { Separator, Button, Dialog, TextField, Text, Flex } from '@radix-ui/themes'
import { Google } from 'react-bootstrap-icons'
import { signWithgoogleXr } from '../RTK/Slices/userSlice';




export default function Login() {
    const navi = useNavigate()

    const dispatch = useDispatch()

    const email = useRef()
    const password = useRef()
    const emailForForget = useRef()

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch(loginXr({
            email: email.current.value,
            password: password.current.value,
            nav: () => {
                navi(`/${auth.currentUser.uid}/home`)
            }
        }))
    }


    return (
        <div>
            <Form onSubmit={handleLogin}>
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
                <button className='btn mt-3 bg-black text-white w-100' type='submit'>log-in</button>
                <div className='d-flex flex-row align-items-center'>
                    <Separator my="3" size="4" />
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button color='blue' variant='outline' className='btn shadow-none m-0 p-0 mx-3 m-2' type='button'>Forget Password</Button>
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Reset password</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                login with your mail verify
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Email
                                    </Text>
                                    <TextField.Root
                                        type='email'
                                        ref={emailForForget}
                                        defaultValue="freja@example.com"
                                        placeholder="Enter your email"
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button onClickCapture={() => {
                                        dispatch(
                                            forgetPassword(emailForForget.current.value)
                                        )
                                    }}>Save</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                    <Separator my="3" size="4" />
                </div>
            </Form>
            <button className='btn bg-black text-white w-100' type='button' onClick={() => dispatch(signWithgoogleXr({
                nav: () => {
                    navi(`/${auth.currentUser.uid}/home`)
                }
            }))}><Google className='my-1' size='20' /> log-in with your google Acount</button>
        </div>
    )
}
