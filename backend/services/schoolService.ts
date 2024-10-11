import { v4 as uuidv4 } from 'uuid';
import School from '../types/school.types';

let schools: School[] = [];

export const schoolService = {
  findAll: async (): Promise<School[]> => {
    return schools;
  },

  find: async (id: string): Promise<School | undefined> => {
    return schools.find((t) => t.id === id);
  },

  create: async (title: string): Promise<School> => {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string');
    }

    const existingTodo = schools.find(
      (t) => t.title.toLowerCase() === title.trim().toLowerCase()
    );
    if (existingTodo) {
      throw new Error('A school with this title already exists');
    }

    const newTodo: School = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
    };
    schools.push(newTodo);
    return newTodo;
  },

  update: async (id: string, updates: Partial<School>): Promise<School> => {
    const todoIndex = schools.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      throw new Error('School not found');
    }

    const { title, completed } = updates;
    if (
      title !== undefined &&
      (typeof title !== 'string' || title.trim() === '')
    ) {
      throw new Error('Title must be a non-empty string');
    }

    const updatedTodo = { ...schools[todoIndex] };
    if (title !== undefined) {
      const existingTodo = schools.find(
        (t) =>
          t.id !== id && t.title.toLowerCase() === title.trim().toLowerCase()
      );
      if (existingTodo) {
        throw new Error('A school with this title already exists');
      }
      updatedTodo.title = title.trim();
    }
    if (completed !== undefined) updatedTodo.completed = Boolean(completed);

    schools[todoIndex] = updatedTodo;
    return updatedTodo;
  },

  remove: async (id: string): Promise<void> => {
    const todoIndex = schools.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      throw new Error('School not found');
    }
    schools.splice(todoIndex, 1);
  },
};
