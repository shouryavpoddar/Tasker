import {useContext} from "react";
import {TasksContext} from "./TasksProvider";
import Tasks from "./Tasks";

export const TasksList = () => {
    const [tasks] = useContext(TasksContext);

    return(
        tasks.map(task => <Tasks key = {task.key}
                                 taskKey={task.key}
                                 firstName={task.firstName}
                                 dueDate={task.dueDate}
                                 completed={task.complete}
                                 priority={task.priority}
                                 selectedPerson={task.selectedPerson}
        />)
    )
}