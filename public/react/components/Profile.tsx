import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSingelUser, updateUser } from '../api/user';
import { User } from '../types/User';
import classNames from 'classnames';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');
  const [height, setHeight] = useState('');
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      getSingelUser(Number(userId)).then((userData) => {
        setUser(userData);
        setUsername(userData.username);
        setAge(userData.age);
        setBodyWeight(userData.bodyWeight);
        setHeight(userData.height);
      });
    }
  }, [userId]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    if (userId) {
      const updatedUser = await updateUser(userId, {
        username,
        age,
        bodyWeight,
        height,
      });
      setUser(updatedUser);
      setIsEditMode(false);
    }
  };

  if (!user) {
    return (
      <div className="from-question">
        <h2>You're not signed in</h2>
        <Link to='/registration' className="go-to-form">Sign Up | Log In</Link>
      </div>
    );
  }

  return (
    <main>
      <div className="main__user">
        <img className="main__user-photo" src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" alt="User" />
        <div className="main__user-info">
          <div className="main__user-title">
            {isEditMode ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="main__user-name isEdit"
              />
            ) : (
              <p className='main__user-name'>
                {user.username}
              </p>
            )}
          </div>
          <div className="main__user-buttons">
            {isEditMode ? (
              <button className="button-follow" onClick={handleSave}>Save</button>
            ) : (
              <button className="button-follow" onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>

      <div className="main__description">
        <h2>Details</h2>
      </div>

      <div className="main__account-details">
        <div className="main__account-info">
          {isEditMode ? (
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="main__account-info-big isEdit"
            />
          ) : (
            <p className='main__account-info-big'>{user.age}</p>
          )}
          <p className="main__account-info-small">age</p>
        </div>

        <div className="main__account-info">
          {isEditMode ? (
            <input
              type="number"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
              className="main__account-info-big isEdit"
            />
          ) : (
            <p className="main__account-info-big">{user.bodyWeight} kg</p>
          )}
          <p className="main__account-info-small">Body Weight</p>
        </div>

        <div className="main__account-info">
          {isEditMode ? (
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="main__account-info-big isEdit"
            />
          ) : (
            <p className="main__account-info-big">{user.height} cm</p>
          )}
          <p className="main__account-info-small">Height</p>
        </div>
      </div>

      <div className="main__description">
        <h2>Activity</h2>
      </div>

      <div className="main__account-activity">
        <p className="main__activity-number">11</p>
        <p className="main__activity-text">
          You've done more than 10 exercises. Keep pushing!
        </p>
      </div>
    </main>
  );
}
