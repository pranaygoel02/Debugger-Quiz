import React, { useEffect } from 'react'
import { HashRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Redirect from './components/Redirect'
import Rules from './components/Rules'
import Submission from './components/Submission'
import { ExamProvider } from './context/examContext'
import {UserProvider} from './context/userContext'

function App() {

  useEffect(() => {
    console.log('use effect called');
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      console.log('before unload');
      e.returnValue = 'Are you sure you want to reload this page? Doing this is a destructive operation and all your responses will get discarded.';
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.location.href = '/#/login'
    }
  },[])

  return (
  <UserProvider>
    <ExamProvider>
    <div className='h-auto md:h-screen w-screen font-manrope'>
      <Router>
        <Routes>
          <Route path="" element={<Redirect/>}/>
          <Route path="/exam" element={<Home/>}/>
          <Route path="/rules" element={<Rules/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/result" element={<Submission/>}/>
        </Routes>
      </Router>
    </div>
    </ExamProvider>
  </UserProvider>    
  )
}

export default App