import React, { useState } from 'react';
import { useAddUsers, useDeleteUsers, useUsers } from '../hooks/useUsers';
import { IUser } from '../models/IUser';

function UsersRQ() {

  const { data: users, isLoading } = useUsers();
  const { mutateAsync: mutateAddUser, isLoading: createLoading } = useAddUsers();
  const { mutateAsync: mutateDeleteUser, isLoading: deleteLoading } = useDeleteUsers();

  const [newUser, setNewUser] = useState<Partial<IUser>>({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(user => {
      return ({
        ...user,
        [e.target.name]: e.target.value
      })
    })
  }

  const handleDelete = async (user: IUser) => {
    await mutateDeleteUser(user);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await mutateAddUser(newUser as IUser);
  }

  console.log('USERS - ', users)
  return (
    <div>
      <h1> Users store (React Query) </h1>
      {isLoading && <h2> Loading...</h2>}
      <ul>
        {users && users.map(i => (
          <div key={i.id}>
            <li style={{ textAlign: 'start'}}>{`${i.id}. ${i.name} - ${i.email}`}</li>
            <button disabled={deleteLoading} onClick={() => handleDelete(i)}>Delete</button>
          </div>
        ))}
      </ul>
      <form>
        <input style={{ padding: '8px', marginRight: '8px' }} name='name' onChange={handleChange} placeholder='Name' />
        <input style={{ padding: '8px', marginRight: '8px' }} name='email' onChange={handleChange} placeholder='Email' />
        <button disabled={createLoading} onClick={handleSubmit}> Add user </button>
      </form>
    </div>
  )
}

export default UsersRQ;