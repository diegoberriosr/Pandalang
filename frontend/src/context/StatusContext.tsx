import React, { useState, createContext } from 'react';
import defaultInstance from '../axios/defaultInstance';
import { useNavigate } from 'react-router-dom';

type Lesson = {
    id : number,
    number_in_course : number
};

type Section = {
    id : number,
    number_in_course : number,
    variant : string,
    description : string,
    lessons : Lesson[]
}

type Course = {
    id : number,
    title : string,
    sections : Section[],
    current_lesson : number
}

type ProfileCourse = {
    id : number,
    title : string,
    flag : string
}

type Status = {
    hearts : number,
    xp : number,
    available_xp : number,
    is_premium : boolean
    active_course  ? : Course,
    courses : ProfileCourse[] 
}

export const StatusContext = createContext<Status | undefined>(undefined);

export const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState<Status | undefined>(localStorage.getItem('status') ? JSON.parse(localStorage.getItem('status')) : undefined);
    const navigate = useNavigate();

    console.log(status);

    const getStatus = (setLoading) => {
        const token = JSON.parse(localStorage.getItem('authTokens'));
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token.access,
            }
        };

        setLoading(true);
        defaultInstance('me', config)
        .then( res => {
            setStatus(res.data);
            localStorage.setItem('status', JSON.stringify(res.data));
            setLoading(false);
            navigate('/learn');
        })
        .catch( err => {
            console.log('could not get status');
            console.log(err);
            setLoading(false);
        })
    };

    const handleUpdateHearts = (amount, setLoading) => {

        if ( amount + status.hearts > 5 || amount + status.hearts < 0) return; // Amount of hearts must be in range [0,5].

        setLoading(true);
        defaultInstance.put('hearts/update', { amount : amount})
        .then( res => {
            setStatus( prevStatus => {
                let updatedStatus = {...prevStatus};
                updatedStatus = {...updatedStatus, hearts : res.data.hearts};
                return updatedStatus;
            });
            localStorage.setItem('status', JSON.stringify(res.data));
            setLoading(false);
        })
        .catch( err => {
            console.log(err);
            setLoading(false);
        })
    };

    const handleTransaction = (xpAmount, heartsAmount, setLoading) => {
        if (heartsAmount + user.hearts > 5 || user.available_xp < xpAmount) return // Do not process if not enough available_xp or total amount of hearts will be increased over 5.

        setLoading(true);
        defaultInstance.put('hearts/refill', { hearts_amount : heartsAmount, xp_cost : xpAmount})
        .then( res => {
            setStatus( prevStatus => {
                let updatedStatus = {...prevStatus};
                updatedStatus = {...updatedStatus, hearts : res.data.hearts, available_xp : res.data.available_xp };
                return updatedStatus;
            });

            setLoading(false);
        })
        .catch( err => {
            console.log(err);
            setLoading(false);
        })
    };

    const handleChangeActiveCourse = (courseId, setLoading) => {
        setLoading(true);
        defaultInstance.put('change', {course_id : courseId})
        .then( res => {
            setStatus( prevStatus => {
                let updatedStatus = {...prevStatus};
                updatedStatus = {...updatedStatus, active_course : res.data};
                return updatedStatus;
            })
            setLoading(false);
        })
        .catch( err => {
            console.log(err);
            setLoading(false);
        })
    };

     const handleEnrollCourse = (courseId, setLoading) => {
        setLoading(true);
        defaultInstance.put('enroll', { course_id : courseId})
        .then( res => {
            setStatus( prevStatus => {
                let updatedStatus = {...prevStatus};
                updatedStatus = {...updatedStatus, active_course : res.data.active, courses : updatedStatus.courses?.concat([res.data.profile])}
                return updatedStatus;
            });
            setLoading(false);
            navigate('/learn');
        })
        .catch( err => {
            console.log(err);
            setLoading(false);
        })
     };

     const handleCompleteLesson = (lessonId, accuracy, setEarnedXp, setLoading) => {
        setLoading(true);
        defaultInstance.post(`lesson/complete/${lessonId}`, {accuracy : accuracy})
        .then( res => {
            setEarnedXp(res.data);
            setStatus( prevStatus => {
                let updatedStatus = {...prevStatus};
                updatedStatus = {...prevStatus, xp : status.xp + res.data, available_xp : status.available_xp + res.data};
            })
            setLoading(false);
        })
        .catch( err => {
            console.log(err);
            setLoading(false);
        })
     };

    const values = {
        status : status,
        setStatus : setStatus,
        getStatus : getStatus,
        handleUpdateHearts : handleUpdateHearts,
        hadleTransaction : handleTransaction,
        handleChangeActiveCourse : handleChangeActiveCourse,
        handleEnrollCourse : handleEnrollCourse,
        handleCompleteLesson : handleCompleteLesson
    }

    return <StatusContext.Provider value={values}>
        {children}
    </StatusContext.Provider>
};