import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Navbar = () => {
    return (
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
    );
}
 
export default Navbar;