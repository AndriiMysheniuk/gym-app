import React, { useEffect, useState } from "react";
import { Exercise } from "../types/Exercise";
import { deleteFromWishlist, getWishlist } from "../api/wishlist";

type Props = {
  wishlist: Exercise[] | null
  setWishlist: (data: any) => void;
}

export const Wishlist: React.FC<Props> = ({ wishlist, setWishlist }) => {

  // need to fix it
  function deleteExcercise (id: number) {
    deleteFromWishlist(id);
    setWishlist((currentExrcises: any[]) => {
      return currentExrcises.filter((exercise: Exercise) => exercise.id !== id)
    })
  }
  
  return (
    <div className='main-list'>
      {wishlist?.map((exercise, id) => (
        <div className="card" key={id}>
          <div className="card-img-container">
            <img className='card-img' src={exercise.gifUrl} />
          </div>

          <div className="card-content-right">
            <div className='card-description'>
              <h3 className="card-text">{exercise.name}</h3>
              <p className='card-target'>{exercise.target}</p>
            </div>
            <div className='card-buttons'>
              <button
                className='card-button card-button-about'
              >
                More About
              </button>
              <button
                className='card-button-delete'
                onClick={() => deleteExcercise(exercise.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}