const express = require('express');
const cors = require('cors');
const { getConnection, connectToDB } = require('./connection');
const { getAlllecturers, addNewlecturer, deleteDesireLecturer, updateDesireLecturer } = require('./lecturerServiceLayer');
require('dotenv').config();

const app = express();

// RESTFUL API
app.use(cors()); // enable cross origin resources sharing
app.use(express.json()); // enable sending back responses as JSON
                         // and reciving data as JSON

async function main() {

    await connectToDB(
        process.env.DB_HOST,
        process.env.DB_USER,
        process.env.DB_DATABASE ,
        process.env.DB_PASSWORD
    );

    const connection = getConnection();

    app.get('/api/lecturers', async function(req,res){
        const lecturers = await getAlllecturers();
        res.json({
            'lecturers': lecturers
        })
    });

    app.post('/api/lecturers', async function(req,res){
        const { full_name, gender, email, phone_number, department, specialization, years_of_experience } = req.body;
        const results = await addNewlecturer(full_name, gender, email, phone_number, department, specialization, years_of_experience)
        
        if (results.success) {
            res.json({
                'new_lecturer_id': results.insertId
            })
        } else {
            res.json(400);
            res.json(results);
        }
      
   
    })

    app.delete('/api/lecturers/:lecturerId', async function(req,res){
        const {lecturerId} = req.params;
        const results = await deleteDesireLecturer(lecturerId);
        if (results.success) {
            res.status(200);
            res.json(results);
        } else {
            res.status(400);
            res.json(results);
        }
    })

    app.put('/api/lecturers/:lecturerId', async function(req,res){
        const {lecturerId} = req.params;
       
        const results = await updateDesireLecturer(lecturerId, {...req.body});
        if (results.success) {
            res.status(200);
            res.json(results);
        } else {
            res.status(400);
            res.json(results);
        }
      
    })

}

main();



app.listen(3000, function(){
    console.log("server has started");
})