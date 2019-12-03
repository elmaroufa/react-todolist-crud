const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRoutes = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json())
let Todo = require('./todo.model')
const PORT = 4000;
mongoose.connect('mongodb://127.0.0.1:27017/todos',{useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open',function(){
    console.log("Connection avec mongodb reussi")
});
todoRoutes.route('/').get(function(req,res){
      Todo.find(function(err,todos){
           if(err){
                console.log(err);
           }else{
               res.json(todos)
           }
      });
});
todoRoutes.route('/:id').get(function(req,res){
  let id = req.params.id;
     Todo.findById(id,function(err,todo){
         if(!todo)
         {
             res.json("PAS DE TODO TROUVER")
         }
         else{
            res.json(todo);
         }
      });
});
todoRoutes.route('/add').post(function(req,res){
    let todo = new Todo(req.body);
    console.log(todo)
    todo.save()
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(400).send('echec ajout de new todo')

        });
});
todoRoutes.route('/update/:id').post(function(req,res){
    Todo.findById(req.params.id,function(err,todo){
        if(!todo)
            res.status(404).send('data is not found');
        else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Updates not possible");
            });
        }
    })
})
app.use('/todos',todoRoutes);
app.listen(PORT, function(){
    console.log('Servwr in renning in PORT :' + PORT)
})