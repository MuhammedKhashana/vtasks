import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Box, Text, Flex, Dialog, Button, TextField } from '@radix-ui/themes'
import { PencilSquare, PlusLg, Trash3Fill } from 'react-bootstrap-icons'
import MainHeadTasks from '../components/mainHeadTasks'
import { addHeader, deleteList, updateListTitle } from '../RTK/Slices/dyHeadersSlice'
import DyHeaders from '../components/DyHeaders'
import { addTaskInDyHeader, getDyHeaderDocs } from '../RTK/Slices/dyHeadSlice'
import 'react-toastify/dist/ReactToastify.css';
import { Fade } from "react-awesome-reveal";


export default function TabS() {
    const dispatch = useDispatch()
    

    // current head Document id 
    const [currHeadID, setCurrHeadID] = useState()

    const dyHeaders = useSelector((state) => state.DyHeaders)

    // New List Title
    const headName = useRef()
    const newHeadName = useRef()

    // Dy Task add Data
    const taskTitle = useRef()
    const taskDesc = useRef()

    return (
        <div>
            <Tabs.Root defaultValue="mainHead" className='mt-5'>
                <Tabs.List className='mb-3 d-flex flex-row justify-content-between align-items-center'>
                    <Fade direction='up'>
                        <div className='d-flex flex-row'>
                            <Tabs.Trigger value='mainHead'>Main</Tabs.Trigger>
                            {
                                dyHeaders && dyHeaders.map((header) => (
                                    <Tabs.Trigger
                                        value={header.data.title}
                                        key={header.id}
                                        onClick={() => {
                                            setCurrHeadID(header.id)
                                            dispatch(getDyHeaderDocs(header.id))
                                        }}
                                    >{header.data.title}</Tabs.Trigger>
                                ))
                            }
                        </div>
                        {/* ==========  Adding Heaed Button ========== */}
                        <Dialog.Root>
                            <Dialog.Trigger className='mx-2'>
                                <Button color="blue" variant="soft" className='d-flex flex-row align-items-center'>
                                    <PlusLg size='18' className='me-1' />
                                    <Text size={'2'} weight={'bold'}>Add List</Text>
                                </Button>
                            </Dialog.Trigger>

                            <Dialog.Content maxWidth="450px">
                                <Dialog.Title>Edit profile</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Add Your Own New List.
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            List Name
                                        </Text>
                                        <TextField.Root
                                            ref={headName}
                                            // defaultValue={}
                                            placeholder="Enter Your List Name"
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
                                        <Button onClick={() => dispatch(
                                            addHeader({
                                                title: headName.current.value.replace(/\s+/g, ' ').trim()
                                            })
                                        )}>Save</Button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    </Fade>
                </Tabs.List>
                <Box>
                    <MainHeadTasks />
                    {/* ========== START DYHEADERS ========== */}
                    {
                        dyHeaders && dyHeaders.map((head) => (
                            <Tabs.Content key={head.id} value={head.data.title}>
                                <Fade duration={'500'}>
                                    <div className='my-3 d-flex flex-row justify-content-between align-items-center'>
                                        <Text className='' size='3' weight='bold'>{head.data.title}</Text>
                                        <div>
                                            <Dialog.Root>
                                                <Dialog.Trigger className='mx-2'>
                                                    <button className='btn m-0 p-0'><PlusLg size='20' /></button>
                                                </Dialog.Trigger>

                                                <Dialog.Content maxWidth="450px">
                                                    <Dialog.Title>Edit profile</Dialog.Title>
                                                    <Dialog.Description size="2" mb="4">
                                                        Add Your Own Tasks
                                                    </Dialog.Description>

                                                    <Flex direction="column" gap="3">
                                                        <label>
                                                            <Text as="div" size="2" mb="1" weight="bold">
                                                                Title
                                                            </Text>
                                                            <TextField.Root
                                                                ref={taskTitle}
                                                                // defaultValue={}
                                                                placeholder="Enter Your Task Title"
                                                            />
                                                        </label>
                                                        <label>
                                                            <Text as="div" size="2" mb="1" weight="bold">
                                                                Description
                                                            </Text>
                                                            <TextField.Root
                                                                ref={taskDesc}
                                                                // defaultValue={}
                                                                placeholder="Enter Your Task Description"
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
                                                            <Button onClick={() => dispatch(
                                                                addTaskInDyHeader({
                                                                    headId: head.id,
                                                                    title: taskTitle.current.value.replace(/\s+/g, ' ').trim(),
                                                                    desc: taskDesc.current.value.replace(/\s+/g, ' ').trim()
                                                                })
                                                            )}>Save</Button>
                                                        </Dialog.Close>
                                                    </Flex>
                                                </Dialog.Content>
                                            </Dialog.Root>
                                            <Dialog.Root>
                                                <Dialog.Trigger className='mx-2'>
                                                    <button className='btn m-0 p-0'><PencilSquare size='20' /></button>
                                                </Dialog.Trigger>

                                                <Dialog.Content maxWidth="450px">
                                                    <Dialog.Title>Edit profile</Dialog.Title>
                                                    <Dialog.Description size="2" mb="4">
                                                        Edit Task List Name
                                                    </Dialog.Description>

                                                    <Flex direction="column" gap="3">
                                                        <label>
                                                            <Text as="div" size="2" mb="1" weight="bold">
                                                                Title
                                                            </Text>
                                                            <TextField.Root
                                                                ref={newHeadName}
                                                                defaultValue={head.data.title}
                                                                placeholder="Enter Your List Name"
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
                                                            <Button onClick={() => dispatch(
                                                                updateListTitle({
                                                                    listTitleDocId: head.id,
                                                                    title: newHeadName.current.value.replace(/\s+/g, ' ').trim()
                                                                })
                                                            )}>Save</Button>
                                                        </Dialog.Close>
                                                    </Flex>
                                                </Dialog.Content>
                                            </Dialog.Root>
                                            <button className='btn p-0 ms-2' onClick={() => dispatch(
                                                deleteList(head.id)
                                            )}><Trash3Fill size='20' /></button>
                                        </div>
                                    </div>
                                </Fade>
                                {/* ============ START Tasks List ========== */}
                                < DyHeaders currHeadID={currHeadID} />
                            </Tabs.Content>
                        ))
                    }
                </Box>
            </Tabs.Root>
        </div>
    )
}
