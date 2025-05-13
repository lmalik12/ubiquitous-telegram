import { useState, useEffect } from 'react';
import {workoutProgram as training_plan} from '../utils/index.js';
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid() {
  const [savedWorkouts, setSavedWorkouts] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // which entries are complete? CAn user move to next workout?

  const completedWorkouts = Object.keys(savedWorkouts || {}).filter((value) => {
    const entry = savedWorkouts[value]
    return entry.isComplete
  })

  // save data to local storage, modify saved workouts state
  const handleSave = (index, data) => {
    const newObj = {
      ...savedWorkouts,
      [index]: {
        // obj of weights or weights + status
        ...data, 
        // either we dont have isComplete yet, or we already have a savedWorkout
        isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
      }
    }
    setSavedWorkouts(newObj)
    localStorage.setItem('fitnessTracker', JSON.stringify(newObj))
    setSelectedWorkout(null)
  }

  //complete workout, modify completed status, lets user move to next day workouts
  const handleComplete = (index, data) => {
    const newObj = {...data} // all the weights
      newObj.isComplete = true // status of workout
      handleSave(index, newObj)
  }

  useEffect(() => {
    if (!localStorage) return;

    let savedData = {};
    if (localStorage.getItem('fitnessTracker')) {
      savedData = JSON.parse(localStorage.getItem('fitnessTracker'))
    }
    setSavedWorkouts(savedData);
  }, [])

  return (
    <div className="training-plan-grid">
      {Object.keys(training_plan).map((workout, index) => {

        // if first day, should be unlocked
        // check the completedWorkouts array, if yesterday's index present then move to next day
        const isLocked = index === 0 ? false : !completedWorkouts.includes(`${index - 1}`)
        const type =  index % 3 === 0 ? 
          'Push' : 
            index % 3 === 1 ? 
              'Pull' : 
              'Legs'

        const trainingPlanForDay = training_plan[index];

        const dayNum = ((index / 8) <= 1) ? '0' + (index + 1) : index + 1;
        const icon = (
          index % 3 === 0 ? (
            <i className='fa-solid fa-dumbbell'></i>
          ) : (
            index % 3 === 1 ? (
              <i className='fa-solid fa-weight-hanging'></i>
            ) : (
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
            handleSave={handleSave}
            handleComplete={handleComplete}
            savedWeights={savedWorkouts?.[index]?.weights}
            />
        }

        return (
          <button
            className={'card plan-card ' + (isLocked ? 'inactive' : '')}
            key={index}
            onClick={() => {
              if ( isLocked ) return;
              setSelectedWorkout(index)}}>
            <div className='plan-card-header'>
              <p>Day {dayNum} </p>
              {isLocked ? (
              <i className='fa-solid fa-lock'></i>
            ) : icon}
            </div>

            <div className='plan-card-header'>
              <h4><b>{type}</b></h4>
            </div>
          </button>
        )
      })}
    </div>
  )
}