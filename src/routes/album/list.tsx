import { useState } from "react";
import AlbumCard from "../../components/album/AlbumCard";
import { Album } from "../../config/site";
import InfiniteScroll from 'react-infinite-scroller';

export default function AlbumList({ albums }: { albums: Album[] }) {
    const [albumsList, setAlbumsList] = useState<JSX.Element[]>([]);
    const [count, setCount] = useState(0);

    const fetchAlbums = () => {
        if (count > albums.length) {
            return;
        }
        setAlbumsList([
            ...albumsList, ...albums.slice(count, count + 10).
                map((album: Album) => <AlbumCard key={album.id} album={album} />)
        ]);
        setCount(count + 10);
    };

    const loader = <div></div>;

    return (
        <>
            <InfiniteScroll
                loadMore={fetchAlbums}
                hasMore={true}
                loader={loader}
            >
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
                    {albumsList}
                </div>
            </InfiniteScroll>
        </>
    );
}