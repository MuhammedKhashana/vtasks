import React from 'react'
import { Tabs, Box } from '@radix-ui/themes'
import Container from 'react-bootstrap/Container'
import Login from '../components/login'
import Signup from '../components/signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fade } from 'react-awesome-reveal'

export default function Regist() {
    return (
        <>
            <Container>
                <Tabs.Root defaultValue="login">
                    <Tabs.List>
                        <Tabs.Trigger value="login">Log-in</Tabs.Trigger>
                        <Tabs.Trigger value="signup">Sign-up</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="login">
                            <Fade duration={'400'}>
                                <Login />
                            </Fade>
                        </Tabs.Content>

                        <Tabs.Content value="signup">
                            <Fade duration={'400'}>
                                <Signup />
                            </Fade>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Container>
            <ToastContainer style={{ zIndex: "999999" }} />
        </>
    )
}
