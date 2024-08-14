import { Link, useNavigate } from "react-router-dom";
import { Album, Tag } from "../../config/site";
import Header from "../elements/Header";
import { useState } from "react";
import AlbumCard from "../album/AlbumCard";
import Button from "../elements/Button";

export default function TagForm({ tag }: { tag: Tag }) {
    const [ta, setTa] = useState(tag);

    const navigate = useNavigate();
    const handleSave = async () => {
        const newTag = {} as { name: string, color: string };
        if (ta.name !== tag.name) {
            newTag.name = ta.name;
        }
        if (ta.color !== tag.color) {
            newTag.color = ta.color;
        }
        if (Object.keys(newTag).length !== 0) {
            fetch(`https://music.ssingh.net/tag/${ta.id}`, {
                method: "PUT",
                headers: {
                    "Token": `${import.meta.env.VITE_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTag)
            }).then(() => {
                alert("Changes saved.");
                navigate("/tag");
            });
            localStorage.removeItem("tags");
        } else {
            alert("No changes made.");
            navigate("/tag");
        }
    };

    const header = <Header
        title={
            <Link to="/tag">&lt; Tags </Link>
        }
        children={[
            <Button
                onClick={handleSave}
                content="Save"
                type="primary"
            />,
        ]} />;

    const albums = tag.albums?.map((album: Album) => <AlbumCard key={album.id} album={album} />);

    return (
        <>
            {header}
            <div className="w-full justify-center text-center border-1 bg-white flex rounded-lg">
                <div className="bg-slate-300 relative border-r-8 border-primary w-5/12 align-middle">
                    <div className="text-off-white w-full p-3 h-full flex" style={{backgroundColor: ta.color ? `#${ta.color}` : "#181a1c"}}>
                        <a href={`https://music.ssingh.net/tag/${ta.id}`} target="_blank" className="m-auto">
                            <h1 className={"text-xl font-semibold"}>{ta.name}</h1>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-7/12 p-7 gap-4">
                    <div className="relative">
                        <label htmlFor="name" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">name:</label>
                        <textarea className="focus:ring-primary focus:border-primary bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={ta.name} name="name" onChange={(e) => { setTa({ ...ta, name: e.target.value }); }} />
                    </div>
                    <div className="relative">
                        <label htmlFor="color" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">color:</label>
                        <textarea className="focus:ring-primary focus:border-primary bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={ta.color} name="color" onChange={(e) => { setTa({ ...ta, color: e.target.value }); }} />
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                {albums}
            </div>
        </>
    );
}