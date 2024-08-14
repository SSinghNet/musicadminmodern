import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const navigate = useNavigate();
    const logout = () => {
        googleLogout();
        localStorage.removeItem("access_token");
        navigate(0);
    };

    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => { setOpen(!open) }} className="fixed top-3 left-3 z-20 drop-shadow-md p-2 bg-primary text-sm text-off-white rounded-lg md:invisible">
                <svg width="25px" height="25px" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12.32H22" stroke="#f0f0f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 18.32H22" stroke="#f0f0f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 6.32001H22" stroke="#f0f0f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <aside className={"bg-black fixed top-0 left-0 w-80 h-screen transition ease-linear duration-150 md:opacity-100 " + (open ? "opacity-100 z-10" : "opacity-0 z-0")}>
                <div className="h-full text-right p-6 pl-0">
                    <h1 className="text-primary text-2xl font-semibold pt-5">
                        <Link to="/">
                            SSingh.Net Music
                        </Link>
                    </h1>
                    <ul className="text-off-white uppercase font-light text-lg">
                        <li className="my-16">
                            <Link to="/album">
                                Albums
                                <span className={
                                    "ml-6 py-2 px-[0.1rem] rounded-sm h-full " +
                                    (location.pathname.includes("album") ? "bg-primary" : "bg-white")
                                }></span>
                            </Link>

                        </li>
                        <li className="my-16">
                            <Link to="/artist">
                                Artists
                                <span className={
                                    "ml-6 py-2 px-[0.1rem] rounded-sm h-full " +
                                    (location.pathname.includes("artist") ? "bg-primary" : "bg-white")
                                }></span>
                            </Link>
                        </li>
                        <li className="my-16">
                            <Link to="/tag">
                                Tags
                                <span className={
                                    "ml-6 py-2 px-[0.1rem] rounded-sm h-full " +
                                    (location.pathname.includes("tag") ? "bg-primary" : "bg-white")
                                }></span>
                            </Link>
                        </li>
                    </ul>
                    <button onClick={logout} className="font-light text-md text-primary fixed bottom-10 left-[15rem]">Logout</button>
                </div>
            </aside>
        </>
    );
}