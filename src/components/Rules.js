import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useExam } from '../context/examContext'
import { useUser } from '../context/userContext'

function Rules() {
  const [checked,setChecked] = useState(false)
  const {user} = useUser()
  const {timeLimit,timer} = useExam()

  function checkDateTime(){
    var currentdate = new Date();  
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    console.log(datetime)
    if( currentdate.getDate() === 26 && currentdate.getMonth() === 0 && currentdate.getFullYear() === 2023 && currentdate.getHours() === 18 && currentdate.getMinutes() >= 0 && currentdate.getSeconds() >= 0){
      return true
    }
    return true
  }
  
  const navigate = useNavigate()

  useEffect(() => {
    if(user === 'null' || user === null){
      navigate('/login')
    }
  },[])

  const handleStartTest = () => {
    if(checkDateTime()){
    console.log('start test')
    navigate('/exam')
    }else{
      alert('test has not started yet')
    }
  }

  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-8 transition-all'>
        <div className='flex flex-col items-start text-start gap-2'>
          <h2 className='text-2xl font-bold'>Rules</h2>
          <ul>
            <li>Checking the network cables, modem, and router. Reconnecting to Wi-Fi</li>
            <li>Checking the network cables, modem, and router. Reconnecting to Wi-Fi</li>
            <li>Checking the network cables, modem, and router. Reconnecting to Wi-Fi</li>
            <li>Checking the network cables, modem, and router. Reconnecting to Wi-Fi</li>
          </ul>
        </div>
        <div className='flex gap-1'>
          <input type={'checkbox'} name='check-rules' onChange={(e) => {
            console.log(e.target.checked);
            setChecked(e.target.checked)
            }}/>
          <label htmlFor='check-rules'>I have read all rules, and agree to it.</label>
        </div>
        <button disabled={!checked} onClick={handleStartTest} className={`p-2 rounded bg-blue-600 text-white ${!checked && 'bg-gray-200'}`}>Start Test</button>
    </div>
  )
}

export default Rules