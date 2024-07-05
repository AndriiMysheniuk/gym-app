import { User } from "../types/User"
import { UserUpdate } from "../types/UserUpdate";
import { client } from "../utils/fetchClient"

export const getUsers = () => {
  return client.get<User[]>('/user')
}

export const getSingelUser = (id: number | null) => {
  return client.get<User>(`/user/${id}`);
};

export const registerNewUser = (
  {username, password}: Omit<User, 'id'>
) => {
  return client.post<User>(
    '/user/register', {username, password}
  )
}

export const loginUser = (
  {username, password}: Omit<User, 'id'>
) => {
  return client.post<User>(
    '/user/login', {username, password}
  )
}

export const updateUser = (
  id: string | undefined,
  {username, age, bodyWeight, height}: UserUpdate
) => {
  return client.patch<User>(
    `/user/${id}`, {username, age, bodyWeight, height}
  )
}
