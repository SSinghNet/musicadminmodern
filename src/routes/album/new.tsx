import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/elements/Header";
import { useState } from "react";
import Button from "../../components/elements/Button";

export default function AlbumNew() {

    const [alb, setAlb] = useState({ name: "", image: "", score: 0, releaseDate: new Date().toISOString().substring(0, 10), review: "", artists: "", tags: "" });

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

    const addAlbum = async (body: { name: string; image: string; score: number; releaseDate: string; review: string; artists: { name: string; }[]; tags: { name: string; }[]; }) => {
        console.log(JSON.stringify(
            body
        ));
        await fetch("https://music.ssingh.net/album/", {
            method: "POST",
            body: JSON.stringify(
                body
            ),
            headers: {
                "Token": `${import.meta.env.VITE_TOKEN}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response.text());
        });
    }


    const navigate = useNavigate();
    const handleSave = async () => {
        const newAlb = {} as { name: string, image: string, score: number, releaseDate: string, review: string, artists: { name: string; }[], tags: { name: string; }[] };
        if (alb.name === "" || alb.image === "" || alb.score > 100 || alb.score < 0 || alb.releaseDate === "" || alb.artists === "" || alb.tags === "") {
            alert("invalid input");
            return;
        }
        newAlb.name = (alb.name).trim();
        newAlb.image = alb.image;
        newAlb.score = alb.score;
        newAlb.releaseDate = alb.releaseDate;
        newAlb.review = alb.review;
        newAlb.artists = alb.artists.split(",").map((item) => { return { "name": item.trim() }; });
        newAlb.tags = alb.tags.split(",").map((item) => { return { "name": item.trim().toLowerCase() }; });

        newAlb.image = await uploadImage(newAlb.image).then((res) => {
            return "https://music.ssingh.net/img?key=" + res;
        });

        await addAlbum(newAlb).then(() => {
            alert("Album added.");
            localStorage.removeItem("albums");
            navigate("/album");
        });

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

    return (
        <>
            {header}
            <div className="w-full justify-center text-center border-1 bg-white flex rounded-lg my-3">
                <div className="bg-slate-300 relative border-r-8 border-primary w-5/12">
                    <div className={"aspect-square bg-black"}>
                        <img src={alb.image} alt={`${alb.name} Cover`} className={"w-full h-full"} />
                    </div>
                    <div className="absolute bottom-0 bg-black bg-opacity-80 text-off-white w-full p-3">
                        <h1 className={"text-xl font-semibold my-1"}>{alb.name}</h1>
                        <h1 className={"text-sm font-light my-1"}>{alb.artists}</h1>
                        <h1 className={"text-xs font-light my-1"}>{alb.tags}</h1>
                        <br />
                        <h3 className={"text-xs my-1 font-extralight absolute bottom-3 right-3"}>{alb.score}%</h3>
                        <h3 className={"text-xs my-1 font-extralight absolute bottom-3 left-3"}>{alb.releaseDate}</h3>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-7/12 p-7 gap-4">
                    <div className="relative">
                        <label htmlFor="name" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">name:</label>
                        <textarea className="focus:ring-primary focus:border-primary bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.name} name="name" onChange={(e) => { setAlb({ ...alb, name: e.target.value }); }} />
                    </div>
                    <div className="relative">
                        <label htmlFor="image" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">image:</label>
                        <textarea className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.image} name="image" onChange={(e) => { setAlb({ ...alb, image: e.target.value }); }} />
                    </div>
                    <div className="relative">
                        <label htmlFor="artists" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">artists:</label>
                        <textarea className="focus:ring-primary focus:border-primary bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.artists} name="artists" onChange={(e) => { setAlb({ ...alb, artists: e.target.value }); }} />
                    </div>
                    <div className="relative">
                        <label htmlFor="tags" className="absolute z-10 top-2 left-2 lowercase text-black text-opacity-50 text-xs">tags:</label>
                        <textarea className="bg-off-white p-2 pt-7 px-3 rounded-md drop-shadow-sm resize-none w-full" required value={alb.tags} name="tags" onChange={(e) => { setAlb({ ...alb, tags: e.target.value }); }} />
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
            <div className="my-3 w-full justify-center text-center border-1 bg-white rounded-lg p-5">
                <h1 className="uppercase text-black text-opacity-50 text-md">Review</h1>
                <div className="py-3 text-sm" dangerouslySetInnerHTML={alb.review != undefined ? { __html: alb.review } : { __html: "" }}>
                </div>
            </div>
        </>
    );
}