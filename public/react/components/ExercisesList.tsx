import React, { useState } from 'react';
import { Exercise } from "../types/Exercise";
import { addExerciseToWishlist, deleteFromWishlist } from '../api/wishlist';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Filter } from '../types/Filter';

const filterOptions = [
  { value: Filter.ALL, label: 'All' },
  { value: Filter.CHEST, label: 'Chest' },
  { value: Filter.UPPERLEGS, label: 'Upper Legs' },
  { value: Filter.WAIST, label: 'Waist' },
  { value: Filter.BACK, label: 'Back' },
  { value: Filter.UPPERARMS, label: 'Upper Arms' },
];

type Props = {
  setSelectedId: (id: number) => void;
  exercises: Exercise[];
  setWishlist: (data: Exercise[]) => void;
  wishlist: Exercise[];
}

export const ExercisesList: React.FC<Props> = ({ setSelectedId, exercises, setWishlist, wishlist }) => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const wishlistNames: string[] | undefined = wishlist?.map(current => current.name);

  const handleAddToWishlist = async (exercise: Omit<Exercise, 'id'>) => {
    try {
      const isAlreadyInWishlist = wishlist?.some(w => w.name === exercise.name);

      if (isAlreadyInWishlist) {
        // DELETE from wishlist
        const exerciseToDelete = wishlist.find(w => w.name === exercise.name);
        if (exerciseToDelete) {
          await deleteFromWishlist(exerciseToDelete.id);
          setWishlist(wishlist.filter(w => w.id !== exerciseToDelete.id));
        }
      } else {
        // ADD to wishlist
        const newExercise = await addExerciseToWishlist(exercise);
        setWishlist([...wishlist, newExercise]);
      }
    } catch (err) {
      console.error('Failed to update wishlist:', err);
    }
  }

  const filteredExercises = exercises
    .filter(exercise => {
      if (filter === Filter.ALL) {
        return true;
      }
      return exercise.bodyPart === filter;
    })
    .filter(exercise =>
      exercise.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className='main-list'>
      <div className="search-inputs">
        <input
          className="seacrh"
          type='text'
          placeholder='Search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <span>
          <select
            className="select"
            data-cy="statusSelect"
            value={filter}
            onChange={e => setFilter(e.target.value as Filter)}
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </div>

      {filteredExercises.map((exercise, id) => (
        <div className="card" key={id}>
          <div className="card-img-container">
            <img className='card-img' src={exercise.gifUrl} alt={exercise.name} />
          </div>

          <div className="card-content-right">
            <div className='card-description'>
              <h3 className="card-text">{exercise.name}</h3>
              <p className='card-target'>{exercise.bodyPart}</p>
            </div>
            <div className='card-buttons'>
              <Link
                to={`/exercise/${exercise.id}`}
                className='card-button card-button-about'
                onClick={() => {
                  setSelectedId(exercise.id)
                }}
              >
                More About
              </Link>
              <button
                className={classNames('card-button-like', {
                  active: wishlistNames?.includes(exercise.name)
                })}
                onClick={event => {
                  event.preventDefault();
                  handleAddToWishlist({
                    gifUrl: exercise.gifUrl,
                    bodyPart: exercise.bodyPart,
                    equipment: exercise.equipment,
                    name: exercise.name,
                    target: exercise.target
                  });
                }}
              >
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
