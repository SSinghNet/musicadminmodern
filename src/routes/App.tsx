import { Outlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Sidebar from "../components/elements/Sidebar";
import { useEffect, useState } from "react";

export default function App() {
    const [validToken, setValidToken] = useState(false);

    const handleAuth = async (access_token: string) => {
        return await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json'
            }
        }).then(async (res) => {
            setValidToken((await res.json())["email"] === import.meta.env.VITE_EMAIL);
        });
    };

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (!access_token) {
            return;
        }
        handleAuth(access_token);
    }, [validToken]);

    if (!validToken) {
        return <LoginForm />
    }

    return (
        <>
            <Sidebar />
            <div className={"py-6 px-8 md:px-16 sm:ml-80"}>
                <Outlet />
            </div>
        </>
    );
}


