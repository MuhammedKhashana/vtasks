import React, { useState, useRef } from 'react'
import { Text, Avatar, Flex, Dialog, Button, TextField, Callout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { auth } from '../fireConf'
import { updateMail, updateUserData, updateUserPassword } from '../RTK/Slices/userDataSlice'
import { ArrowBarRight, ArrowLeftShort, ArrowRight } from 'react-bootstrap-icons'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { logoutXr } from '../RTK/Slices/userSlice'
import { useNavigate } from 'react-router-dom'


export default function ProfileControll() {
    const dispatch = useDispatch()
    const navi = useNavigate()

    //  profile new Data
    const fullName = useRef()
    // const email = useRef()
    // const phoneNumber = useRef()
    const photoURL = useRef()

    // diplay advanced profile sittings (reset email & pass) or no
    const [advSittings, setAdvSittings] = useState(false)
    // display reset email or reset password
    const [emailOrPass, setEmailOrPass] = useState("")

    // Refs to update email
    const email = useRef()
    const newMail = useRef()
    const password = useRef()

    // Refs to update password
    const currentPassword = useRef()
    const newPassword = useRef()

    const logOut = () => {
        dispatch(logoutXr())
        navi('/register')
    }

    const handleUpdateProfile = () => {
        dispatch(updateUserData({
            fullName: fullName.current.value.replace(/\s+/g, ' ').trim(),
            photoURL: photoURL.current.value
        }))
    }

    const handleUpdateEmail = () => {
        dispatch(
            updateMail({
                email: email.current.value,
                newMail: newMail.current.value,
                password: password.current.value,
            })
        ).then(
            setEmailOrPass("")
        )
    }

    const handleUpdatePassword = () => {
        dispatch(
            updateUserPassword({
                password: currentPassword.current.value,
                newPassword: newPassword.current.value,
                nav: () => {
                    navi('/register')
                },
            })
        )
    }

    return (
        <div>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Avatar
                        size={{ initial: "3", md: "5" }}
                        className='me-2'
                        src={auth.currentUser.photoURL && auth.currentUser.photoURL.trim()}
                        fallback={(auth.currentUser.displayName.replace(/\s+/g, ' ').trim().split(" ").length > 1) ?
                            (auth.currentUser.displayName.replace(/\s+/g, ' ').trim().split(" ").slice(-1)[0][0] !== undefined) ?
                                auth.currentUser.displayName.replace(/\s+/g, ' ').trim().split(" ")[0][0] + auth.currentUser.displayName.replace(/\s+/g, ' ').trim().split(" ").slice(-1)[0][0].replace(/\s+/g, ' ').trim()
                                : auth.currentUser.displayName.replace(/\s+/g, ' ').trim().split(" ")[0][0]
                            :
                            auth.currentUser.displayName.split(" ")[0][0]
                        }
                    />
                    <div className='d-flex flex-column'>
                        <Text size={{ initial: "2", md: "5" }} className='m-0 fw-semibold'>{auth.currentUser.displayName}</Text>
                        <Text size='1' className='m-0 fw-light'>{auth.currentUser.email}</Text>
                    </div>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <Dialog.Root>
                        <Dialog.Trigger className='ms-1'>
                            <Button>Edit profile</Button>
                        </Dialog.Trigger>

                        {advSittings ?
                            <Dialog.Content maxWidth="450px">
                                <Dialog.Title>Edit profile</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Make changes to your profile.
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    {
                                        (emailOrPass === "")
                                            ?
                                            <Flex gap="5" mb={'2'} direction='column' justify="between">
                                                <Button variant="outline" color="gray"
                                                    className='shadow-none d-flex flex-row justify-content-between'
                                                    onClick={() => setEmailOrPass('email')}
                                                >
                                                    <Text>Reset Email</Text>
                                                    <ArrowRight size={'20'} />
                                                </Button>
                                                <Button variant="outline" color="gray"
                                                    className='shadow-none d-flex flex-row justify-content-between'
                                                    onClick={() => setEmailOrPass('password')}
                                                >
                                                    <Text>Reset Password</Text>
                                                    <ArrowRight size={'20'} />
                                                </Button>
                                            </Flex>
                                            :
                                            (emailOrPass === 'email') ?
                                                <div>
                                                    <button className='btn p-0' onClick={() => setEmailOrPass("")}>
                                                        <ArrowLeftShort size={'22'} />
                                                    </button>
                                                    <div className='mb-2 d-flex flex-column'>
                                                        <label className='my-2'>
                                                            <Text size="2" ml={'1'} weight="bold">
                                                                Current Email
                                                            </Text>
                                                            <TextField.Root
                                                                ref={email}
                                                                defaultValue={auth.currentUser.email}
                                                                placeholder="Enter your current Email"
                                                            />
                                                        </label>
                                                        <label className='my-2'>
                                                            <Text size="2" ml={'1'} weight="bold">
                                                                New Email
                                                            </Text>
                                                            <TextField.Root
                                                                ref={newMail}
                                                                // defaultValue={auth.currentUser.email}
                                                                placeholder="Enter your new Email"
                                                            />
                                                        </label>
                                                        <label className='my-2'>
                                                            <Text size="2" ml={'1'} weight="bold">
                                                                Password
                                                            </Text>
                                                            <TextField.Root
                                                                type='password'
                                                                ref={password}
                                                                // defaultValue={auth.currentUser.email}
                                                                placeholder="Enter your password"
                                                            />
                                                        </label>
                                                    </div>
                                                    <Button my={'2'} color='blue' className='w-100'
                                                        onClick={() => handleUpdateEmail()}
                                                    >
                                                        Update Email
                                                    </Button>
                                                </div>
                                                :
                                                <div>
                                                    <button className='btn p-0' onClick={() => setEmailOrPass("")}>
                                                        <ArrowLeftShort size={'22'} />
                                                    </button>
                                                    <div className='mb-2 d-flex flex-column'>
                                                        <label className='my-2'>
                                                            <Text size="2" ml={'1'} weight="bold">
                                                                Current Password
                                                            </Text>
                                                            <TextField.Root
                                                                type='password'
                                                                ref={currentPassword}
                                                                placeholder="Enter your current password"
                                                            />
                                                        </label>
                                                        <label className='my-2'>
                                                            <Text size="2" ml={'1'} weight="bold">
                                                                New Password
                                                            </Text>
                                                            <TextField.Root
                                                                type='password'
                                                                ref={newPassword}
                                                                placeholder="Enter your new password"
                                                            />
                                                        </label>
                                                    </div>
                                                    <Button my={'2'} color='blue' className='w-100'
                                                        onClick={() => handleUpdatePassword()}
                                                    >
                                                        Update Password
                                                    </Button>
                                                </div>
                                    }
                                </Flex>

                                <Flex gap="3" mt="4" justify="between" align={'center'}>
                                    <Button color='blue' variant='outline' className='shadow-none'
                                        onClick={() =>
                                            setAdvSittings(false)
                                        }>
                                        Close Advanced Sittings
                                    </Button>
                                    <Flex gap="3" justify="end" align={'center'}>
                                        <Dialog.Close>
                                            <Button variant="soft" color="gray" onClick={() => setAdvSittings(false)}>
                                                Cancel
                                            </Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Flex>
                            </Dialog.Content>
                            :
                            <Dialog.Content maxWidth="450px">
                                <Dialog.Title>Edit profile</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Make changes to your profile.
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Name
                                        </Text>
                                        <TextField.Root
                                            maxLength={'30'}
                                            ref={fullName}
                                            defaultValue={auth.currentUser.displayName}
                                            placeholder="Enter your full name"
                                        />
                                    </label>
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Image Link
                                        </Text>
                                        <TextField.Root
                                            ref={photoURL}
                                            defaultValue={auth.currentUser.photoURL && auth.currentUser.photoURL.trim()}
                                            placeholder="Enter URL"
                                        />
                                    </label>
                                </Flex>
                                <Flex gap="3" mt="4" justify="between" align={'center'}>
                                    <Button color='blue' variant='outline' className='shadow-none'
                                        onClick={() =>
                                            setAdvSittings(true)
                                        }>
                                        Advanced Sittings
                                    </Button>
                                    <Flex gap="3" justify="end" align={'center'}>
                                        <Dialog.Close>
                                            <Button variant="soft" color="gray">
                                                Cancel
                                            </Button>
                                        </Dialog.Close>
                                        <Dialog.Close>
                                            <Button onClick={() => handleUpdateProfile()}>Save</Button>
                                        </Dialog.Close>
                                    </Flex>
                                </Flex>
                            </Dialog.Content>
                        }
                    </Dialog.Root>
                    <button className='btn m-0 p-0' onClick={() => logOut()}>
                        <ArrowBarRight size='30' />
                    </button>
                </div>
            </div>
            {
                (auth.currentUser.emailVerified)
                    ?
                    null
                    :
                    <Callout.Root className='mt-3' color='tomato' size={{initial:"1", md:"3"}}>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text className='m-0'>
                            Please verify your email, We have sent you verification email.
                        </Callout.Text>
                    </Callout.Root>
            }
        </div>
    )
}
