import React, { useEffect, useState } from 'react'
import { useUser } from '../context/userContext'
import { useExam } from '../context/examContext'
import { useNavigate } from 'react-router-dom'
import Ureckon from '../assets/images/ureckon.png'
import Debugger from '../assets/images/debugger.png'
function Login() {
    const [teamId,setTeamId] = useState('')
    const {setUser,user} = useUser()
    const navigate = useNavigate()
    const {questions} = useExam()
    
    useEffect(()=>{
        // console.log(user);
        questions.forEach(item => delete(item.chosenAns))
        if(user === null || user === 'null') return
        else {
            navigate('/rules')
        }
    },[])

    const handleSubmit =(e) => {
        e.preventDefault()
        if(teamId === '' || teamId === null || teamId === undefined) {
            return
        }
        setUser(teamId)
        navigate('/rules')
    }
    return (
        <div className='w-ful h-full flex flex-col gap-4 items-center justify-start relative bg-gradient-to-t from-white to-blue-600'>
        {/* <div className='w-full h-56 bg-blue-800'></div> */}
        <div className='absolute top-10 flex flex-col gap-8'>
        <div className='flex gap-4 justify-center'>
            <div className='w-28 flex items-center bg-white rounded-full'>
                <img className='w-full' src={Ureckon}/>
            </div>
            <img className='w-28 bg-white rounded-full p-2' src={Debugger}/>
        </div>
        <h1 className='bg-white p-8 rounded border  text-center text-lg'><span className='text-5xl text-blue-600 font-bold uppercase tracking-wide'>Prelims Round</span></h1>
        <form className='flex flex-col gap-2 text-lg bg-white p-4 rounded' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
                <label className='text-center' htmlFor='temId'>Enter Team Leader Name</label>
                <input type={'text'} value={teamId} placeholder='Enter your team leader name' className='bg-gray-200 p-2 text-center focus:outline-none' onChange={(e)=>setTeamId(e.target.value)}/>
            </div>
            <button className='p-2 rounded bg-blue-600 text-white' onSubmit={handleSubmit} type='submit'>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Login