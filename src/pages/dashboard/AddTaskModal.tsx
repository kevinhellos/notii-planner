import { useEffect, useRef, useState } from "react";
import { useAddNewTask } from "../../hooks/tasks/useAddNewTask";
import { useHistory, useLocation } from "react-router-dom";

interface AddTaskModalProps {
  refreshTaskButton: React.RefObject<HTMLButtonElement>;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ refreshTaskButton }) => {

    const location = useLocation();
    const page = useHistory();
    const modalState = new URLSearchParams(location.search).get("modal");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (modalState) {
            setModalOpen(true);
            taskInputRef?.current?.focus(); // Focus on task name everytime modal is opened
        }
    }, [modalState])

    function resetAddTask() {
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewTaskCategory("uncategorized");
        setHasError(false);
    }

    const addNewTask = useAddNewTask;

    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [newTaskDescription, setNewTaskDescription] = useState<string>("");
    const [newTaskCategory, setNewTaskCategory] = useState<string>("uncategorized");
    const [hasError, setHasError] = useState<boolean>(false);

    async function addNewTaskData() {
        if (String(newTaskTitle).trim() !== "" && String(newTaskDescription).trim() !== "") {
            try {
                const newTaskId = await addNewTask(newTaskTitle, newTaskDescription, newTaskCategory);
                if (newTaskId) {
                    resetAddTask();
                    setModalOpen(false); // Close the modal
                    page.push("/dashboard");
                    if (refreshTaskButton?.current) {
                        refreshTaskButton?.current.click();
                    }
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

    const taskInputRef = useRef<HTMLInputElement>(null);

    return (
        <dialog className="modal backdrop-blur-sm" open={modalOpen}>
            <div className="modal-box rounded-md p-10">
                <h3 className="mb-5 text-xl font-medium">Add a new task</h3>
                <label htmlFor="name" className="text-gray-500 text-sm">Task name</label>
                <input 
                    name="name" 
                    type="text" 
                    className="input w-full rounded-md focus:outline-gray-800 block bg-gray-50 mb-5 mt-2" 
                    placeholder="Task name" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    ref={taskInputRef}
                />
                
                <label htmlFor="description" className="text-gray-500 text-sm">Description</label>
                <textarea 
                    name="description" 
                    className="textarea w-full rounded-md focus:outline-gray-800 block bg-gray-50 mb-5 mt-2" 
                    placeholder="Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                ></textarea>

                <label htmlFor="category" className="text-gray-500 text-sm">Category</label>
                <select 
                    name="category"  
                    className="select w-full rounded-md focus:outline-gray-800 bg-gray-50 mt-2"
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    value={newTaskCategory}
                >
                    <option value={"uncategorized"}>Uncategorized</option>
                    <option value={"today"}>Today</option>
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
                        <span className="text-sm">Please ensure all fields are filled up to continue</span>
                    </div>
                }

                <div className="modal-action">
                    <form method="dialog">
                        <button 
                            className="btn btn-sm bg-white hover:bg-slate-50 rounded-md font-medium mr-2 shadow-none"
                            onClick={() => {
                                setHasError(false);
                                resetAddTask();
                                setModalOpen(false);
                                page.push("/dashboard");
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
    );
}
 
export default AddTaskModal;