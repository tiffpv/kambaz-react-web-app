import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Lab3() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return(
        <div>
            <h2>Lab 3</h2>
            <ListGroup>
                {todos.map((todo: any) => (
                    <ListGroup.Item key={todo.id}>
                        {todo.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}