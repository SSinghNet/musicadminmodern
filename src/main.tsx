import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Albums from "./routes/album/index.tsx";
import Error from "./routes/Error.tsx";
import AlbumPage from "./routes/album/item.tsx";
import Artists from "./routes/artist/index.tsx";
import Tags from "./routes/tag/index.tsx";
import AlbumNew from "./routes/album/new.tsx";
import ArtistPage from "./routes/artist/item.tsx";
import TagPage from "./routes/tag/item.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/album",
                element: <Albums />,
            },
            {
                path: "/album/new",
                element: <AlbumNew />,
            },
            {
                path: "/album/:albumId",
                element: <AlbumPage />
            },
            {
                path: "/artist",
                element: <Artists />,
            },
            {
                path: "/artist/:artistId",
                element: <ArtistPage />,
            },
            {
                path: "/tag",
                element: <Tags />,
            },
            {
                path: "/tag/:tagId",
                element: <TagPage />,
            }
        ]
    },

]);

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </GoogleOAuthProvider>,
);
