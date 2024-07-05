import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header'
import { Footer } from './components/Footer';
import { ExercisesList } from './components/ExercisesList';
import { SingleExercise } from './components/SIngleExercise';
// import { Training } from './components/Training';
import { Wishlist } from './components/Wishlist';
import { Exercise } from './types/Exercise';
import { getWishlist } from './api/wishlist';
import { getExercises } from './api/exercise';
import { Registration } from './components/Registration';
import { Form } from './components/Form';
import { Profile } from './components/Profile';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [wishlist, setWishlist] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getExercises()
      .then(setExercises)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
    getWishlist()
      .then(setWishlist)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, [])

  return (
    <Router>
      <main>
        {false && <Registration />}

        <Header
          setIsWishlistActive={setIsWishlistActive}
          isWishlistActive={isWishlistActive}
          wishlist={wishlist}
        />

        {loading && <Loader />}

        {errorMessage && (
          <div className="error-container">
            <h2 className='error-message'>{errorMessage}</h2>
          </div>
        )}

        <main className='container'>
          <Routes>
            {!loading && !errorMessage && (exercises?.length ?? 0) > 0 && (
              <Route path='/' element={
                <ExercisesList
                  setSelectedId={setSelectedId}
                  exercises={exercises}
                  setWishlist={setWishlist}
                  wishlist={wishlist}
                />
              } />
            )}

            <Route path='/wishlist' element={
              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            } />

            <Route path='/profile'>
              <Route index element={<Profile />} />
              <Route path=':userId' element={
                <Profile />
              } />
            </Route>

            <Route path='/exercise/:id' element={
              <SingleExercise selectedId={selectedId} />
            } />

            <Route path='/registration' element={
              <Form />
            } />
          </Routes>
        </main>
        <Footer />
      </main>
    </Router>
  )
}
