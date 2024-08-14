import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            localStorage.setItem("access_token", codeResponse.access_token);
            navigate(0);
        },
        onError: (error) => console.log("Login Failed:", error)
    });


    const error = (
        <>
            {localStorage.getItem("access_token") != null ? "You are not allowed to access this application." : ""}
        </>
    );

    return (
        <div className="flex justify-center align-middle h-[100vh] bg-black">
            <div className="my-auto grid grid-cols-1 w-4/12">
                <div className="text-xl text-off-white mb-4 text-center">
                    {error}
                </div>
                <button onClick={() => { login() }} className="drop-shadow-2xl text-3xl p-6 rounded-lg bg-primary text-off-white justify-center my-auto"> Sign In </button>
            </div>
            

        </div>
    );
}