import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/*type Props = {
  selectedId: number | null;
}
*/

export const Registration: React.FC = () => {
  return (
    <>
      <div className="registration">
        <img className="registration-img" src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1673453535.jpg?crop=0.72xw:1xh;center,top&resize=640:*" />
        <div className="regisrtation-content">
          <div className="registration-details">
            <h1 className="registration-text registration-name">
              Make your body healthier and <span className="orange-text">stronger</span>
            </h1>
            <p className='registration-text registration-description'>
              Push-ups are a fundamental bodyweight exercise that strengthens the chest, shoulders, triceps, and core.
              They involve lowering and raising the body by bending the arms.
            </p>
          </div>
          <div className='registration-buy'>
            <Link
              to='/registration'
              className='registration-button'
            >
              Start Training
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}