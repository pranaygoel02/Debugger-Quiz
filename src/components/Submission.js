import React, { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { useExam } from '../context/examContext'
import { useNavigate } from 'react-router-dom'
import Debugger from '../assets/images/debugger.png'
import Ureckon from '../assets/images/ureckon.png'

function Submission() {
    const {user,setUser} = useUser()
    const {attempted, marks, incorrect,correct,unattempted,setResult} = useExam()
    const navigate = useNavigate()

    const finishTest = () => {
        setUser(null)
        setResult(false)
        localStorage.removeItem('DebuggerUser')
        navigate('/login')
    }

    useEffect(() => {
        if(user === 'null' || user === null){
            navigate('/login')
        }
        setResult(true)
    },[])

    console.log('attempted: ',attempted);
    console.log('correct: ',correct);
    console.log('incorrect: ',incorrect);
    console.log('unattempted: ',unattempted);



  return (
    <div className='w-ful h-full flex flex-col gap-4 items-center justify-start relative'>
        <div className='w-full h-56 bg-blue-800'></div>
        <div className='absolute top-10 flex flex-col gap-8'>
        <div className='flex gap-4 justify-center'>
            <div className='w-28 flex items-center bg-white rounded-full'>
                <img className='w-full' src={Ureckon}/>
            </div>
            <img className='w-28 bg-white rounded-full p-2' src={Debugger}/>
        </div>
        <h1 className='bg-white p-4 rounded border  text-center text-xl'><span className='text-5xl text-blue-600 font-bold uppercase tracking-wide'>Submission</span><br></br>Team Id: {user}</h1>
        <div className='flex justify-between gap-2 flex-wrap text-lg'>
        <p className='p-4 rounded border text-center bg-orange-600 text-white' style={{flexBasis:'49%'}}>Attempted: {attempted.length}</p>
        {/* <p className='p-4 rounded border text-center bg-green-600 text-white' style={{flexBasis:'49%'}}>Correct: {correct.length}</p> */}
        {/* <p className='p-4 rounded border text-center bg-red-600 text-white' style={{flexBasis:'49%'}}>Incorrect: {incorrect.length}</p> */}
        <p className='p-4 rounded border text-center bg-purple-600 text-white' style={{flexBasis:'49%'}}>Unattempted: {unattempted.length}</p>
        <p className='p-4 rounded border text-center border-blue-600' style={{flexBasis:'100%'}}>Overall Score: {marks} / {4*30}</p>
        </div>
        <button className='p-4 text-lg rounded text-white bg-blue-600' onClick={finishTest}>Finish Round</button>
        </div>
    </div>
  )
}

export default Submission