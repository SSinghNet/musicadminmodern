import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import SidebarElement from "./SidebarElement";

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
            <aside className={"bg-black fixed top-0 left-0 w-80 h-screen transition ease-linear duration-150 md:opacity-100 md:visible " + (open ? "opacity-100 visible z-10" : "opacity-0 invisible z-0")}>
                <div className="h-full text-right p-6 pl-0">
                    <h1 className="text-primary text-2xl font-semibold pt-5">
                        <Link to="/">
                            SSingh.Net Music
                        </Link>
                    </h1>
                    <ul className="text-off-white uppercase font-light text-lg">
                        <SidebarElement
                            link="/album"
                            content="Albums"
                            active={location.pathname.includes("album")}
                        />
                        <SidebarElement
                            link="/artist"
                            content="Artists"
                            active={location.pathname.includes("artist")}
                        />
                        <SidebarElement
                            link="/tag"
                            content="Tags"
                            active={location.pathname.includes("tag")}
                        />
                    </ul>
                    <Button
                        onClick={logout}
                        type="secondary"
                        content="Logout"
                        className="fixed bottom-10 left-[14rem]"
                    />
                </div>
            </aside>
        </>
    );
}