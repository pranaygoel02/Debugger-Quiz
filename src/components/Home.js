import React,{useEffect, useState} from 'react'
import { useUser } from '../context/userContext'
import { useExam } from '../context/examContext'
import { useNavigate } from 'react-router-dom'

import Debugger from '../assets/images/debugger.png'
import Ureckon from '../assets/images/ureckon.png'
import List from '../assets/images/list.png'
import showdown from 'showdown'
import SubmitModal from './SubmitModal'
import QuestionList from './QuestionList'
import Timer from './Timer'

import BookmarkOutline from '../assets/images/bookmark_outline.png'
import Bookmark from '../assets/images/bookmark.png'

function Home() {
    const {user,setUser} = useUser()
    const {setAttempted, attempted, setMarks, setIncorrect,setCorrect,setUnattempted,result,questions,timeLimit,timer} = useExam()
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(user);
        // console.log(user === 'null');
        if(user === 'null' || user === null){
            navigate('/login')
        }
        if(result){
            setUser(null)
            navigate('/login')
        }
    },[])
    
    const [id,setid] = useState(0)    
    const [showSubmitModal,setShowSubmitModal] = useState(false)
    const [showQuestionList,setShowQuestionList] = useState(false)

    const closeModal = () => {
        setShowSubmitModal(false)
        setShowQuestionList(false)
    }

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
        delete(questions[id].chosenAns)
        // console.log(questions);
        setAttempted(attempted.filter(ques => ques.id !== questions[id].id))
    }

    const resetAll = () => {
        const radio = document.querySelectorAll('input[type="radio"]')
        radio.forEach(item => item.checked = false)
        questions.forEach(item => delete(item.chosenAns))
        setAttempted([])
    }

  
    const resetChecks = () => {
        const radio = document.querySelectorAll('input[type="radio"]')
        radio.forEach(item => item.checked = false)
    }

    useEffect(() => {
        resetChecks()
        if(questions[id].chosenAns !== undefined){
            document.getElementById(questions[id].chosenAns).checked = true
        }
    },[id])
    
    const setAnswer = () => {
        let ans
        var ele = document.getElementsByName('radio');
          
        for(var i = 0; i < ele.length; i++) {
            if(ele[i].checked) ans = ele[i].value
        }
        
        if(ans !== undefined){
            questions[id].chosenAns = ans
            if(attempted.filter(ques => ques.id === questions[id].id).length === 0)
                setAttempted([...attempted,questions[id]])
        }
    }

    const setBookmark = () => {
        if(questions[id].bookmark === true){
            questions[id].bookmark = false
        }else{
            questions[id].bookmark = true
        }
    }

    const handleSubmitNext = () => {
        setAnswer()
        
        // console.log(questions);

        if(id + 1 > questions.length - 1) return
        if(id < questions.length - 1){
            setid(id + 1)
        }
    }

    const checkTime = () => {
        let currentdate = new Date()
        // return (currentdate.getHours() !== 12 && currentdate.getMinutes() > 30)
        return false
    }

    const handleSubmitTest = () => {
        // console.log(checkTime());
        if(checkTime()){
            alert('Time is up')
            return
        }

        setAnswer()
        
        // console.log(questions);

        let marks = 0
        let attempted = []
        let unattempted = []
        let correct = []
        let incorrect = []
        questions.forEach((item,index) => {
            if(item.chosenAns === item.answer.trim()){
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
        sessionStorage.setItem(`Debugger TeamId- ${user}`,JSON.stringify({ marks, attempted, unattempted, correct, incorrect}))
        localStorage.setItem(`Debugger TeamId- ${user}`,JSON.stringify({ marks, attempted, unattempted, correct, incorrect}))
        navigate('/result')
    }

    useEffect(() => {
        const converter = new showdown.Converter()
        const html = converter.makeHtml(questions[id].code)
        // console.log(html);
        document.getElementById('question').innerHTML = html
      },[id])

      useEffect(() => {
        if(!timer && timeLimit <= 0 ){
            setShowSubmitModal(true)
        }
        },[timer])

    //   console.log(questions);
    return (
        user && 
        <div className='flex flex-col md:flex-row w-full h-full relative'>
            {showSubmitModal && 
            <div className='absolute z-10 top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center'>
                <SubmitModal closeModal={closeModal} submitQuiz={handleSubmitTest}/>
            </div>
            }
            {showQuestionList && 
            <div className='absolute z-10 top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center'>
                <QuestionList closeModal={closeModal} jumpToQuestion={setid}/>
            </div>
            }
            <div className='flex flex-col gap-8 items-start p-16 bg-blue-800 text-white' style={{flexBasis:'50%'}}>
                <p>Team Id: {user}</p> 
                <div className='flex gap-4'>
                <div className='w-20 flex items-center bg-white rounded-full'>
                    <img className='w-full' src={Ureckon}/>
                </div>
                <img className='w-20 bg-white rounded-full p-2' src={Debugger}/>
                </div>
                <p className='text-xl'>Question: <span className='text-3xl font-bold'>{id + 1}</span>/{questions?.length}</p>
                <h2>{questions[id].title}</h2>
                <div id='question' className='select-none bg-white shadow-md text-black w-full p-4 max-h-96 overflow-auto rounded-lg'></div>
            </div>
            <div className='flex flex-col items-start w-full text-start justify-center gap-4 p-16' style={{flexBasis:'50%'}}>
                <div className='flex w-full justify-between items-center'>
                    <p>Choose an option</p>
                    <button title='Bookmark Question' onClick={setBookmark} className='w-6'>
                        <img src={questions[id]?.bookmark ? Bookmark : BookmarkOutline}/>
                    </button>
                </div>
                <div className='flex flex-col items-stretch justify-start gap-4 w-full transition-all'>
                {questions[id].options.map((option,index) => {
                    return ( 
                    <label key={index} className={`rounded border w-full flex gap-2 p-4 hover:shadow-md hover:border-green-400 transition-all cursor-pointer ${option === questions[id]?.chosenAns && 'bg-green-500 text-white'}`}>
                      <input onClick={setAnswer} type="radio" id={option} defaultChecked={option === questions[id]?.chosenAns} value={option} name="radio"/>
                      <p>{option}</p>
                    </label>)
                }
                )}
                </div>
            </div>
            <div className='absolute top-0 left-0 gap-2 flex p-4'>
                <button className='p-2 border rounded text-white hover:bg-white/20' title='See all questions' onClick={()=>setShowQuestionList(true)}>
                    <img width={20} src={List}/>
                </button>
            </div>
            <div className='absolute bottom-0 right-0 gap-2 flex p-4'>
                <button disabled={id === 0} className='p-2 bg-blue-600 rounded text-white' title='Go To Previous Question' onClick={handlePrev}>Prev</button>
                {/* <button className='p-2 bg-blue-600 rounded text-white' title='Go To Next Question' onClick={handleNext}>Next</button> */}
                <button disabled={id === questions.length-1} className='p-2 bg-blue-600 rounded text-white' title='Go To Next Question' onClick={handleSubmitNext}>Next</button>
            </div>
            <div className='absolute top-0 right-0 gap-2 flex p-4'>
                {questions[id]?.chosenAns !== undefined && <button className='p-2 bg-blue-600 rounded text-white' title='Reset Current Answer' onClick={resetAns}>Reset Answer</button>}
                <Timer submitQuiz={handleSubmitTest}/>
                <button className='p-2 bg-blue-600 rounded text-white' title='Go To Previous Question' onClick={()=>setShowSubmitModal(true)}>Submit All</button>
            </div>
            <div className='absolute top-0 left-0 gap-2 flex p-4'>
                
            </div>
        </div>
    )
}

export default Home