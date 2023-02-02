import React from 'react'
import { HashRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Rules from './components/Rules'
import Submission from './components/Submission'
import { ExamProvider } from './context/examContext'
import {UserProvider} from './context/userContext'

function App() {
  return (
  <UserProvider>
    <ExamProvider>
    <div className='h-screen w-screen font-manrope'>
      <Router>
        <Routes>
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