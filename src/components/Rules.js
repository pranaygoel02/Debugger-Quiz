import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useExam } from '../context/examContext'
import { useUser } from '../context/userContext'
import { rules } from '../assets/rules'

function Rules() {
  const [checked,setChecked] = useState(false)
  const {user} = useUser()
  const {timeLimit,timer,setTimer} = useExam()

  function checkDateTime(){
    var currentdate = new Date();  
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    // console.log(datetime)
    if( currentdate.getDate() === 15 && currentdate.getMonth() === 1 && currentdate.getFullYear() === 2023 && currentdate.getHours() === 14 && currentdate.getMinutes() >= 0 && currentdate.getSeconds() >= 0){
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
    // if(checkDateTime()){
    // // console.log('start test')
    // setTimer(true)
    // navigate('/exam')
    // }else{
      //   alert('Quiz has not yet started.')
      // }
    setTimer(true)
    navigate('/exam')
  }

  return (

    <div className='w-ful h-full flex flex-col gap-4 items-center justify-start relative bg-gradient-to-t from-white to-blue-600'>
        {/* <div className='w-full h-56 bg-blue-800'></div> */}
        <div className='absolute top-[16%] flex flex-col gap-8 bg-white rounded border p-12 shadow-lg'>
        <div className='flex flex-col items-start text-start gap-8'>
          <h2 className='text-4xl font-bold text-blue-600 uppercase'>Rules</h2>
          <ul>
            {rules.map((rule,index) => <li key={index}>{rule}</li>)}
          </ul>
        </div>
        <div className='flex gap-1'>
          <input type={'checkbox'} name='check-rules' onChange={(e) => {
            // console.log(e.target.checked);
            setChecked(e.target.checked)
            }}/>
          <label htmlFor='check-rules'>I have read all rules, and agree to it.</label>
        </div>
        <button disabled={!checked} onClick={handleStartTest} className={`p-2 rounded bg-blue-600 text-white ${!checked && 'bg-gray-200'}`}>Start Quiz</button>
        </div>
    </div>
  )
}

export default Rules