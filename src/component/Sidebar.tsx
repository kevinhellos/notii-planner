import { TaskProps } from "../hooks/tasks/useGetAllTasks";

interface SidebarProps {
    tasks: TaskProps[];
    isActive: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isActive}) => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-72 min-h-full bg-gray-50 text-base-content">
                <div className="mb-7 px-5 flex">
                    <img 
                        src="/assets/imgs/note.png"
                        className="mr-2"
                        width={30}
                        height={30}
                        alt="Notii logo" 
                    />
                    <h1 className="text-2xl font-extrabold">Notii</h1>
                </div>
                <li className={`${isActive == "allTasks" ? "bg-gray-200 text-black" :"text-gray-500"} mb-2`}>
                    <a href="/dashboard"><i className="text-xs text-yellow-400 fas fa-circle mr-3"></i> All Tasks</a>
                </li>
                
                <li className={`${isActive == "important" ? "bg-gray-200 text-black" :"text-gray-500 hover:text-gray-800"} mb-2`}>
                    <a href="/dashboard?filter=important"><i className="text-xs text-red-500 fas fa-circle mr-3"></i> Important</a>
                </li>
                <li className={`${isActive == "archived" ? "bg-gray-200 text-black" :"text-gray-500 hover:text-gray-800"} mb-2`}>
                    <a href="/dashboard?filter=archived"><i className="text-xs text-gray-500 fas fa-circle mr-3"></i> Archived</a>
                </li>
                <li className={`${isActive == "completed" ? "bg-gray-200 text-black" :"text-gray-500 hover:text-gray-800"} mb-2`}>
                    <a href="/dashboard?filter=completed"><i className="text-xs text-green-500 fas fa-circle mr-3"></i> Completed</a>
                </li>                
            </ul>
        </div>
    );
}
 
export default Sidebar;