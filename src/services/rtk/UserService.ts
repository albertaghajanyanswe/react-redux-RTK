import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUser } from '../../models/IUser';
import { apiEndpoints } from '../configs';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:4000' }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], number>({
      query: (limit: number = 5) => ({
        url: `/${apiEndpoints.users}`,
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ['Users']
    }),
    addUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/${apiEndpoints.users}`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['Users']
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/${apiEndpoints.user.replace(':userId', `${user.id}`)}`,
        method: 'DELETE',
        body: user.id
      }),
      invalidatesTags: ['Users']
    })
  })
})