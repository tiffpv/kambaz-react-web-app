import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({todo} :
    {
        todo: { id: string; title: string };
    }) {
    const dispatch = useDispatch();
    return(
        <ListGroup.Item key={todo.id}>
            {todo.title}
            <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"
              className="mx-2"> Edit </Button>
            <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"
              className="btn btn-danger"> Delete </Button>
        </ListGroup.Item>
    );
}
