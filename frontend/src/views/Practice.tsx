import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import defaultInstance from '../axios/defaultInstance.js';

// Component imports
import PracticeHeader from '../components/practice/PracticeHeader.tsx';
import PracticeFooter from '../components/practice/PracticeFooter.tsx';
import Modal from '../components/practice/Modal.tsx';
import ExerciseWithoutHelp from '../components/practice/ExerciseWithoutHelp.tsx';
import ExerciseWithHelp from '../components/practice/ExerciseWithHelp.tsx';
import OutOfHearts from '../components/practice/OutOfHearts.tsx';
import QuitPractice from '../components/practice/QuitPractice.jsx';
import PracticeLesson from '../components/practice/PracticeLesson.tsx';
import LessonCompleted from '../components/practice/LessonCompleted.tsx';
import { MoonLoader } from 'react-spinners';

// Context imports
import { StatusContext } from '../context/StatusContext.tsx';


type Word = {
    id : number,
    word : string,
    translation : string,
    slug ? : string,
    sound ? : string
}

type Exercise = {
    words : Word[],
    answer : Word,
    type : string
};



const Practice = ({ practice }) => {
  
  const [loading, setLoading] = useState<boolean>(true); // Loading state.
  const [exercises, setExercises] = useState<Exercise[]>([]); // A list of exercises.
  const [selected, setSelected] = useState<Word | undefined>(undefined); // Selected option on an exercise.
  const [state, setState] = useState<string>('waiting'); // Keeps track of submission state( waiting for submission, correct submission, and wrong submission);
  const [progress, setProgress ] = useState<number>(0); // Overall progress.
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Keeps track of correct answers (used to calculate lesson accuracy in the future) 
  const [attempts, setAttempts] = useState<number>(0); // Keeps track of total attempts (also used to calculate lesson accuracy).
  const [quitModal, setQuitModal] = useState<boolean>(false); // Used for displaying the exit confirmation modal.
  const [practiceLessonModal, setPracticeLessonModal] = useState<boolean>( practice ? true : false); // Used to display a modal when starting a practice lesson. 
  const { status } = useContext(StatusContext);
  const navigate = useNavigate();

  const params = useParams();
  
  useEffect( () => {
    if (!status) navigate("/");

    defaultInstance( practice ? `practice/${status.active_course.id}` : `lesson/${params.lessonId}`)
    .then( res => {
      setExercises(res.data);
      setLoading(false);
    })
    .catch( err => {
      console.log(err);
      navigate("/learn");
    })
  }, []);


  useEffect( () => {
    if(!loading){
        setSelected(undefined);
        setProgress(((attempts)/(attempts + exercises.length)) * 100);
    }
  }, [exercises]);


  return (
    <>
    <Modal isVisible={exercises.length === 0 && !loading}>
      <LessonCompleted practice={practice} lessonId={params.lessonId} attempts={attempts} correctAnswers={correctAnswers}/>
    </Modal>
    { !loading &&
      <Modal isVisible={practiceLessonModal}>
        <PracticeLesson setPracticeLessonModal={setPracticeLessonModal}/>
      </Modal>
    }
    <Modal isVisible={status.hearts === 0}>
        <OutOfHearts/>
    </Modal>
    <Modal isVisible={quitModal}>
        <QuitPractice setQuitModal={setQuitModal}/>
    </Modal>
    <PracticeHeader practice={practice} progress={progress} setQuitModal={setQuitModal}/>
    <main className='mt-10 sm:mt-20 w-screen flex-1 flex flex-col items-center justify-center px-2.5 md:px-5 lg:px-10'>
      { loading && <MoonLoader loading={loading} size={window.innerHeight/5} color="#22c55e"/>}
      { exercises.length > 0 && !loading && ( exercises[0].type === 'without_help_target' || exercises[0].type === 'without_help_origin') && 
        <ExerciseWithoutHelp exercise={exercises[0]} state={state} selected={selected} setSelected={setSelected}/>
      }
      { exercises.length > 0 && !loading && ( exercises[0].type === 'with_help_target' || exercises[0].type === 'with_help_origin') && 
        <ExerciseWithHelp exercise={exercises[0]} state={state} selected={selected} setSelected={setSelected}/>
      }
    </main>
    <PracticeFooter practice={practice} selected={selected} exercises={exercises} 
    setExercises={setExercises} setCorrectAnswers={setCorrectAnswers} 
    state={state} setState={setState}
    setAttempts={setAttempts}/>
    </>
  )
}

export default Practice
