import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="hero min-h-screen bg-gray-50 overflow-x-hidden mt-[-10px]">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <div className="badge py-4 px-5 border-gray-200">
                        <span className="me-1 font-bold">100% free</span> and 
                        <a className="ms-1 hover:text-blue-600 underline" href="https://github.com/kevinhellos/notii-planner" target="_blank">open source</a>
                    </div>
                    <h1 className="join text-5xl font-extrabold mt-5">
                        <img src="/assets/imgs/note.png" className="-rotate-12 mr-5" width={50} alt="" />
                        Notii Planner
                    </h1>
                    <p className="py-6">
                        All-in-one planner app designed to help you stay organized, productive, and stress-free
                    </p>
                    <Link to="/login" className="btn bg-[#E64B3C] hover:bg-[#E64B3C] text-white font-medium rounded-full px-8">
                        Continue to dashboard
                    </Link>
                    <div className="mockup-browser border border-base-300 mt-7 shadow-xs">
                        <div className="mockup-browser-toolbar">
                            <div className="input border border-base-300">https://notii.site</div>
                        </div>
                        <div className="flex justify-center border-t border-base-300">
                            <img src="/assets/imgs/demo1.png" alt="Notii planner dashboard" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Landing;