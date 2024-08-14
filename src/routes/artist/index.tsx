import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Artist } from "../../config/site";
import ArtistList from "./list";
import Button from "../../components/Button";

const fetchArtists = async () => {
    const res = await fetch("https://music.ssingh.net/artist?format=json&all=true");
    return await res.json() as Artist[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const getArtists = async () => {
    const artists = JSON.parse(localStorage.getItem("artists")!) as Artist[];
    if (artists) {
        return artists;
    }
    return await fetchArtists();
};

export default function Artists() {

    const [artists, setArtists] = useState<Artist[] | null>(null);
    const [filterNoImage, setFilterNoImage] = useState(false);

    const initArtists = async () => {
        setArtists(await getArtists());
    };

    useEffect(() => {
        initArtists();
    }, []);

    useEffect(() => {
        if (artists == null) {
            localStorage.removeItem("artists");
        } else {
            localStorage.setItem("artists", JSON.stringify(artists));
        }
    }, [artists]);

    const header = <Header
        title="Artists"
        children={[
            <Button
                onClick={() => { setFilterNoImage(!filterNoImage); setArtists(null); initArtists(); }}
                type="secondary"
                content={filterNoImage ? "Show All" : "Show Only \"No Image\""}
            />,
            <Button
                onClick={() => { setArtists(null); initArtists(); }}
                type="secondary"
                content="Refresh"
            />,
        ]} />;

    if (artists) {
        return (
            <>
                {header}
                <ArtistList artists={artists} filterNoImage={filterNoImage} />
            </>
        );
    }

    return (
        <>
            {header}
            <h1>Loading...</h1>
        </>
    );
}