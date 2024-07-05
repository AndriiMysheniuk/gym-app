import { Exercise } from "../types/Exercise";
import { client } from "../utils/fetchClient";

export const getExercises = () => {
  return client.get<Exercise[]>('/items');
};

export const getSingelExercise = (id: number | null) => {
  return client.get<Exercise>(`/items/${id}`);
};