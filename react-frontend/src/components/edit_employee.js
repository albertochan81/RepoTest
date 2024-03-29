import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";
import { withRouter } from '../common/with-router';

//

import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";


class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);

    this.setEmployeeTask = this.setEmployeeTask.bind(this);
  

    this.state = {
      currentEmployee: {
        id: null,
        first_name: "",
        last_name: "",
        department: "",
        
      },
      tasks: [],
      currentTask: {
        id:null,
        description:"",
        priority_level:"",
        employeeId: null,
      },
      currentTaskIndex: -1,
      currentTaskIndex2: -1,
      searchDescription: "",

      message: ""
    };
    
  }

  

  componentDidMount() {
    this.getEmployee(this.props.router.params.id);
    this.getTask();
  }


  getTask() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeFirstName(e) {
    const first_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          first_name: first_name
        }
      };
    });
  }
  onChangeLastName(e) {
    const last_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEmployee: {
          ...prevState.currentEmployee,
          last_name: last_name
        }
      };
    });
  }

  onChangeDepartment(e) {
    const department = e.target.value;
    
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        department: department
      }
    }));
  }

  getEmployee(id) {
    EmployeeDataService.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  updateEmployee() {
    EmployeeDataService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Employee was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEmployee() {    
    EmployeeDataService.delete(this.state.currentEmployee.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/employees');
      })
      .catch(e => {
        console.log(e);
      });
  }

  setEmployeeTask(e){
    var data = {
      id: this.state.currentTask.id,
      description: this.state.currentTask.description,
      priority_level: this.state.currentTask.priority_level,
      employeeId: e
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            employeeId: e
          }
        }));
        console.log(response.data);
        this.setState({
          message: "Employee Task was updated successfully!"
      });
    })
      .catch(e => {
        console.log(e);
      });

  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentTaskIndex: index
    });
  }
  setActiveTask2(task, index) {
    this.setState({
      currentTask: task,
      currentTaskIndex2: index
    });
  }

  render() {
    const { currentEmployee ,tasks, currentTaskIndex, currentTaskIndex2, currentTask } = this.state;  

    return (
      <div>
        {currentEmployee ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="first_name">
                  <strong>First Name</strong>
                  </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  value={currentEmployee.first_name}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">
                  <strong>Last Name</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  value={currentEmployee.last_name}
                  onChange={this.onChangeLastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  <strong>Department</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={currentEmployee.department}
                  onChange={this.onChangeDepartment}
                />
              </div>

              <div className="col-md-6">

                <label>
                  <strong>Tasks:</strong>
                </label>
                { tasks.filter(task => task.employeeId===currentEmployee.id).map((task, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentTaskIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTask(task, index)}
                        key={index}
                      >
                        
                        {tasks.length === 0 ? (<div><p>{"No data to display"}</p></div>):(task.description)}
                      </li>
                    ))}

              </div>
            </form>
            <div className="col-md-6"> 
            <br></br>
            <strong>Unassigned tasks:</strong>

            <ul className="list-group">
            {tasks.filter(task => task.employeeId===null).map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentTaskIndex2 ? "active" : "")
                  }
                  onClick={() => this.setActiveTask2(task, index)}
                  key={index}
                >
                  
                  {tasks.length === 0 ? (<div><p>{"No data to display"}</p></div>):(task.description)}
                </li>
              ))}
              </ul>
          </div>
          

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEmployee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employee</p>
          </div>
        )}

          <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Task:</h4>
              <div>
                {currentTask.description}
              </div>

              {currentTask.employeeId !== currentEmployee.id ? (
              <button
              className="badge badge-primary mr-2"
              onClick={() =>this.setEmployeeTask(currentEmployee.id)}
            >
             Assign
            </button>
            ) : (
              <button
                className="badge badge-secondary mr-2"
                onClick={() => this.setEmployeeTask(null)}
              >
                Unassign
              </button>
            )
            }
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Task </p>
            </div>
          )}
           <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-outline-info"
              >
                Go to task
              </Link>
        </div>

      </div>
    );
  }
}

export default withRouter(Employee);