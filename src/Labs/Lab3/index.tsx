import PathParameters from "./PathParameters";
import Highlight from "./Highlight";
import Add from "./Add";
import Styles from "./Styles";
import Classes from "./Classes";
import DestructingImports from "./DestructingImports";
import Destructing from "./Destructing";
import Spreading from "./Spreading";
import TodoList from "./todos/TodoList";
import TodoItem from "./todos/TodoItem";
import House from "./House";
import JsonStringify from "./JsonStringify";
import FilterFunction from "./FilterFunction";
import FindIndex from "./FindIndex";
import FindFunction from "./FindFunction";
import MapFunction from "./MapFunction";
import ForLoops from "./ForLoops";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import SimpleArrays from "./SimpleArrays";
import TemplateLiterals from "./TemplateLiterals";
import ImpliedReturn from "./ImpliedReturn";
import ArrowFunctions from "./ArrowFunctions";
import LegacyFunctions from "./LegacyFunctions";
import ConditionalOutputInline from "./ConditionalOutputInLine";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import TernaryOperator from "./TernaryOperator";
import IfElse from "./IfElse";
import BooleanVariables from "./BooleanVariables";
import VariableTypes from "./VariableTypes";
import VariablesAndConstants from "./VariablesAndConstants";
import FunctionDestructing from "./FunctionDestructing";
import Square from "./Square";



export default function Lab3() {
    console.log('Hello World!')
    return(
        <div id="wd-lab3" className="container">
            <h3>Lab 3</h3>
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanVariables />
            <IfElse />
            <TernaryOperator />
            <ConditionalOutputIfElse />
            <ConditionalOutputInline />
            <LegacyFunctions />
            <ArrowFunctions />
            <ImpliedReturn />
            <TemplateLiterals />
            <SimpleArrays />
            <ArrayIndexAndLength />
            <AddingAndRemovingToFromArrays />
            <ForLoops />
            <MapFunction />
            <FindFunction />
            <FindIndex />
            <FilterFunction />
            <JsonStringify />
            <House />
            <TodoItem />
            <TodoList />
            <Spreading />
            <Destructing />
            <FunctionDestructing />
            <DestructingImports />
            <Classes />
            <Styles />
            <Add a={3} b={4} />
            <h4>Square of 4</h4>
            <Square>4</Square>
            <hr />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Suscipitratione eaque illo minus cum, saepe totam vel nihil
                repellat nemo explicabo excepturi consectetur. Modi omnis 
                minus sequi maiores, provident voluptates.
            </Highlight>
            <hr />
            <PathParameters />
            
        </div>
    );
}