import react, { useState } from "react";
import './calender.css'

const Calender = ({ ExercioseProps }) => {

    const todaysDate = new Date();;
    const displayDate = todaysDate.toLocaleDateString('pl-PL');

    const days = [];
    for (let i = -1; i < 7; i++){
        const date = new Date();
        date.setDate(date.getDate() + i);
        days.push(date);
    }
    //Formatowanie listy dni tygodnia
    const formatedDays = (days) => {
        return days.toLocaleDateString('pl-PL', 
            { weekday: 'short', day: 'numeric', month: 'short' });
    }

    return (
        <div>
            <h1>Plan your workouts</h1>
            <h3>Your exercises</h3>

            <span style={{ fontSize:'18px', fontWeight:'600'}}>
                Today's date: 
            <strong style={{textDecoration:'underline'}}>
                {displayDate}
            </strong>
            </span>
            <div className="calender">
                <div className="calender-days">
                    {days.map((day, index) => (
                        <div key={index} className={`calender-day ${day.toDateString() === todaysDate ? 'today' : ''}`}>
                            <span>{formatedDays(day)}</span>
                            {[...new Set(ExercioseProps.filter(exercise => exercise.date.toDateString() === day.toDateString()).map(exercise => exercise.name))].map((justExerciseName, i) => (
                                <div key={i} className="calender-exercise">
                                    <span className="justEx-span">#{i + 1}{justExerciseName}</span>
                                </div>
                            ))}
                        </div>
                     )
                    )}   
                </div>    
            </div>
        </div>
    );
};
export default Calender;