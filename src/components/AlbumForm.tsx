import { Link, useNavigate } from "react-router-dom";
import { Album, Artist, Tag } from "../config/site";
import Header from "./Header";
import { useState } from "react";
import Button from "./Button";

export default function AlbumForm({ album }: { album: Album }) {

    const [alb, setAlb] = useState(album);

    const navigate = useNavigate();
    const handleSave = () => {
        const newAlb = {} as { name: string, image: string, releaseDate: string, score: number, review: string };
        if (alb.name !== album.name) {
            newAlb.name = alb.name;
        }
        if (alb.image !== album.image) {
            newAlb.image = alb.image;
        }
        if (alb.releaseDate !== album.releaseDate) {
            newAlb.releaseDate = alb.releaseDate;
        }
        if (alb.score !== album.score) {
            newAlb.score = alb.score;
        }
        if (alb.review !== album.review && alb.review != undefined) {
            newAlb.review = alb.review;
        }

        if (Object.keys(newAlb).length !== 0) {
            fetch(`https://music.ssingh.net/album/${alb.id}`, {
                method: "PUT",
                headers: {
                    "Token": `${import.meta.env.VITE_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAlb)
            }).then(() => {
                alert("Changes saved.");
                navigate("/album");
            });
            localStorage.removeItem("albums");
        } else {
            alert("No changes made.");
            navigate("/album");
        }
    };

    const header = <Header
        title={
            <Link to="/album">&lt; Albums </Link>
        }
        children={[
            <Button
                onClick={handleSave}
                content="Save"
                type="primary"
            />,
        ]} />;

    const artists = album.artists!.map((artist: Artist) =>
        <Link to={`/artist/${artist.id}`} className={"text-sm font-light"}>
            <div>
                {artist.name}
            </div>
        </Link>
    );
    const tags = album.tags!.map((tag: Tag) =>
        <Link to={`/tag/${tag.id}`} className={"text-xs font-light"}>
            | {tag.name}&nbsp;
        </Link>
    );

    return (
        <>
            {header}
            <div className="w-full border-1 bg-white flex rounded-lg">
                <div className="grid md:flex justify-center text-center w-full">
                    <div className="bg-slate-300 relative border-r-8 border-primary w-full md:w-5/12">
                        <div className={"aspect-square bg-black"}>
                            <img src={alb.image} alt={`${alb.name} Cover`} className={"w-full h-full"} />
                        </div>
                        <div className="absolute bottom-0 bg-black bg-opacity-80 text-off-white w-full p-3">
                            <a href={`https://music.ssingh.net/album/${alb.id}`} target="_blank">
                                <h1 className={"text-xl font-semibold my-1"}>{alb.name}</h1>
                            </a>
                            {artists}
                            {tags}<span className="text-xs font-light">|</span>
                            <br />
                            <br />
                            <h3 className={"text-xs my-1 font-extralight absolute bottom-3 right-3"}>{alb.score}%</h3>
                            <h3 className={"text-xs my-1 font-extralight absolute bottom-3 left-3"}>{alb.releaseDate}</h3>
                        </div>
                    </div>
                    <br />
                    <div className="grid grid-cols-2 w-full md:w-7/12 p-7 gap-4">
                        <div className="relative">
                            <label htmlFor="name" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">name:</label>
                            <textarea className="focus:ring-primary focus:border-primary bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.name} name="name" onChange={(e) => { setAlb({ ...alb, name: e.target.value }); }} />
                        </div>
                        <div className="relative">
                            <label htmlFor="image" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">image:</label>
                            <textarea className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.image} name="image" onChange={(e) => { setAlb({ ...alb, image: e.target.value }); }} />
                        </div>
                        <div className="relative">
                            <label htmlFor="releaseDate" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">Release Date: </label>
                            <input type="date" className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.releaseDate} name="releaseDate" onChange={(e) => { setAlb({ ...alb, releaseDate: e.target.value }); }} />
                        </div>
                        <div className="relative">
                            <label htmlFor="score" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">Score: </label>
                            <input type="number" className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.score} name="score" onChange={(e) => { setAlb({ ...alb, score: parseInt(e.target.value) }); }} />
                        </div >
                        <div className="relative col-span-2">
                            <label htmlFor="review" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">Review: </label>
                            <textarea rows={6} className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" value={alb.review} name="review" onChange={(e) => { setAlb({ ...alb, review: e.target.value }); }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3 w-full justify-center text-center border-1 bg-white rounded-lg p-5">
                <h1 className="uppercase text-black text-opacity-50 text-md">Review</h1>
                <div className="py-3 text-sm" dangerouslySetInnerHTML={alb.review != undefined ? { __html: alb.review } : { __html: "" }}>
                </div>
            </div>

        </>
    );
}