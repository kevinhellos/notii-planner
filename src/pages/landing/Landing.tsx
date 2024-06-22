import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="hero min-h-screen bg-gray-50 overflow-x-hidden mt-[-10px]">
            <div className="hero-content text-center flex flex-col items-center">
                <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="badge py-4 px-5 border-gray-200 flex justify-center items-center mx-auto">
                        <span className="me-1 font-bold text-[#E64B3C]">100% free</span> and
                        <a className="ms-1 hover:text-blue-600 underline" 
                            href="https://github.com/kevinhellos/notii-planner" 
                            target="_blank" rel="noopener noreferrer">
                                open source
                        </a>
                    </div>
                    <h1 className="join text-3xl lg:text-5xl font-extrabold mt-5 flex items-center justify-center">
                        <img src="/assets/imgs/note.png" className="-rotate-12 mr-2 md:mr-5" width={40} alt="" />
                        Notii Planner
                    </h1>
                    <p className="py-6 text-base md:text-lg lg:text-xl">
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
                            <img src="/assets/imgs/demo1.png" alt="Notii planner dashboard" className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;