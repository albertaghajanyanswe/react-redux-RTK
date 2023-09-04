import React, { useEffect, useState } from'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IUser } from '../models/IUser';
import { addUser, deleteUser, getUsers, userSlice } from '../store/reducers/UsersSlice';

function Users() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e.target ', e.target)
    setNewUser(user => {
      return ({
        ...user,
        [e.target.name]: e.target.value
      })
    })
  }
  const dispatch = useAppDispatch();

  const {users} = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, [])

  const handleDelete = async (id: number) => {
    await dispatch(deleteUser(id));
    await dispatch(getUsers());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(addUser(newUser as IUser));
    await dispatch(getUsers());
  }

  console.log('users = ', users)
  return (
    <div>
      <h1> Users store (Redux toolkit) </h1>
      <ul>
        {users.map(i => (
          <div>
            <li key={i.id} style={{ textAlign: 'start'}}>{`${i.id}. ${i.name} - ${i.email}`}</li>
            <button onClick={() => handleDelete(i.id)}>Delete</button>
          </div>
        ))}
      </ul>
      <div>
        <form>
          <input style={{ padding: '8px', marginRight: '8px' }} name='name' onChange={handleChange} placeholder='Name' />
          <input style={{ padding: '8px', marginRight: '8px' }} name='email' onChange={handleChange} placeholder='Email' />
          <button onClick={handleSubmit}> Add user </button>
        </form>
      </div>
    </div>
  )
}

export default Users;