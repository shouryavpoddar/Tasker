import React, { useState, useEffect, useContext } from "react";
import AssignPeopleModal from "./AssignPeopleModal";
import { ModalContext, editTaskContext, TasksContext } from "./TasksProvider";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Form = () => {
    const data = JSON.parse(localStorage.getItem("fetchedData"));
    const [openModal, setOpenModal] = useContext(ModalContext);
    const [task, setTask] = useContext(editTaskContext);
    const [tasks, addTask, updateTask] = useContext(TasksContext);

    const [formData, setFormData] = useState(() => {
        if (task) {
            return {
                key: task.key,
                firstName: task.firstName,
                dueDate: task.dueDate,
                complete: task.complete,
                priority: task.priority,
                selectedPerson: task.selectedPerson,
            };
        } else {
            return {
                key: null,
                firstName: "",
                dueDate: "",
                complete: false,
                priority: 0,
                selectedPerson: null,
            };
        }
    });

    useEffect(() => {
        if (task) {
            setFormData({
                key: task.key,
                firstName: task.firstName,
                dueDate: task.dueDate,
                complete: task.complete,
                priority: task.priority,
                selectedPerson: task.selectedPerson,
            });
        } else {
            resetForm();
        }
    }, [task]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const submit = (event) => {
        event.preventDefault();
        if (formData.key) {
            updateTask(formData); // Update existing task
        } else {
            addTask(formData); // Add new task
        }
        resetForm();
        setOpenModal(false);
    };

    const selectPerson = (person) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedPerson: person,
        }));
    };

    const resetForm = () => {
        setFormData({
            key: null,
            firstName: "",
            dueDate: "",
            complete: false,
            priority: 0,
            selectedPerson: null,
        });
    };

    const { firstName, dueDate, complete, priority } = formData;

    return (
        <>
            <button
                className="py-3 px-7 bg-blue-500 mr-3 rounded-md shadow-2xl"
                onClick={() => setOpenModal(true)}
            >
                Add New Task
            </button>
            <Modal
                isOpen={openModal}
                onRequestClose={() => {
                    setOpenModal(false);
                    setTask(null);
                }}
                className="bg-gray-50 max-w-sm flex items-center justify-center ml-auto mr-auto mt-32 rounded-2xl"
            >
                <div className="max-w-sm mx-auto">
                    <form onSubmit={submit}>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Task Name
                            </label>
                            <input
                                value={firstName}
                                name="firstName"
                                type="text"
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Due Date
                            </label>
                            <input
                                value={dueDate}
                                name="dueDate"
                                type="date"
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Priority
                            </label>
                            <input
                                value={priority}
                                name="priority"
                                type="number"
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5 mr-1">
                                <input
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                    checked={complete}
                                    name="complete"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                is Complete
                            </label>
                        </div>
                        <AssignPeopleModal
                            selectPerson={selectPerson}
                            selectedPerson={formData.selectedPerson}
                            data={data}
                        />
                        <button
                            type="submit"
                            className="w-full border-black bg-green-500 py-2 px-4 mr-10 mb-2 rounded-xl"
                        >
                            {formData.key ? "Update Task" : "Add Task"}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Form;
