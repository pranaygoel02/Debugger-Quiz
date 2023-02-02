import React,{useContext,useState,useEffect} from 'react'

const ExamContext = React.createContext()

export const useExam = () => {
    return useContext(ExamContext)
}


export const ExamProvider = ({children}) => {
    const [marks,setMarks] = useState(0)
    const [timer,setTimer] = useState(false)
    const [attempted,setAttempted] = useState([])
    const [incorrect,setIncorrect] = useState([])
    const [correct,setCorrect] = useState([])
    const [unattempted,setUnattempted] = useState([])
    const [result,setResult] = useState(false)
    
    const timeLimit = 1800000
    
    const value = {
        marks,setMarks,timer,setTimer,timeLimit,attempted,setAttempted, incorrect,setIncorrect,correct,setCorrect,unattempted,setUnattempted,result,setResult    
    }

    return (
        <ExamContext.Provider value={value}>
            {children}
        </ExamContext.Provider>
    )

}
