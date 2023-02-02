import React, { useEffect, useState } from 'react'
import { useUser } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import Ureckon from '../assets/images/ureckon.png'
import Debugger from '../assets/images/debugger.png'
function Login() {
    const [teamId,setTeamId] = useState('')
    const {setUser,user} = useUser()
    const navigate = useNavigate()
    
    useEffect(()=>{
        console.log(user);
        if(user === null || user === 'null') return
        else navigate('/rules')
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
        <div className='w-ful h-full flex flex-col gap-4 items-center justify-start relative'>
        <div className='w-full h-56 bg-blue-800'></div>
        <div className='absolute top-16 flex flex-col gap-8'>
        <div className='flex gap-4 justify-center'>
            <div className='w-20 flex items-center bg-white rounded-full'>
                <img className='w-full' src={Ureckon}/>
            </div>
            <img className='w-20 bg-white rounded-full p-2' src={Debugger}/>
        </div>
        <h1 className='bg-white p-8 rounded border  text-center text-lg'><span className='text-5xl text-blue-600 font-bold uppercase tracking-wide'>Prelims Round</span></h1>
        <form className='flex flex-col gap-2 text-lg' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
                <label htmlFor='temId'>Enter Team Id</label>
                <input type={'text'} value={teamId} placeholder='Enter your team Id' className='bg-gray-200 p-2' onChange={(e)=>setTeamId(e.target.value)}/>
            </div>
            <button className='p-2 rounded bg-blue-600 text-white' onSubmit={handleSubmit} type='submit'>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Login