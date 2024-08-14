import { Link } from "react-router-dom";
import { Artist } from "../../config/site";

export default function ArtistCard({ artist }: { artist: Artist }) {
    return (
        <Link to={`/artist/${artist.id}`} className={"m-3 md:m-4"}>
            <div className={"bg-white h-full text-center drop-shadow-xl rounded-xl pb-4"}>
                <div className={"aspect-square bg-black border-b-4 border-primary rounded-t-xl"}>
                    <img src={artist.image} alt={`${artist.name} Image`} className={"h-full w-full rounded-t-xl"} />
                </div>
                <div className={"px-3 py-5"}>
                    <h1 className={"text-md font-medium my-1"}>{artist.name}</h1>
                </div>
            </div>
        </Link>
    );
}