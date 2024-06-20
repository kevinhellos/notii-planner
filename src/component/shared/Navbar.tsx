import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";

const Navbar = () => {

    // const location = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    function signOutUser() {
        try {
            signOut(auth);
        }
        catch (error) {
            console.error(`Error signing out user\n${error}`);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } 
            else {
                setIsLoggedIn(false);
                // location.push("/login");
            }
        });
    },[]);

    return (
        <div className="flex justify-center">
            <div className="w-full navbar bg-gray-50 px-5">
                <div className="flex-1">
                    <Link to="/" className="text-2xl px-0 float-start font-bold left-0 flex tracking-wide">
                        <img
                            src="/assets/imgs/daylist.png"
                            width={30}
                            alt="Lemon"
                            className="mr-3"
                        />
                        {import.meta.env.VITE_APP_NAME}
                    </Link>
                </div>

                {isLoggedIn && 
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User avatar" 
                                        src={auth?.currentUser?.photoURL || ""} 
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-xl w-56">
                                <li>
                                    <Link to="/dashboard" className="p-2 px-3 text-gray-500">
                                        <i className="fi fi-rr-home mt-1"></i>
                                        {/* {auth?.currentUser?.displayName || ""} */}
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <a className="p-2 px-3 text-gray-500 hover:text-red-600" 
                                        onClick={signOutUser}
                                    >
                                        <i className="fi fi-rr-sign-out-alt mt-1"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                }

                {!isLoggedIn && 
                    <div className="flex-none gap-2">
                        <Link to="/login" className="btn bg-[#2B6FFF] hover:bg-[#2B6FFF] text-white">
                            Login
                        </Link>
                    </div>
                }

            </div>
        </div>
    );
}

export default Navbar;