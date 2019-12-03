import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Todo = props => (
   <tr>
      <td className={props.todo.todo_completed ? 'completed' : ''} >{props.todo.todo_description}</td>
      <td  className={props.todo.todo_completed ? 'completed' : ''} >{props.todo.todo_responsible}</td>
      <td  className={props.todo.todo_completed ? 'completed' : ''} >{props.todo.todo_priority}</td>
      <td>
          <Link to={"/edit/" + props.todo._id} >edit</Link>
      </td>
   </tr>
)
export default class TodosList extends Component {
    constructor(props) {
      super(props)
      this.state = {todos: []};
    }
  componentDidMount() {
       axios.get('http://localhost:4000/todos')
       .then(response => {
          this.setState({todos: response.data});
       })
       .catch(function (error){
          console.log(error);
       })
       }
       componentDidUpdate(){
        axios.get('http://localhost:4000/todos')
        .then(response => {
           this.setState({todos: response.data});
        })
        .catch(function (error){
           console.log(error);
        })
       }
       todosList() {
          return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />
          })
       }
     render() {
         return (
                 <div>
                  <h3> Todo List </h3>
                  <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.todosList()}
                    </tbody>
                  </table>
                </div>
         );
     }
}
