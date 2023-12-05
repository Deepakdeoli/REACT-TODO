import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class ToDo extends Component {
    constructor(props) {
      super(props);
  

      this.state = {
        userInput: "",
        list: [],
        filter: "all", 
      };
    }

  // to Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // to Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),

        value: this.state.userInput,

        completed: false,
      };

      // here is Update list
      const list = [...this.state.list];
      list.push(userInput);

      // here is reset state
      this.setState({
        list,
        userInput: "",
      });
    }
  }

  // here is Function to delete item from list using id to delete
  deleteItem(key) {
    const list = [...this.state.list];

    // to Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    this.setState({
      list: updateList,
    });
  }

  //here is the  Function to edit item in the list
  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  toggleCompletion = (index) => {
    let updatedTodos = [...this.state.list];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    this.setState({
      list: updatedTodos,
    });
  };

  //  filter change
  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  // filter tasks based on the selected filter
  filterTasks = () => {
    const { list, filter } = this.state;
    switch (filter) {
      case "complete":
        return list.filter((item) => item.completed);
      case "pending":
        return list.filter((item) => !item.completed);
      default:
        return list;
    }
  };

  render() {
    const filteredList = this.filterTasks();

    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
              <FormControl
                as="select"
                onChange={this.handleFilterChange}
                value={this.state.filter}
              >
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
              </FormControl>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2"
                  onClick={() => this.addItem()}
                >
                  ADD
                </Button>
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            
            
            <ListGroup>
             
              {filteredList.map((item, index) => {
                return (
                  <div key={index}>
                    <ListGroup.Item
                      variant={item.completed ? "success" : "dark"}
                      action
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => this.toggleCompletion(index)}
                          style={{ marginRight: "10px" }}
                        />
                        {item.value}
                      </div>
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="light"
                          onClick={() => this.editItem(index)}
                        >
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ToDo;