import { useState } from 'react';
import {workoutProgram as training_plan} from '../utils/index.js';
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid() {
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const completedWorkouts = [];
  const isLocked = false;

  // save data to local storage, modify saved workouts state
  // const handleSave(index, data) => {}

  //complete workout, modify completed status 
  // const handleComplete(index, data) => {}

  return (
    <div className="training-plan-grid">
      {Object.keys(training_plan).map((workout, index) => {
        const type =  index % 3 === 0 ? 
          'Push' : 
            index % 3 === 1 ? 
              'Pull' : 
              'Legs'

        const trainingPlanForDay = training_plan[index];

        const dayNum = ((index / 8) <= 1) ? '0' + (index + 1) : index + 1;
        const icon = (
          // which workout is it, 
          index % 3 === 0 ? ( //push
            <i className='fa-solid fa-dumbbell'></i>
          ) : (
            index % 3 === 1 ? ( //pull
              <i className='fa-solid fa-weight-hanging'></i>
            ) : ( // leg
              <i className='fa-solid fa-bolt'></i>
            )
          )
        )

        if(index === selectedWorkout){
          return <WorkoutCard
          key={`workout-${index}`}
          trainingPlanForDay={trainingPlanForDay}
          index={index}
          type={type}
          dayNum={dayNum}
          icon={icon}
          // savedWeights={}
          />
        }

        return (
          <button
            className={'card plan-card ' + (isLocked ? 'inactive' : '')}
            key={index}
            onClick={() => {setSelectedWorkout(index)}}>
            <div className='plan-card-header'>
              <p>Day {dayNum} </p>
            </div>
            {isLocked ? (
              <i className='fa-solid fa-lock'></i>
            ) : icon}
            <div className='plan-card-header'>
              <h4><b>{type}</b></h4>
            </div>
          </button>
        )
      })}

      
    </div>
  )
}