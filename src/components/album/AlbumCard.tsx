import { Link } from "react-router-dom";
import { Album, Artist } from "../../config/site";

export default function AlbumCard({ album }: { album: Album }) {
    const artists = album.artists?.map((artist: Artist) =>
        <Link to={`/artist/${artist.id}`} className={"text-sm font-light"}>
            <div>
                {artist.name}
            </div>
        </Link>
    );

    return (
        <Link to={`/album/${album.id}`} className={"my-3 md:m-4"}>
            <div className={"bg-white h-full text-center drop-shadow-xl rounded-xl pb-4 transition-all"}>
                <div className={"aspect-square bg-black border-b-4 border-primary rounded-t-xl"}>
                    <img src={album.image} alt={`${album.name} Cover`} className={"h-full w-full rounded-t-xl"} />
                </div>
                <div className={"px-3 py-5"}>
                    <h1 className={"text-md font-medium my-1"}>{album.name}</h1>
                    {artists}
                    <br/>
                    <h3 className={"text-xs my-1 font-extralight fixed bottom-3 right-3"}>{album.score}%</h3>
                    <h3 className={"text-xs my-1 font-extralight fixed bottom-3 left-3"}>{album.releaseDate}</h3>
                </div>
            </div>
        </Link>
    );
}