import {getSchoolRecords_C, getSchoolRecord_C, addSchoolRecord_C, updateSchoolRecord_C, deleteSchoolRecord_C} from "../controllers/schoolRecords.controller";

module.exports = app => {
    const router = require("express").Router();

    router.get('/get-schoolRecords', getSchoolRecords_C);
    router.get('/get-schoolRecords/:id', getSchoolRecord_C);

    router.post('/add-schoolRecord', addSchoolRecord_C);

    //Using PATCH instead of PUT since might only be updating partial resource
    router.patch('/update-schoolRecord/:id', updateSchoolRecord_C);

    router.delete('/delete-schoolRecord/:id', deleteSchoolRecord_C);

    app.use('/api', router);
};