import { Link, useParams } from "react-router-dom";
import { getArtists } from ".";
import { useEffect, useState } from "react";
import { Artist } from "../../config/site";
import ArtistForm from "../../components/artist/ArtistForm";
import Header from "../../components/elements/Header";

export default function ArtistPage() {
    const [artists, setArtists] = useState<Artist[] | null>(null);
    const { artistId } = useParams();

    useEffect(() => {
        const initArtists = async () => {
            setArtists(await getArtists());
        };
        initArtists();
    }, []);

    useEffect(() => {
        localStorage.setItem("artists", JSON.stringify(artists));
    }, [artists]);

    const getArtist = (id: string): Artist | null => {
        if (artists === null) {
            return null;
        }
        for (let i = 0; i < artists?.length; i++) {
            if (artists[i].id === parseInt(id)) {
                return artists[i];
            }
        }

        return null;
    }
    const header = <Header
        title={
            <Link to="/artist">&lt; Artists </Link>
        }
        children={[]} />;

    if (artists) {
        const artist = getArtist(artistId as string);
        if (artist) {
            return <ArtistForm key={artist.id} artist={artist} />
        }
        return (<>{header} Artist Not Found</>);
    }
    return (<>{header}Loading...</>);
}