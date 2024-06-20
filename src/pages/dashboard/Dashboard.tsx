import { useEffect, useRef, useState } from "react";
import Sidebar from "../../component/Sidebar";
import { useAddNewTask } from "../../hooks/tasks/useAddNewTask";
import useGetAllTasks, { TaskProps } from "../../hooks/tasks/useGetAllTasks";
import useUpdateTask from "../../hooks/tasks/useUpdateTask";
import { useDeleteTask } from "../../hooks/tasks/useDeleteTask";
import { useLocation } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {

    function capitalizeFirstLetter(str: string) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const addTaskModal = useRef<HTMLDialogElement>(null);

    const addNewTask = useAddNewTask;
    const updateTask = useUpdateTask;
    const deleteTask = useDeleteTask;

    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [newTaskDescription, setNewTaskDescription] = useState<string>("-"); // Since we can view task description yet, set default description to -
    const [newTaskCategory, setNewTaskCategory] = useState<string>("uncategorized");
    const [hasError, setHasError] = useState<boolean>(false);

    async function addNewTaskData() {
        if (String(newTaskTitle).trim() !== "" && String(newTaskDescription).trim() !== "") {
            try {
                const newTaskId = await addNewTask(newTaskTitle, newTaskDescription, newTaskCategory);
                if (newTaskId) {
                    setNewTaskTitle("");
                    setNewTaskDescription("");
                    setHasError(false);
                    addTaskModal?.current?.close();
                    getAllTasksData();
                }
            } catch (error: unknown) {
                console.error(error);
            }
        }
        else {
            setHasError(true);
            // toast.error("Please fill in all fields !");
            // alert("Please fill all the fields");
        }
    }

    const location = useLocation();

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
            // console.log("Custom filter exists..." + customFilter);
            setFilterApplied(customFilter);
            getAllTasksData(customFilter);
            if (customFilter === "") {
                getAllTasksData();
            }
        }
        else {
            // console.log("Custom filter DOES NOT EXISTS");
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
    
    return (
        <>
            <div className="flex justify-center min-h-screen ">
                <div className="w-full">
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content px-3">
                            
                            <div className="navbar bg-base-100">
                                <div className="mt-3 ml-[-11px]">
                                    <label 
                                        htmlFor="my-drawer-2" 
                                        className="btn btn-ghost drawer-button lg:hidden lg:float-start text-lg rounded-md hover:bg-slate-50 ml-5 shadow-none">
                                        <i className="fi fi-rr-sidebar mt-1"></i>
                                    </label>
                                </div>
                                <div className="flex-1 gap-2 justify-end">
                                    <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                        <img 
                                            alt="Avatar URL" 
                                            src={String(auth?.currentUser?.photoURL)} 
                                        />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-1 shadow menu menu-md dropdown-content bg-base-100 rounded-md w-52">
                                        <li>
                                            <a className="bg-white hover:bg-slate-50 rounded-xs flex text-red-600" onClick={() => {
                                                signOut(auth);
                                            }}>
                                                <i className="fi fi-rr-sign-out-alt mt-1 mr-2"></i>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="p-6 px-4 lg:px-10 mt-[-20px]">
                                <h1 className="text-[1.675rem] font-medium">
                                    {filterApplied == "allTasks" ? "All Tasks" : `${capitalizeFirstLetter(filterApplied)} Tasks`}
                                </h1>

                                <button className="btn btn-sm hover:bg-gray-100 btn-ghost shadow-xs border-gray-200 font-medium mt-3 rounded-md"
                                    onClick={() => {
                                        addTaskModal?.current?.showModal();
                                    }}
                                >
                                    <i className="fi fi-rr-plus text-xs mt-1"></i>
                                    Add task
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
                                                    {/* <li>
                                                        <a href="">
                                                            <i className="fi fi-rr-pencil mr-2"></i>
                                                            Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="hover:text-blue-600">
                                                            <i className="fi fi-rs-move-to-folder ml-[-2px] mr-2"></i>
                                                            Move
                                                        </a>
                                                    </li> */}
                                                    <li>
                                                        <a className="hover:bg-slate-50 hover:text-red-600 p-2 px-3"
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
                                                className={`flex cursor-pointer mb-5
                                                ${task.category == "completed" ? "line-through text-gray-400" :""}`} 
                                            >
                                                {task.name}
                                            </span>
                                        </div>
                                    ))}

                                    {allTasks.length === 0 && <div className="text-gray-400">You have no {filterApplied == "allTasks" ? "tasks" : `${filterApplied} tasks`}</div>}
                                </div>

                                <dialog ref={addTaskModal} className="modal">
                                    <div className="modal-box rounded-md p-10">
                                        <label htmlFor="name" className="text-gray-500 text-sm">Task name</label>
                                        <input 
                                            name="name" 
                                            type="text" 
                                            className="input w-full rounded-md focus:outline-gray-800 block bg-gray-50 mb-5" 
                                            placeholder="Task name" 
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                        />
                                        
                                        {/* <label htmlFor="description" className="text-gray-500 text-sm">Description</label>
                                        <textarea 
                                            name="description" 
                                            className="textarea w-full rounded-md focus:outline-gray-800 block bg-gray-50 mb-5" 
                                            placeholder="Description"
                                            value={newTaskDescription}
                                            onChange={(e) => setNewTaskDescription(e.target.value)}
                                        ></textarea> */}

                                        <label htmlFor="category" className="text-gray-500 text-sm">Category</label>
                                        <select 
                                            name="category"  
                                            className="select w-full rounded-md focus:outline-gray-800 bg-gray-50"
                                            onChange={(e) => setNewTaskCategory(e.target.value)}
                                        >
                                            <option value={"uncategorized"}>Uncategorized</option>
                                            <option value={"important"}>Important</option>
                                            <option value={"archived"}>Archived</option>
                                        </select>

                                        {hasError && 
                                            <div role="alert" className="alert bg-red-50 text-red-700 border-none py-3 rounded-md mt-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    className="stroke-current shrink-0 h-6 w-6" 
                                                    fill="none" viewBox="0 0 24 24">
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span>Please fill in all fields to continue</span>
                                            </div>
                                        }

                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button 
                                                    className="btn btn-sm bg-white hover:bg-slate-50 rounded-md font-medium mr-2 shadow-none"
                                                    onClick={() => {
                                                        setHasError(false);
                                                    }}
                                                    >
                                                        Cancel
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-sm btn-neutral rounded-md text-white font-medium"
                                                    onClick={addNewTaskData}
                                                    >
                                                    Add task
                                                </button>
                                            </form>
                                        </div>
                                        
                                    </div>
                                </dialog>

                            </div>

                        </div> 
                        
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