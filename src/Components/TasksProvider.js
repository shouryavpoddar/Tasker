import React, {createContext, useEffect, useReducer, useState} from "react";

export const TaskContext = createContext()

export const ModalContext = createContext()

export const TasksContext = createContext()

const sortTasks = (task1, task2) => {
    if (task1.priority > task2.priority) {
        return -1;
    } else if (task1.priority < task2.priority) {
        return 1;
    } else {
        if(task1.firstName > task2.firstName) {
            return 1;
        } else if (task1.firstName < task2.firstName){
            return  -1;
        }
        else {
            return 0;
        }
    }

}

const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            const newTask = { ...action.task, key: Date.now() };
            console.log(newTask);
            return [...state, newTask].sort(sortTasks);
        case 'UPDATE_TASK':
            return state.map(task => task.key === action.task.key ? action.task : task)
                .sort(sortTasks);
        case "DELETE_TASK":
            return state.filter(task => task.key !== action.key);
        default:
            return state;
    }
};

export const TasksProvider = (props) => {

    useEffect(() => {
        if (!localStorage.getItem("fetchedData")){
            fetch("https://randomuser.me/api/?results=20")
                .then((res) => res.json())
                .then((res) => {
                    localStorage.setItem("fetchedData", JSON.stringify(res.results));
                });
        }
    }, []);

    const [tasks, dispatch] = useReducer(tasksReducer, [], (initial) => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : initial;
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TasksContext.Provider
            value={[
                tasks,
                function addTask(task) {
                    dispatch({ type: "ADD_TASK", task });
                },
                function updateTask(task) {
                    return dispatch({ type: "UPDATE_TASK", task });
                },
                function deleteTask(key) {
                    return dispatch({ type: "DELETE_TASK", key });
                },
            ]}
        >
            <ModalContext.Provider value={[modalIsOpen, setModalIsOpen]}>
                <TaskContext.Provider value={[editTask, setEditTask]}>
                    {props.children}
                </TaskContext.Provider>
            </ModalContext.Provider>
        </TasksContext.Provider>
    );
};