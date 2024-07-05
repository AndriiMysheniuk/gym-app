import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, registerNewUser } from '../api/user';
import { User } from '../types/User';

/*type Props = {
  selectedId: number | null;
}
*/

export const Form: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isFromActive, setiIsFromActive] = useState(true)
  const navigate = useNavigate()

  const [usernameReg, setUsernamedReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const [usernameLog, setUsernamedLog] = useState('')
  const [passwordLog, setPasswordLog] = useState('')

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  const handleRegister = async(userDetails: User) => {
    const isUserExist = users.some(user => {
      return user.username === userDetails.username
    })

    if (isUserExist) {
      alert('This user is already exist!')
      return
    }

    try {
      await registerNewUser(userDetails);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      
      // Find the new user to get their ID
      const newUser = updatedUsers.find(user => user.username === userDetails.username);
      if (newUser) {
        navigate(`/profile/${newUser.id}`);
      }
    } catch (err) {
      console.error('Failed to register a user:', err);
    }
  }

  const handleLogIn = (userDetails: User) => {
    const user = users.find(user => user.username === userDetails.username && user.password === userDetails.password);

  if (user) {
    setUsernamedLog('');
    setPasswordLog('');
    navigate(`/profile/${user.id}`);
  } else {
    alert('Invalid username or password.');
  }

  setUsernamedLog('');
  setPasswordLog('');
  }

  return (
    <div className='form-container'>
      {isFromActive
        ? <>
          <form className="addForm" onSubmit={e => {
            e.preventDefault()
            handleRegister({
              id: users.length + 1,
              username: usernameReg,
              password: passwordReg,
              age: '0',
              bodyWeight: '0',
              height: '0',
            })
          }}>
            <div className="form-title">
              <h2 className='form-title'>Sigh Up</h2>
              <Link to='/' className="form-close">
                Close
              </Link>
            </div>

            <div className="form-fields">
              <input
                type="text"
                className="form-field"
                placeholder="User Name"
                value={usernameReg}
                onChange={e => setUsernamedReg(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-field"
                placeholder="Password"
                value={passwordReg}
                onChange={e => setPasswordReg(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="form-submit">Sigh Up</button>
          </form>

          <div className="from-question">
            <h4>Do you already have an account?</h4>
            <button className="form-submit" onClick={() => setiIsFromActive(false)}>
              Log in
            </button>
          </div>
        </>
        : <>
          <form className="addForm" onSubmit={e => {
            e.preventDefault()
            handleLogIn({
              id: 0,
              username: usernameLog,
              password: passwordLog,
              age: '',
              bodyWeight: '',
              height: ''
            })
          }}>
            <div className="form-title">
              <h2 className='form-title'>Log In</h2>
              <Link to='/' className="form-close">
                Close
              </Link>
            </div>

            <div className="form-fields">
              <input
                type="text"
                className="form-field"
                placeholder="User Name"
                value={usernameLog}
                onChange={e => setUsernamedLog(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-field"
                placeholder="Password"
                value={passwordLog}
                onChange={e => setPasswordLog(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="form-submit">Log In</button>
          </form>

          <div className="from-question">
            <h4>Do you want create an account?</h4>
            <button className="form-submit" onClick={() => setiIsFromActive(true)}>Sign Up</button>
          </div>
        </>
      }

      {/*false &&
        <div className="users-sheet-container">
          <h2>User List</h2>
          <table className="users-sheet">
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, id) => (
                <tr key={id}>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      */}
    </div>
  )
}
