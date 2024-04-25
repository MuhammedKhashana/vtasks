import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Separator, Card, Flex, Dialog, Button, TextField } from '@radix-ui/themes'
import { Check2Square, CheckLg, ListCheck, PencilSquare, Trash3Fill } from 'react-bootstrap-icons'
import { deleteTaskInDyColl, isCompletedTaskInDy, updateTaskInDyColl } from '../RTK/Slices/dyHeadSlice'
import { Fade, Zoom } from "react-awesome-reveal";
import Accordion from 'react-bootstrap/Accordion';


export default function DyHeaders(props) {
    const dispatch = useDispatch()

    // const dyHeaders = useSelector((state) => state.DyHeaders)
    const currHead = useSelector((state) => state.dyHead)
    // console.log(currHead);

    const [completedTasksN, setCompletedTasksN] = useState(0);

    useEffect(() => {
        const numberOfCompletedTasks = currHead.map((task) => {
            if (task.data.isCompleted) {
                return 1; // Return 1 for each completed task
            } else {
                return 0; // Return 0 for each incomplete task
            }
        });

        // Sum the number of completed tasks
        const totalCompletedTasks = numberOfCompletedTasks.reduce((acc, curr) => acc + curr, 0);

        // Update state with the total number of completed tasks
        setCompletedTasksN(totalCompletedTasks);
    }, [currHead]); // Make sure to specify dependencies for useEffect if needed


    const currHeadID = props.currHeadID

    // service update Data
    const newTaskTitle = useRef()
    const newTaskDesc = useRef()


    return (
        <Zoom duration={'300'}>
            {
                (currHead.length !== completedTasksN) ?
                    <Card >
                        {
                            currHead.map((task) => (
                                (task.data.isCompleted) ?
                                    null
                                    :
                                    <Fade key={task.id} duration={'300'} cascade>
                                        <div className='mb-3'>
                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                <div className='d-flex flex-column justify-content-between'>
                                                    <Text size={'4'} weight={'meduim'}>{task.data.title}</Text>
                                                    <Text size={'2'} weight={'light'}>{task.data.desc}</Text>
                                                </div>
                                                <div>
                                                    <Dialog.Root>
                                                        <Dialog.Trigger className='mx-2'>
                                                            <button className='btn m-0 p-0'><PencilSquare size='20' /></button>
                                                        </Dialog.Trigger>

                                                        <Dialog.Content maxWidth="450px">
                                                            <Dialog.Title>Edit Profile</Dialog.Title>
                                                            <Dialog.Description size="2" mb="4">
                                                                Make changes to your Task.
                                                            </Dialog.Description>

                                                            <Flex direction="column" gap="3">
                                                                <label>
                                                                    <Text as="div" size="2" mb="1" weight="bold">
                                                                        Title
                                                                    </Text>
                                                                    <TextField.Root
                                                                        ref={newTaskTitle}
                                                                        defaultValue={task.data.title}
                                                                        placeholder="Enter Your Task Title"
                                                                    />
                                                                </label>
                                                                <label>
                                                                    <Text as="div" size="2" mb="1" weight="bold">
                                                                        Description
                                                                    </Text>
                                                                    <TextField.Root
                                                                        ref={newTaskDesc}
                                                                        defaultValue={task.data.desc}
                                                                        placeholder="Enter Your Task Description (optional)"
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
                                                                        updateTaskInDyColl({
                                                                            headId: currHeadID,
                                                                            taskDocId: task.id,
                                                                            title: newTaskTitle.current.value.replace(/\s+/g, ' ').trim(),
                                                                            desc: newTaskDesc.current.value.replace(/\s+/g, ' ').trim()
                                                                        }))}>Save</Button>
                                                                </Dialog.Close>
                                                            </Flex>
                                                        </Dialog.Content>
                                                    </Dialog.Root>
                                                    <button className='btn' onClick={() => dispatch(
                                                        isCompletedTaskInDy({
                                                            headId: currHeadID,
                                                            taskDocId: task.id,
                                                            isCompleted: true
                                                        })
                                                    )}><Check2Square size='20' /></button>
                                                </div>
                                            </div>
                                            <Separator my="3" size="4" />
                                        </div>
                                    </Fade>
                            ))
                        }
                        <Accordion Accordion defaultActiveKey="">
                            <Accordion.Item eventKey="0" className=''>
                                <Accordion.Header className='p-0 m-0'>
                                    <ListCheck size={'20'} className='me-2' />
                                    Completed Tasks {completedTasksN}
                                </Accordion.Header>
                                <Accordion.Body className=''>
                                    <Fade duration={'300'} cascade>
                                        {
                                            currHead.map((task) => (
                                                (!task.data.isCompleted) ?
                                                    null
                                                    // setCompletedTasksN(1)
                                                    :
                                                    <div key={task.id} className='mb-3'>
                                                        <div className='d-flex flex-row justify-content-between align-items-center'>
                                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                                <button className='btn' onClick={() => dispatch(isCompletedTaskInDy({
                                                                    headId: currHeadID,
                                                                    taskDocId: task.id,
                                                                    isCompleted: false
                                                                }))}>
                                                                    <CheckLg color='green' size='20' />
                                                                </button>
                                                                <Text size={'4'} weight={'meduim'} className='opacity-50 text-decoration-line-through'>{task.data.title}</Text>
                                                            </div>
                                                            <div>
                                                                <button className='btn' onClick={() => dispatch(deleteTaskInDyColl({
                                                                    headId: currHeadID,
                                                                    taskDocId: task.id
                                                                }))}><Trash3Fill size='20' /></button>
                                                            </div>
                                                        </div>
                                                        <Separator my="3" size="4" />
                                                    </div>
                                            ))
                                        }
                                    </Fade>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card>
                    :
                    <Card>
                        <Accordion Accordion defaultActiveKey="">
                            <Accordion.Item eventKey="0" className=''>
                                <Accordion.Header className='p-0 m-0'>
                                    <ListCheck size={'20'} className='me-2' />
                                    Completed Tasks {completedTasksN}
                                </Accordion.Header>
                                <Accordion.Body className=''>
                                    <Fade duration={'300'} cascade>
                                        {
                                            currHead.map((task) => (
                                                (!task.data.isCompleted) ?
                                                    null
                                                    // setCompletedTasksN(1)
                                                    :
                                                    <div key={task.id} className='mb-3'>
                                                        <div className='d-flex flex-row justify-content-between align-items-center'>
                                                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                                                <button className='btn' onClick={() => dispatch(isCompletedTaskInDy({
                                                                    headId: currHeadID,
                                                                    taskDocId: task.id,
                                                                    isCompleted: false
                                                                }))}>
                                                                    <CheckLg color='green' size='20' />
                                                                </button>
                                                                <Text size={'4'} weight={'meduim'} className='opacity-50 text-decoration-line-through'>{task.data.title}</Text>
                                                            </div>
                                                            <div>
                                                                <button className='btn' onClick={() => dispatch(deleteTaskInDyColl({
                                                                    headId: currHeadID,
                                                                    taskDocId: task.id
                                                                }))}><Trash3Fill size='20' /></button>
                                                            </div>
                                                        </div>
                                                        <Separator my="3" size="4" />
                                                    </div>
                                            ))
                                        }
                                    </Fade>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className='d-flex justify-content-center'>
                            <img
                                src='data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201920%201080%22%3E%3Cg%20fill%3D%22%2300baff%22%20class%3D%22color2a94f4%20svgShape%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M600.527%201028.367c-110.05-55.774-309.335-66.827-291.268-419.183C327.326%20256.828%20808.775%20245.123%20864.615%2070.95c55.84-174.172%20643.479-23.512%20295.752%20406.166-61.573%2076.084%2082.965%20160.556%2057.671%20298.991s-507.46%20308.034-617.511%20252.26z%22%20class%3D%22color000000%20svgShape%22%20opacity%3D%22.11%22%2F%3E%3Cellipse%20cx%3D%22815.141%22%20cy%3D%221019.475%22%20fill%3D%22%23000%22%20class%3D%22color000000%20svgShape%22%20opacity%3D%22.11%22%20rx%3D%22393.864%22%20ry%3D%2260.525%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22%230b5570%22%20d%3D%22M1112.88%201011.579H490.99c-13.255%200-24-10.745-24-24V130.18c0-13.255%2010.745-24%2024-24h621.89c13.255%200%2024%2010.745%2024%2024v857.399c0%2013.255-10.745%2024-24%2024z%22%20class%3D%22color0b4870%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23f7f7f7%22%20d%3D%22M1083.076%20978.979H520.794c-13.255%200-24-10.745-24-24V162.78c0-13.255%2010.745-24%2024-24h562.281c13.255%200%2024%2010.745%2024%2024v792.198c.001%2013.256-10.744%2024.001-23.999%2024.001z%22%20class%3D%22colorf7f7f7%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%2300baff%22%20d%3D%22M577.04%20251.983h85.528v85.528H577.04z%22%20class%3D%22color2a94f4%20svgShape%22%20opacity%3D%22.11%22%2F%3E%3Cpath%20fill%3D%22%2355d1ff%22%20d%3D%22M572.711%20276.352c4.341%202.213%208.357%204.731%2012.273%207.344%203.892%202.634%207.693%205.355%2011.353%208.207%207.361%205.666%2014.304%2011.725%2020.957%2018.055l-14.762%201.092a153.91%20153.91%200%200%201%206.663-9.759c2.291-3.146%204.709-6.185%207.202-9.168%205.015-5.94%2010.379-11.605%2016.212-16.831%205.864-5.196%2012.108-10.031%2018.904-14.128%206.839-4.013%2014.125-7.517%2021.989-9.181-5.037%206.266-9.748%2012.047-14.367%2017.91l-13.631%2017.502a2519.143%202519.143%200%200%201-13.627%2017.366l-13.7%2017.128-7.661%209.577-7.102-8.484c-5.894-7.042-11.499-14.356-16.686-22.062-2.614-3.834-5.087-7.8-7.468-11.852-2.359-4.074-4.617-8.243-6.549-12.716z%22%20class%3D%22colorffbe55%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%2300baff%22%20d%3D%22M577.04%20502.68h85.528v85.528H577.04zM577.04%20759.764h85.528v85.528H577.04z%22%20class%3D%22color2a94f4%20svgShape%22%20opacity%3D%22.11%22%2F%3E%3Cpath%20fill%3D%22%2300baff%22%20d%3D%22M701.06%20251.983h335.447v13.771H701.06zM701.06%20287.862h335.447v13.771H701.06zM847.661%20323.74h188.846v13.771H701.06V323.74h146.601%22%20class%3D%22color2a94f4%20svgShape%22%20opacity%3D%22.52%22%2F%3E%3Cpath%20fill%3D%22%2300baff%22%20d%3D%22M701.06%20502.68h335.447v13.771H701.06zM701.06%20538.558h335.447v13.771H701.06zM701.06%20574.436h159.85v13.771H701.06z%22%20class%3D%22color2a94f4%20svgShape%22%20opacity%3D%22.52%22%2F%3E%3Cpath%20fill%3D%22%2300baff%22%20d%3D%22M701.06%20759.764h335.447v13.771H701.06zM701.06%20795.642h321.853v13.771H701.06zM701.06%20831.52h335.447v13.771H701.06z%22%20class%3D%22color2a94f4%20svgShape%22%20opacity%3D%22.52%22%2F%3E%3Cpath%20fill%3D%22%2355d1ff%22%20d%3D%22M949.751%20150.324H654.119V86.036c0-13.255%2010.745-24%2024-24h247.632c13.255%200%2024%2010.745%2024%2024v64.288z%22%20class%3D%22colorffbe55%20svgShape%22%2F%3E%3Cg%20fill%3D%22%2355d1ff%22%20class%3D%22colorffbe55%20svgShape%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M693.488%20880.179h287.87v175.129h-287.87zM981.358%20880.179h-287.87l23.588-52.841h240.695z%22%20class%3D%22color000000%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M693.488%20880.179h287.87v175.129h-287.87z%22%20class%3D%22color000000%20svgShape%22%20opacity%3D%22.11%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22%230e6a8c%22%20d%3D%22M792.765%20584.688s-67.22%2075.961-72.029%20101.382c-4.809%2025.421%2060.92%20137.778%2060.92%20137.778l-30.541%2021.287%2060.947-5.826s-25.649-93.276-40.228-125.041c19.608-13.295%2066.838-65.335%2066.838-65.335l43.809%20102.074%2018.885%20116.637%2050.63%2014.9-29.557-32.068c5.238-85.727%205.141-85.747%208.974-111.952%203.665-25.05-18.068-115.911-24.483-144.867-6.414-28.955-95.208-20.887-114.165-8.969z%22%20class%3D%22color0e538c%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23b1e8fc%22%20d%3D%22M777.516%20357.174c.903%203.423%2022.225%2093.367%2022.225%2093.367s-19.38%209.487-27.423-1.373-10.733-93.128-10.733-93.128l15.931%201.134z%22%20class%3D%22colorfcd2b1%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23b1e8fc%22%20d%3D%22M774.045%20339.36s-11.725-10.121-15.357-2.526c-3.632%207.596%202.767%2015.676%202.897%2019.206s15.931%201.134%2015.931%201.134%204.057-11.49-3.471-17.814z%22%20class%3D%22colorfcd2b1%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%2355d1ff%22%20d%3D%22M781.399%20354.288%20657.28%20307.839s-11.166%2012.459-7.224%2027.35l125.896%2028.685s6.628%201.632%205.447-9.586z%22%20class%3D%22colorffbe55%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23b1e8fc%22%20d%3D%22m851.962%20415.632-10.834%2028.903s1.324%2013.701%2016.315%2013.983c14.991.282%2017.487-8.385%2017.487-8.385l-2.473-34.289c.001.001-14.09-3.904-20.495-.212zM757.298%20438.06l-14.887-2.964-11.421-62.745%2014.188-15.431-10.211-2.94s2.026-12.635.518-19.149c-1.509-6.513-5.792-8.156-16.452-3.96-5.62%203.261-10.061%2023.56-4.723%2035.069%205.338%2011.51%204.807%2083.938%203.699%2095.579-1.108%2011.641%2031.305%2019.179%2031.305%2019.179s15.506%202.135%2020.579-14.096-12.595-28.542-12.595-28.542z%22%20class%3D%22colorfcd2b1%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%2355d1ff%22%20d%3D%22M853.958%20439.537c-11.892-2.357-26.013-3.378-41.986-1.4-28.555%201.13-54.674-.077-54.674-.077s-11.475%2020.013-7.983%2042.637c0%200%2028.458%2017.405%2055.866%2018.501%203.13%2012.851-1.764%2070.987-12.416%2085.489%208.018%2012.445%2075.385%2027.143%20114.165%208.97%206.59-12.807-.09-67.386-5.504-103.628-3.747-25.088-22.584-45.558-47.468-50.492z%22%20class%3D%22colorffbe55%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23caf1ff%22%20d%3D%22M847.162%20368.219s-21.5%2026.286-18.976%2036.383c2.526%2010.097%2014.63%2019.492%2043.321%2022.676%209.848-1.476%2020.746-30.886%2020.497-37.04-1.629-40.278-34.264-28.813-44.842-22.019z%22%20class%3D%22colorffe3ca%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%230b5570%22%20d%3D%22M873.95%20382.785s-37.548-6.064-41.204-25.031c-3.655-18.967%2026.993-28.713%2040.581-22.783%205.788%202.526%208.712%206.957%2012.116%2011.939%203.829%205.604%208.573%207.497%2014.684%2010.737%201.967%201.043%203.945%202.094%205.699%203.466%209.47%207.412%206.109%2016.214%204.51%2026.135-1.536%209.532-3.018%2019.34-9.272%2027.099-10.877%2013.491-29.107%2011.397-28.604%201.496.501-9.898%2011.606-30.713%201.49-33.058zM781.655%20823.848s18.342-.353%2025.324-2.356c3.127%2010.8%205.083%2017.817%205.083%2017.817l-60.947%205.826%2030.54-21.287zM898.098%20846.279c8.78%205.083%2024.342%204.198%2024.342%204.198l29.557%2032.067-50.631-16.08-3.268-20.185z%22%20class%3D%22color0b4870%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23caf1ff%22%20d%3D%22m657.28%20307.839-34.175%202.194%2026.951%2025.156%207.224%201.646-7.375-9.036%2011.443.602-8.432-9.034%2012.948.301-10.238-6.925%2011.388-1.261z%22%20class%3D%22colorffe3ca%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%2355d1ff%22%20d%3D%22M639.937%20308.952s.524%209.763-4.842%2012.272l-11.99-11.192%2016.832-1.08z%22%20class%3D%22colorffbe55%20svgShape%22%2F%3E%3Cpath%20fill%3D%22%23afe6fa%22%20d%3D%22M776.379%20352.41s-11.669%203.211-24.316-1.306.675-18.86%209.522-17.861c8.847.998%2020.601%208.929%2014.794%2019.167z%22%20class%3D%22colorfab9af%20svgShape%22%2F%3E%3C%2Fsvg%3E'
                                alt="illis"
                                className='my-5'
                                style={{
                                    objectFit: 'obtain',
                                    width: '50%',
                                    height: '50%',
                                    marginLeft: "10%",
                                    borderRadius: 'var(--radius-2)',
                                }}
                            />
                        </div>
                    </Card>
            }
        </Zoom>
    )
}
