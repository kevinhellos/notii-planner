import { useEffect, useRef, useState } from "react";
import Sidebar from "../../component/Sidebar";
import useGetAllTasks, { TaskProps } from "../../hooks/tasks/useGetAllTasks";
import useUpdateTask from "../../hooks/tasks/useUpdateTask";
import { useDeleteTask } from "../../hooks/tasks/useDeleteTask";
import { useHistory, useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/utils";
import Navbar from "../../component/shared/Navbar";
import AddTaskModal from "./AddTaskModal";

const Dashboard = () => {

    const updateTask = useUpdateTask;
    const deleteTask = useDeleteTask;

    const location = useLocation();
    const page = useHistory();

    const getAllTasks = useGetAllTasks;
    const [allTasks, setAllTasks] = useState<TaskProps[]>([]);
    async function getAllTasksData(customFilter?: string) {
        try {
            const tasks: TaskProps[] = await getAllTasks();
            if (customFilter) {
                setAllTasks(tasks.filter(task => task.category === customFilter));
            }
            else {
                setAllTasks(tasks);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const [filterApplied, setFilterApplied] = useState<string>("allTasks");

    useEffect(() => {
        const customFilter = new URLSearchParams(location.search).get("filter");
        if (customFilter !== null) {
            // fix the error below
            setFilterApplied(customFilter);
            getAllTasksData(customFilter);
            if (customFilter === "") {
                getAllTasksData();
            }
        }
        else {
            getAllTasksData();
        }
    }, []);
    

    const toggleTaskStatus = async (taskId: string, currentCategory: string) => {
        try {
            const newCategory = currentCategory !== "completed" ? "completed" : "uncategorized";
            await updateTask(taskId, newCategory);
            const updatedTasks = allTasks.map(task =>
                task.id === taskId ? { ...task, category: newCategory } : task
            );
            setAllTasks(updatedTasks);
        } catch (error) {
            console.error("Error updating task category: ", error);
        }
    };

    const refreshTaskButton = useRef<HTMLButtonElement>(null);
    const refreshAllTasks = () => {
        getAllTasksData();
    };
    
    return (
        <>
            <div className="flex justify-center min-h-screen">
                <div className="w-full">
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content px-3">
                            
                            <Navbar/>
                            
                            <div className="p-6 px-4 lg:px-10 mt-[-20px]">
                                <h1 className="text-[1.675rem] font-medium">
                                    {filterApplied == "allTasks" ? "All Tasks" : `${capitalizeFirstLetter(filterApplied)} Tasks`}
                                </h1>

                                <button className="btn btn-sm hover:bg-gray-100 btn-ghost shadow-xs border-gray-200 font-medium mt-3 rounded-md"
                                    onClick={() => page.push("/dashboard?modal=true")}
                                >
                                    <i className="fi fi-rr-plus text-xs mt-1"></i>
                                    Add task
                                </button>

                                <button className="btn btn-sm hover:bg-gray-100 btn-ghost shadow-xs font-medium mt-3 rounded-md ms-3 px-[0.55rem]"
                                    onClick={() => refreshAllTasks()}
                                    ref={refreshTaskButton}
                                >
                                    <i className="fi fi-rr-refresh text-xs mt-1"></i>
                                </button>
                                
                                <div className="mt-5">
                                    {allTasks.map((task, index) => (
                                        <div key={index} className="flex ml-[-25px]">
                                            
                                            <div className="dropdown">
                                                <div tabIndex={0} role="button" 
                                                    className="btn btn-sm mt-[-10px] mr-2 rounded-md bg-white border-none shadow-none px-[0.90rem] hover:bg-slate-100">
                                                    <i className="fas fa-ellipsis-vertical"></i>
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content rounded-lg z-[1] menu p-1 shadow bg-base-100 w-52">
                                                    <li>
                                                        <a className="hover:bg-gray-100 hover:text-red-600 p-2 px-3"
                                                            onClick={() => {
                                                                const confirmDeletion = window.confirm(`Delete ${task.name} ?`);
                                                                if (confirmDeletion) {
                                                                    deleteTask(task.id)
                                                                    .then(function(){
                                                                        getAllTasksData();
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <i className="fi fi-rs-trash mt-1 mr-2"></i>
                                                            Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <input type="checkbox" 
                                                defaultChecked={task.category == "completed" ? true : false}
                                                className={"checkbox rounded-full checkbox-md mr-3"}
                                                onClick={() => toggleTaskStatus(task.id, task.category)}
                                            /> 
                                            <span 
                                                className={`flex cursor-pointer mb-5 tooltip tooltip-bottom
                                                ${task.category == "completed" ? "line-through text-gray-400" :""}`} 
                                                data-tip={task.description}
                                            >
                                                {task.name} 
                                                {task.category === "today" && 
                                                    <div className="badge ms-3 mt-1 bg-yellow-400 border-none text-black text-xs">Due today</div>
                                                }
                                                {task.category === "important" && 
                                                    <div className="badge ms-3 mt-1 bg-red-500 border-none text-white text-xs">Important</div>
                                                }
                                            </span>
                                        </div>
                                    ))}

                                    {allTasks.length === 0 && <div className="text-gray-400">You have no {filterApplied == "allTasks" ? "tasks" : `${filterApplied} tasks`}</div>}
                                </div>

                            </div>

                        </div> 

                        <AddTaskModal
                            refreshTaskButton={refreshTaskButton}
                        />
                        
                        <Sidebar
                            isActive={filterApplied}
                            tasks={allTasks}
                        />

                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Dashboard;