
import { useEffect } from "react";
import { useSignInWithGoogle } from "../../hooks/login/useSignInWithGoogle";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const Login = () => {

    // const responsive = "sm:mt-0 md:mt-20 xl:mt-28";
    const signInWithGoogle = useSignInWithGoogle;
    
    const location = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? location.push("/dashboard") : location.push("/login");
        });
    },[]);

    return (
        <div className="flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-lg mt-[25vh]">
                <div className="card-body p-10">
                    <img 
                        src="/assets/imgs/note.png" 
                        width={55} 
                        alt="Notii icon" 
                        className="mx-auto"
                    />
                    <h2 className="text-xl font-light mb-2 text-center">
                       Welcome to <span className="font-bold">{import.meta.env.VITE_APP_NAME}</span>
                    </h2>

                    <p className="mb-5 text-center text-md">
                        Please sign in to continue
                    </p>

                    <div className="card-actions justify-end">
                        <button 
                            type="button" 
                            className="btn w-full btn-ghost border-gray-200 hover:bg-gray-100 font-medium" 
                            onClick={signInWithGoogle}
                        >
                            <img 
                                src="/assets/imgs/google.png" 
                                width={20}
                                height={20}
                                alt="Google icon" 
                            />
                            Continue with Google
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;