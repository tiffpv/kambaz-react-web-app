import { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((_, i) => i !== index));
    };
    return(
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button onClick={addElement}
                className="btn btn-success">Add Element</button><hr/>
            <ul>
                {array.map((item, index) => (
                <div key={index}> {item} 
                    <button onClick={() => deleteElement(index)} 
                        className="btn btn-danger mx-2">Delete</button><hr/>
                </div>))}
            </ul>
            <hr/>
        </div>
    );
}