import {getSchools_C, getSchool_C, addSchool_C, updateSchool_C, deleteSchool_C} from "../controllers/schools.controller";

module.exports = app => {
    const router = require("express").Router();

    router.get('/get-schools', getSchools_C)
    router.get('/get-school', getSchool_C)
    router.post('/add-school', addSchool_C);
    router.patch('/update-school', updateSchool_C);
    router.delete('/update-school', deleteSchool_C);

    app.use('/api', router);
};