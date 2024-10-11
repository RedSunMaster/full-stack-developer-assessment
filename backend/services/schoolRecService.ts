import { v4 as uuidv4 } from 'uuid';
import SchoolRecord from '../types/school.types';

let schoolRecords: SchoolRecord[] = [];

export const schoolRecService = {
  findAll: async (): Promise<SchoolRecord[]> => {
    return schoolRecords;
  },

  find: async (id: string): Promise<SchoolRecord | undefined> => {
    return schoolRecords.find((t) => t.id === id);
  },

  create: async (title: string): Promise<SchoolRecord> => {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string');
    }

    const existingSchoolRecord = schoolRecords.find(
      (t) => t.title.toLowerCase() === title.trim().toLowerCase()
    );
    if (existingSchoolRecord) {
      throw new Error('A school record with this title already exists');
    }

    const newSchoolRecord: SchoolRecord = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
    };
    schoolRecords.push(newSchoolRecord);
    return newSchoolRecord;
  },

  update: async (id: string, updates: Partial<SchoolRecord>): Promise<SchoolRecord> => {
    const schoolRecordIndex = schoolRecords.findIndex((t) => t.id === id);
    if (schoolRecordIndex === -1) {
      throw new Error('School record not found');
    }

    const { title, completed } = updates;
    if (
      title !== undefined &&
      (typeof title !== 'string' || title.trim() === '')
    ) {
      throw new Error('Title must be a non-empty string');
    }

    const updatedSchoolRecord = { ...schoolRecords[schoolRecordIndex] };

    if (title !== undefined) {
      const existingSchoolRecord = schoolRecords.find(
        (t) =>
          t.id !== id && t.title.toLowerCase() === title.trim().toLowerCase()
      );
      if (existingSchoolRecord) {
        throw new Error('A school record with this title already exists');
      }
      updatedSchoolRecord.title = title.trim();
    }
    if (completed !== undefined) updatedSchoolRecord.completed = Boolean(completed);

    schoolRecords[schoolRecordIndex] = updatedSchoolRecord;
    return updatedSchoolRecord;
  },

  remove: async (id: string): Promise<void> => {
    const schoolRecordIndex = schoolRecords.findIndex((t) => t.id === id);
    if (schoolRecordIndex === -1) {
      throw new Error('School record not found');
    }
    schoolRecords.splice(schoolRecordIndex, 1);
  },
};
