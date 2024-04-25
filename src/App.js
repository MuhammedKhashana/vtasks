import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Regist from './pages/Regist'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './fireConf'
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  const navi = useNavigate()
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
        navi(`/${auth.currentUser.uid}/home`)
      } else {
        setAuthUser(null)
        navi('/register')
      }
    })
    return () => listen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <Routes>
        <Route path='/' >
          {!authUser && <Route path='register' element={<Regist />} />}
          {authUser && <Route path={auth.currentUser.uid + '/home'} element={<Home />} />}
        </Route>
      </Routes>
    </div>
  )
}
