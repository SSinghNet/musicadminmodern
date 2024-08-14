import { useOutlet } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Sidebar from "../components/elements/Sidebar";
import { useEffect, useState } from "react";
import Loading from "../components/elements/Loading";
import Header from "../components/elements/Header";

export default function App() {
    const outlet = useOutlet();
    
    const [validToken, setValidToken] = useState<boolean | null>(null);

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
            setValidToken(false);
            return;
        }
        handleAuth(access_token);
    }, [validToken]);

    if (validToken === false) {
        return <LoginForm />
    }

    if (validToken === null) {
        return <>
            <Sidebar />
            <div className={"py-6 px-8 md:px-16 sm:ml-80"}>
                <Loading />
            </div>
        </>;
    }

    const header = <Header
        title="Home"
    />;

    return (
        <>
            <Sidebar />
            <div className={"py-6 px-8 md:px-16 sm:ml-80"}>
                {outlet || header}
            </div>
        </>
    );
}


