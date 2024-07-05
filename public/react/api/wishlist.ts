import { Exercise } from "../types/Exercise"
import { client } from "../utils/fetchClient"

export const getWishlist = () => {
  return client.get<Exercise[]>('/wishlist')
}

export const addExerciseToWishlist = (
  {gifUrl, bodyPart, equipment, name, target}: Omit<Exercise, 'id'>
) => {
  return client.post<Exercise>(
    '/wishlist', {gifUrl, bodyPart, equipment, name, target}
  )
}

export const deleteFromWishlist = (id: number) => {
  return client.delete<Exercise[]>(`/wishlist/${id}`)
}
