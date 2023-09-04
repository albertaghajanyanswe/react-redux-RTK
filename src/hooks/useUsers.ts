import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IUser } from '../models/IUser';
import userService from '../services/usersService';
import { queryFnKeys } from './reactQueryFnKeys';

const userQueryFnKeys = queryFnKeys.users;

const useUsers = () => {
  return useQuery([userQueryFnKeys.users], (params) => userService.getUsers<IUser[], typeof params>(params), {
    select: ({ data }) => data,
  })
}

const useAddUsers = () => {
  const queryClient = useQueryClient();
  return useMutation([userQueryFnKeys.addUsers], (data: IUser) => userService.addUser(data), {
    onSuccess() {
      queryClient.invalidateQueries([userQueryFnKeys.users])
    },
  })
}

const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation([userQueryFnKeys.deleteUsers], (data: IUser) => userService.deleteUser(`${data.id}`), {
    onSuccess() {
      queryClient.invalidateQueries([userQueryFnKeys.users])
    },
  })
}
export { useUsers, useAddUsers, useDeleteUsers };