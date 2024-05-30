import React, {useContext, useState, useEffect} from "react";
import {ModalContext, TaskContext, TasksContext} from "./TasksProvider";

function Tasks({taskKey, firstName, dueDate, completed, priority, selectedPerson}) {
    const [complete, setComplete] = useState(completed);
    const [task, setTask] = useContext(TaskContext);
    const [openModal, setOpenModal] = useContext(ModalContext);
    const [tasks, addTask, updateTask, deleteTask] = useContext(TasksContext);

    useEffect(() => {
        setComplete(completed);
    }, [completed]);


    return (
        <tr>
            <td onClick={() => {
                setComplete(!complete);
            }} className="border border-black">
                {firstName}
            </td>
            <td className="border border-black">
                {dueDate}
            </td>
            <td
                className={`border border-black ${complete ? "text-green-500" : "text-red-500"}`}
            >
                {complete ? 'done' : 'pending'}
            </td>
            <td className="border border-black">
                {priority}
            </td>
            <td className="border border-black">
                <div
                    className="flex justify-between items-center border-gray-300 py-2"
                >
                    {selectedPerson && <div className="flex items-center">
                        <img
                            src={selectedPerson.picture.large}
                            alt={selectedPerson.name.first}
                            className="w-12 h-12 mr-3"
                        />
                        <div className="flex flex-col">
                            <strong
                                className="ml-2">{selectedPerson.name.first} {selectedPerson.name.last}</strong>
                            <span className="text-slate-500 text-sm font-medium">
                                    {selectedPerson.location.city}, {selectedPerson.location.state}, {selectedPerson.location.country}
                                </span>
                        </div>
                    </div>}
                </div>
            </td>
            <td className="border border-black col-auto">
                <button type={"button"} onClick={() => {
                    setTask({key: taskKey, firstName, dueDate, complete, priority, selectedPerson});
                    setOpenModal(true)
                }}
                        className=" shadow-2xl border-black bg-yellow-500 py-2 px-2 ml-2 rounded-xl">Edit
                </button>
                <button type={"button"} onClick={() => {
                    deleteTask(taskKey)
                }}
                        className=" shadow-2xl border-black bg-red-500 py-2 px-2 ml-2 rounded-xl">Delete
                </button>
            </td>
        </tr>
    );
}

export default Tasks;
