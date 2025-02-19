import TodoItem from "./TodoItem";
import todos from "./todos.json";

const TodoList = () => {
    return(
        <>
        <h3>Todo List</h3>
        <ul className="list-group">
            { todos.map((todo: { done: boolean; title: string; status: string; } | undefined) => {
                return(<TodoItem todo={todo}/>);   
                })}
        </ul><hr/>
        </>
    );
}
export default TodoList;
