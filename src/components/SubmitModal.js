import React from 'react'
import { useExam } from '../context/examContext'
import Timer from './Timer'

function SubmitModal({closeModal,submitQuiz}) {
  const {timeLimit,timer} = useExam()
  return (
    <div className='p-8 shadow-md rounded bg-white flex flex-col items-center gap-8 w-max'>
        {timeLimit > 0 && timer ?
        <>
        <Timer submitQuiz={submitQuiz}/>
        <h3 className='text-2xl font-bold'>Are you sure you want to submit?</h3>
        <div className='flex gap-4'>
            <button className='bg-blue-600 p-4 text-white rounded' onClick={closeModal}>Proceed with Quiz</button>
            <button className='bg-blue-600 p-4 text-white rounded' onClick={submitQuiz}>Submit</button>
        </div>
        </>
        :
        <>
        <h3 className='text-2xl font-bold'>Time's up! <br></br>Submitting Quiz...</h3>
        </>
      } 
    </div>
  )
}

export default SubmitModal