import React, { useState } from'react';
import { IUser } from '../models/IUser';
import { userAPI } from '../services/rtk/UserService';

function UsersRTK() {
  const [newUser, setNewUser] = useState<Partial<IUser>>({
    name: '',
    email: ''
  });

  const { data: users, error, isLoading } = userAPI.useGetAllUsersQuery(5);
  const [ addUser, { isLoading: createLoading} ] = userAPI.useAddUserMutation();
  const [ deleteUser, { isLoading: deleteLoading} ] = userAPI.useDeleteUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(user => {
      return ({
        ...user,
        [e.target.name]: e.target.value
      })
    })
  }

  const handleDelete = async (user: IUser) => {
    await deleteUser(user);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addUser(newUser as IUser);
  }

  return (
    <div>
      <h1> Users store (Redux toolkit RTK Query) </h1>
      {isLoading && <h2> Loading...</h2>}
      {error && <h2> Could not get users data. </h2>}
      <ul>
        {users && users.map(i => (
          <div key={i.id}>
            <li style={{ textAlign: 'start'}}>{`${i.id}. ${i.name} - ${i.email}`}</li>
            <button disabled={deleteLoading} onClick={() => handleDelete(i)}>Delete</button>
          </div>
        ))}
      </ul>
      <div>
        <form>
          <input style={{ padding: '8px', marginRight: '8px' }} name='name' onChange={handleChange} placeholder='Name' />
          <input style={{ padding: '8px', marginRight: '8px' }} name='email' onChange={handleChange} placeholder='Email' />
          <button disabled={createLoading} onClick={handleSubmit}> Add user </button>
        </form>
      </div>
    </div>
  )
}

export default UsersRTK;