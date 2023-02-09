import React from 'react'
import { useExam } from '../context/examContext'

function QuestionList({closeModal,jumpToQuestion}) {
  const {questions} = useExam()
  console.log(questions);
  return (
    <div className='p-8 shadow-md rounded bg-white flex relative flex-col items-center gap-8 w-max'>
        <button className='absolute top-2 right-2 text-xl font-bold' onClick={closeModal}>&times;</button>
        <h3 className='text-2xl font-bold'>Questions</h3>
        <div className='grid grid-cols-5 gap-4'>
            {questions.map((item,index)=>{
                return <button className={`${item.chosenAns !== undefined && 'bg-green-600 text-white'} focus:border-blue-600 border p-4 rounded`} onClick={()=>{
                  jumpToQuestion(index)
                  closeModal()
                }}>{index+1}</button>
            })
            }
        </div>
    </div>
  )
}

export default QuestionList