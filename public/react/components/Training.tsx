import React, { useState, useEffect } from 'react';
import { Exercise } from '../types/Exercise';
import { Timer } from './Timer';

type Props = {
  exercise: Exercise | undefined;
  setIsShowed: (value: boolean) => void;
}

export const Training: React.FC<Props> = ({ exercise, setIsShowed }) => {
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [activeSet, setActiveSet] = useState<number | null>(null);
  const [completedSets, setCompletedSets] = useState<number[]>([]);
  const sets = [1, 2, 3, 4];

  const handleTimerCompletion = (setNumber: number) => {
    setCompletedSets(prev => [...prev, setNumber]);
    setActiveSet(null);
    setIsTimerActive(false);
  };

  return (
    <>
      {isTimerActive && activeSet !== null
        ? <Timer 
          setIsTimerActive={setIsTimerActive} 
          onTimerComplete={() => handleTimerCompletion(activeSet)} 
        />
        : (
          <div className='train-list'>
            <h1 className='train-list-title'>Let's Do It</h1>

            {sets.map((setNumber) => (
              <div key={setNumber}>
                <div 
                  id={`train-${setNumber}`} 
                  className={`train ${completedSets.includes(setNumber) ? 'disabled' : ''}`}
                >
                  <div className='train-description'>
                    <h3 className="train-text">Set {setNumber} | {exercise?.name}</h3>
                  </div>
                  <div className='train-button'>
                    <button
                      className={`button-icon train-button-tick ${completedSets.includes(setNumber) ? 'disabled' : ''}`}
                      onClick={() => {
                        setIsTimerActive(true)
                        setActiveSet(setNumber);
                      }}
                      disabled={completedSets.includes(setNumber)}
                    />
                  </div>
                </div>
                <div className='button-dots'>
                  <button className='button-icon train-button-dots' />
                </div>
              </div>
            ))}

            <div>
              <button
                className='train-button-hide'
                onClick={() => setIsShowed(false)}
              >
                Hide List
              </button>
            </div>
          </div>
        )}
    </>
  )
}