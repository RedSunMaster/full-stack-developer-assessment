import express from 'express';
import { schoolRecService } from '../services/schoolRecService';


export const getSchoolRecords_C = async (req: express.Request, res: express.Response) => {
  const schoolRecords = await schoolRecService.findAll();
  res.json(schoolRecords);
};

export const getSchoolRecord_C = async (req: express.Request, res: express.Response) => {
  //Extract specific record ID from Request
  const recordID = req.params.id;

  try {
    const schoolRecord = await schoolRecService.find(recordID);
    if (!schoolRecord) {
      throw new Error('School Record not found');
    }
    res.json(schoolRecord);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export const addSchoolRecord_C = async (req: express.Request, res: express.Response) => {
  
  //Extract title from Request
  const recordTitle = req.body.title;

  try {
    const newSchoolRecord = await schoolRecService.create(recordTitle);
    res.status(201).json(newSchoolRecord);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateSchoolRecord_C = async (req: express.Request, res: express.Response) => {

  //Extract ID and updates from Request
  const recordID = req.params.id
  const recordUpdates = req.body

  try {
    const updatedSchoolRecord = await schoolRecService.update(recordID, recordUpdates);
    res.json(updatedSchoolRecord);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'School Record not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteSchoolRecord_C = async (req: express.Request, res: express.Response) => {

  //Extract specific record ID from Request
  const recordID = req.params.id;

  try {
    await schoolRecService.remove(recordID);
    res.status(200).json({ message: 'School Record deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(404).json({ error: 'An unknown error occurred' });
    }
  }
};


module.exports = {getSchoolRecords_C, getSchoolRecord_C, addSchoolRecord_C, updateSchoolRecord_C, deleteSchoolRecord_C};