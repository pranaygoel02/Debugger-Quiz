import React,{useEffect, useState} from 'react'
import { useUser } from '../context/userContext'
import { useExam } from '../context/examContext'
import { useNavigate } from 'react-router-dom'
import { questions } from '../assets/questions/question'
import Debugger from '../assets/images/debugger.png'
import Ureckon from '../assets/images/ureckon.png'
import showdown from 'showdown'

function Home() {
    const {user,setUser} = useUser()
    const {setAttempted, attempted, setMarks, setIncorrect,setCorrect,setUnattempted,result} = useExam()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(user);
        console.log(user === 'null');
        if(user === 'null' || user === null){
            navigate('/login')
        }
        if(result){
            setUser(null)
            navigate('/login')
        }
    },[])
    
    const [id,setid] = useState(0)    

    const handlePrev = () => {
        if(id - 1 < 0) return
        if(id > 0){
            setid(id - 1)
        }
    }

    const handleNext = () => {
        if(id + 1 > questions.length - 1) return
        if(id < questions.length - 1){
            setid(id + 1)
        }
    }

    const resetAns = () => {
        const radio = document.querySelectorAll('input[type="radio"]')
        radio.forEach(item => item.checked = false)
    }
  
    const resetChecks = () => {
        const radio = document.querySelectorAll('input[type="radio"]')
        radio.forEach(item => item.checked = false)
    }

    useEffect(() => {
        resetChecks()
    },[id])

    const handleSubmitNext = () => {
        let ans
        var ele = document.getElementsByName('radio');
          
        for(var i = 0; i < ele.length; i++) {
            if(ele[i].checked) ans = ele[i].value
        }
        
        questions[id].chosenAns = ans
        
        console.log(questions);

        if(id + 1 > questions.length - 1) return
        if(id < questions.length - 1){
            setid(id + 1)
        }
    }

    const checkTime = () => {
        let currentdate = new Date()
        // return (currentdate.getHours() !== 20 && currentdate.getMinutes() > 24)
        return false
    }

    const handleSubmitTest = () => {
        console.log(checkTime());
        if(checkTime()){
            alert('Time is up')
            return
        }

        let ans
        var ele = document.getElementsByName('radio');
          
        for(var i = 0; i < ele.length; i++) {
            if(ele[i].checked) ans = ele[i].value
        }
        
        questions[id].chosenAns = ans
        
        console.log(questions);

        let marks = 0
        let attempted = []
        let unattempted = []
        let correct = []
        let incorrect = []
        questions.forEach((item,index) => {
            if(item.chosenAns === item.answer){
                marks += 4
                attempted = [...attempted,item]
                correct = [...correct,item]
            }
            else if(item.chosenAns === undefined){
                marks += 0
                unattempted = [...unattempted,item]
            }
            else{
                marks -= 1
                attempted = [...attempted,item]
                incorrect = [...incorrect,item]
            }
        })
        setMarks(marks)
        setAttempted(attempted)
        setUnattempted(unattempted)
        setCorrect(correct)
        setIncorrect(incorrect)
        navigate('/result')
    }

    useEffect(() => {
        const converter = new showdown.Converter()
        const html = converter.makeHtml(questions[id].question)
        console.log(html);
        document.getElementById('question').innerHTML = html
      },[id])

    return (
        user && 
        <div className='flex flex-row w-full h-full relative'>
            <div className='flex flex-col gap-8 items-start p-16 bg-blue-800 text-white' style={{flexBasis:'50%'}}>
                <p>Team Id: {user}</p> 
                <div className='flex gap-4'>
                <div className='w-20 flex items-center bg-white rounded-full'>
                    <img className='w-full' src={Ureckon}/>
                </div>
                <img className='w-20 bg-white rounded-full p-2' src={Debugger}/>
                </div>
                <p className='text-xl'>Question: <span className='text-3xl font-bold'>{id + 1}</span>/{questions?.length}</p>
                <div id='question'></div>
            </div>
            <div className='flex flex-col items-start w-full text-start justify-center gap-4 p-16' style={{flexBasis:'50%'}}>
                <p>Choose an option</p>
                <div className='flex flex-col items-stretch justify-start gap-4 w-full'>
                {questions[id].options.map((option,index) => {
                    return ( <label className={`rounded border w-full flex gap-2 p-4 hover:shadow-md transition-all cursor-pointer ${option === questions[id]?.chosenAns && 'bg-green-500 text-white'}`}>
                      <input type="radio" defaultChecked={option === questions[id]?.chosenAns} value={option} name="radio"/>
                      <p>{option}</p>
                    </label>)
                }
                )}
                </div>
            </div>
            <div className='absolute bottom-0 right-0 gap-2 flex p-4'>
                <button className='p-2 bg-blue-600 rounded text-white' title='Go To Previous Question' onClick={handlePrev}>Prev</button>
                <button className='p-2 bg-blue-600 rounded text-white' title='Go To Next Question' onClick={handleNext}>Next</button>
                <button className='p-2 bg-blue-600 rounded text-white' title='Reset Ans' onClick={resetAns}>Reset Ans</button>
                <button className='p-2 bg-blue-600 rounded text-white' title='Go To Next Question' onClick={handleSubmitNext}>Submit & Next</button>
            </div>
            <div className='absolute top-0 right-0 gap-2 flex p-4'>
                <button className='p-2 bg-blue-600 rounded text-white' title='Go To Previous Question' onClick={handleSubmitTest}>Submit Test</button>
            </div>
            <div className='absolute top-0 left-0 gap-2 flex p-4'>
                
            </div>
        </div>
    )
}

export default Home