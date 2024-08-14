import { useRouteError } from "react-router-dom";

export default function Error() {

    const error = useRouteError() as { statusText: string, message: string };
    return (
        <div className="flex justify-center align-middle h-[100vh] bg-black">
            <div className="my-auto grid grid-cols-1 w-4/12">
                <div className="text-xl text-off-white mb-4 text-center">
                    <h1>{error.statusText || error.message}</h1>
                </div>
            </div>
        </div>
    );
}