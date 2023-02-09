import React,{useEffect} from 'react'
import { useExam } from '../context/examContext'

function Timer({submitQuiz}) {
    const {timeLimit,timer,setTimer,setTimeLimit} = useExam()
    useEffect(() => {
        if(timeLimit <= 0){
            setTimer(false)
            submitQuiz()
        }
        if(timeLimit && timer){
            const interval = setInterval(() => {
                setTimeLimit(prev => prev - 1000)
            }, 1000);
            return () => clearInterval(interval);
        }
    },[timer,timeLimit])

    
  return (
    <div className={`p-2 border transition-all rounded-full flex gap-2 items-center select-none ${Math.floor((timeLimit / 60000)) === 0 && 'bg-red-600 text-white animate-bounce'}`}>
        <div className='h-4 w-4 rounded-full border border-white bg-red-600 animate-pulse'></div>
        <p>{Math.floor((timeLimit / 60000))}m {(timeLimit % 60000)/1000}s left</p>
    </div>
  )
}

// {Math.ceil((timeLimit / 60000)).toFixed(0)} {Math.ceil((timeLimit / 60000)).toFixed(0) == 0 ? `: ${(timeLimit % 60000)/1000} seconds` : 'minutes'}

export default Timer