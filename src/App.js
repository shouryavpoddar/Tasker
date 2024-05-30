import './App.css';
import React from "react";
import Form from "./Components/Form";
import { TasksProvider } from "./Components/TasksProvider";
import {TasksList} from "./Components/TasksList";

function App() {
    return (
        <TasksProvider>
            <div className="grid grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)] items-center overflow-x-auto shadow-md bg-blue-700 text-white py-7">
                <div></div>
                <div className="text-2xl">Tasker</div>
                <div className="ml-auto">
                    <Form />
                </div>
            </div>
            <table className="border-collapse w-full text-center">
                <colgroup>
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                </colgroup>
                <tbody>
                <tr>
                    <th className="border border-black">Task Name</th>
                    <th className="border border-black">Due Date</th>
                    <th className="border border-black">Status</th>
                    <th className="border border-black">Priority</th>
                    <th className="border border-black">Person</th>
                    <th className="border border-black">Actions</th>
                </tr>
                <TasksList/>
                </tbody>
            </table>
        </TasksProvider>
    );
}

export default App;
