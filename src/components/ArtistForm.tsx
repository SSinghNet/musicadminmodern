import { Link, useNavigate } from "react-router-dom";
import { Album, Artist } from "../config/site";
import Header from "./Header";
import { useState } from "react";
import AlbumCard from "./AlbumCard";
import Button from "./Button";

export default function ArtistForm({ artist }: { artist: Artist }) {
    const [art, setArt] = useState(artist);

    const uploadImage = async (image: string) => {
        let key = "";
        await fetch("https://music.ssingh.net/img", {
            method: "POST",
            body: JSON.stringify({
                "key": Date.now().toString(),
                "url": image
            }),
            headers: {
                "Token": `${import.meta.env.VITE_TOKEN}`,
                "Content-Type": "application/json"
            },
        }).then(async (response) => {
            key = (await response.text()).replace("Success: ", "");
        });

        return key;
    }

    const navigate = useNavigate();
    const handleSave = async () => {
        const newArt = {} as { name: string, image: string };
        if (art.name !== artist.name) {
            newArt.name = art.name;
        }
        if (art.image !== artist.image) {
            newArt.image = art.image;
        }
        if (Object.keys(newArt).length !== 0) {
            if (newArt.image) {
                newArt.image = await uploadImage(newArt.image).then((res) => {
                    return "https://music.ssingh.net/img?key=" + res;
                });
            }

            fetch(`https://music.ssingh.net/artist/${art.id}`, {
                method: "PUT",
                headers: {
                    "Token": `${import.meta.env.VITE_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newArt)
            }).then(() => {
                alert("Changes saved.");
                navigate("/artist");
            });
            localStorage.removeItem("artists");
        } else {
            alert("No changes made.");
            navigate("/artist");
        }
    };


    const header = <Header
        title={
            <Link to="/artist">&lt; Artists </Link>
        }
        children={[
            <Button
                onClick={handleSave}
                content="Save"
                type="primary"
            />,
        ]} />;

    const albums = artist.albums?.map((album: Album) => <AlbumCard key={album.id} album={album} />);
    return (
        <>
            {header}
            <div className="w-full justify-center text-center border-1 bg-white flex rounded-lg">
                <div className="bg-slate-300 relative border-r-8 border-primary w-5/12">
                    <div className={"aspect-square bg-black"}>
                        <img src={art.image} alt={`${art.name} Cover`} className={"w-full h-full"} />
                    </div>
                    <div className="absolute bottom-0 bg-black bg-opacity-80 text-off-white w-full p-3">
                        <a href={`https://music.ssingh.net/artist/${art.id}`} target="_blank">
                            <h1 className={"text-xl font-semibold my-1"}>{art.name}</h1>
                        </a>
                        <br />
                    </div>
                </div>
                <div className="grid grid-cols-2 w-7/12 p-7 gap-4">
                    <div className="relative">
                        <label htmlFor="name" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">name:</label>
                        <textarea className="focus:ring-primary focus:border-primary bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={art.name} name="name" onChange={(e) => { setArt({ ...art, name: e.target.value }); }} />
                    </div>
                    <div className="relative">
                        <label htmlFor="image" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">image:</label>
                        <textarea className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={art.image} name="image" onChange={(e) => { setArt({ ...art, image: e.target.value }); }} />
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                {albums}
            </div>
        </>
    );
}