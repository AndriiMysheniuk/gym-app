import React, { useState, useEffect, useRef } from 'react';
import { getSingelExercise } from '../api/exercise';
import { Exercise } from "../types/Exercise";
import { Training } from './Training';
import { useParams } from 'react-router-dom';

type Props = {
  selectedId: number | null;
}

export const SingleExercise: React.FC<Props> = ({ selectedId }) => {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise>();
  const [isShowed, setIsShowed] = useState(false)

  const trainingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) {
      const exerciseId = parseInt(id);
      getSingelExercise(exerciseId)
        .then(setExercise)
        .catch(err => {
          console.error('Failed to fetch exercise:', err);
        });
    }
  }, [id]);

  return (
    <>
      <div className="item">
        <img className="item-img" src={exercise?.gifUrl} />
        <div className="item-details">
          <div className="item-title">
            <h1 className="item-text item-name">{exercise?.name}</h1>
            <button className='card-button-like' />
          </div>
          <h4 className="item-text item-target">
            {exercise?.bodyPart} | {exercise?.target} | {exercise?.equipment}
          </h4>
          <p className='item-text item-description'>
            Push-ups are a fundamental bodyweight exercise that strengthens the chest, shoulders, triceps, and core.
            They involve lowering and raising the body by bending the arms while maintaining a straight line from head to heels.
          </p>

          <div className='item-buy'>
            <button
              className='item-button'
              onClick={() => setIsShowed(true)}
            >
              Start Trainig
            </button>
          </div>
        </div>
      </div>
      {isShowed &&
        <Training
          exercise={exercise}
          setIsShowed={setIsShowed}
        />
      }
    </>
  )
}