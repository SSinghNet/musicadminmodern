import { useState } from "react";
import { Artist } from "../../config/site";
import InfiniteScroll from "react-infinite-scroller";
import ArtistCard from "../../components/artist/ArtistCard";

export default function ArtistList({ artists, filterNoImage }: { artists: Artist[], filterNoImage:boolean }) {
    const [artistsList, setArtistsList] = useState<JSX.Element[]>([]);
    const [count, setCount] = useState(0);

    const fetchArtists = () => {
        if (count > artists.length) {
            return;
        }
        if (filterNoImage) {
            setArtistsList([
                ...artistsList, ...artists.slice(count, count + 10).filter((artist:Artist) => artist.image == null).
                    map((artist: Artist) => <ArtistCard key={artist.id} artist={artist} />)
            ]);
        } else {
            setArtistsList([
                ...artistsList, ...artists.slice(count, count + 10).
                    map((artist: Artist) => <ArtistCard key={artist.id} artist={artist} />)
            ]);
        }
        
        setCount(count + 10);
    };

    const loader = <div></div>;

    return (
        <>
            <InfiniteScroll
                loadMore={fetchArtists}
                hasMore={true}
                loader={loader}
            >
                <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}>
                    {artistsList}
                </div>
            </InfiniteScroll>
        </>
    );
}