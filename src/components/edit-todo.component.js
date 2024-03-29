import React, { Component } from 'react';
import axios from 'axios';
export default class EditTodo extends Component {

  constructor(props){
    super(props);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit =  this.onSubmit.bind(this);
    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }
onChangeTodoDescription(e){
  this.setState({
 todo_description: e.target.value
  });
}
onChangeTodoCompleted(e){
  this.setState({
    todo_completed: e.target.value
  });
}
onChangeTodoResponsible(e){
  this.setState({
    todo_responsible: e.target.value
  });
}
onChangeTodoPriority(e){
  this.setState({
    todo_priority: e.target.value
  });
}
onSubmit(e){
  e.preventDefault();
  const obj = {
    todo_description: this.state.todo_description,
    todo_responsible: this.state.todo_responsible,
    todo_priority: this.state.todo_priority,
    todo_completed: this.state.todo_completed
  }
  axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id,obj)
    .then(res=>{
      console.log(res.data);
    });

    this.props.history.push('/');
}
  componentDidMount(){
    axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          todo_description: response.data.todo_description,
          todo_responsible: response.data.todo_responsible,
          todo_priority: response.data.todo_priority,
          todo_completed: response.data.todo_completed
        })
      })
      .catch(function(err){
        console.log(err)
      })
  }
  render () {
    return (
            <div>
              <h2>Update de todo</h2>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label>DESCRIPTION</label>
                  <input type="text" className="form-control"
                   value={this.state.todo_description} 
                   onChange={this.onChangeTodoDescription}/>
                </div>
                <div className="form-group">
                <label>Responsible</label>
                  <input type="text" className="form-control"
                   value={this.state.todo_responsible} 
                   onChange={this.onChangeTodoResponsible}/>
                </div>
                <div className="form-group">
                 <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input"
                   name="priorityOptions" id="priorityLow" 
                   value="Low" 
                   checked={this.state.todo_priority==='Low'} 
                   onChange={this.onChangeTodoPriority} />
                  <label className="form-check-label">LOW</label>
                 </div>
                 <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" 
                  name="priorityOptions" id="priorityHigh" value="High" 
                  checked={this.state.todo_priority==='High'} 
                  onChange={this.onChangeTodoPriority} />
                  <label className="form-check-label">HIGH</label>
                 </div>
                 <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" 
                  name="priorityOptions" id="priorityMedium" 
                  value="Medium" checked={this.state.todo_priority==='Medium'}
                   onChange={this.onChangeTodoPriority} />
                  <label className="form-check-label">MEDIUM</label>
                 </div>
                <div className="form-check">
                  <input type="checkbox"
                        className="form-check-input"
                        id="completedCheckbox"
                        name="completedCheckbox"
                        onChange={this.onChangeTodoCompleted}
                        checked={this.state.todo_completed}
                        value={this.state.todo_completed}/>
                        <label className="form-check-label" htmlFor="completedCheckbox">
                          completed
                        </label>
                </div>
                <div classNmae="form-group">
                  <input type="submit" className="btn btn-primary" value="update todo"/>
                </div>
                </div>
              </form>
            </div>
         );
       }
   }