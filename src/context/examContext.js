import React, { useContext, useState, useEffect } from "react";
// import { questionSet } from '../assets/questions/question'
import questionSet from "../assets/questions/DebuggerFinals.json";
import { TIME_LIMIT } from "../constants";

const ExamContext = React.createContext();

export const useExam = () => {
  return useContext(ExamContext);
};

export const ExamProvider = ({ children }) => {
  const [marks, setMarks] = useState(0);
  const [timer, setTimer] = useState(false);
  const [attempted, setAttempted] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [unattempted, setUnattempted] = useState([]);
  const [result, setResult] = useState(false);
  const [questions, setQuestions] = useState(questionSet);
  const [timeLimit, setTimeLimit] = useState(TIME_LIMIT);
  const [submitting,setSubmitting] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const resetTimeLimit = () => {
    setTimeLimit(TIME_LIMIT);
  }

  useEffect(() => {
    console.log(questionSet,questions);
    setQuestions(
      shuffleArray(
        questionSet.map((item,index) => {
          return {
            ...item,
            options: item.options,
            sl_no: index + 1
          };
        })
      )
    );
  }, []);

  const value = {
    marks,
    setMarks,
    timer,
    setTimer,
    timeLimit,
    setTimeLimit,
    resetTimeLimit,
    attempted,
    setAttempted,
    incorrect,
    setIncorrect,
    correct,
    setCorrect,
    unattempted,
    setUnattempted,
    result,
    setResult,
    questions,
    submitting,
    setSubmitting
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};
