import { useEffect, useState } from "react";
import { Album } from '../../config/site';
import Header from "../../components/elements/Header";

import AlbumList from "./list";
import Button from "../../components/elements/Button";
import Loading from "../../components/elements/Loading";

const fetchAlbums = async () => {
    const res = await fetch("https://music.ssingh.net/album/?format=json&all=true");
    return await res.json() as Album[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const getAlbums = async () => {
    const albums = JSON.parse(localStorage.getItem("albums")!) as Album[];
    if (albums) {
        return albums;
    }
    return await fetchAlbums();
};

export default function Albums() {
    const [albums, setAlbums] = useState<Album[] | null>(null);

    const initAlbums = async () => {
        setAlbums(await getAlbums());
    };

    useEffect(() => {
        initAlbums();
    }, []);

    useEffect(() => {
        if (albums == null) {
            localStorage.removeItem("albums");
            initAlbums();
        } else {
            localStorage.setItem("albums", JSON.stringify(albums));
        }
    }, [albums]);

    const header = <Header
        title="Albums"
        children={[
            <Button
                onClick={() => setAlbums(null)}
                content="Refresh"
                type="secondary"
            />,
            <Button
                link="/album/new"
                content="New"
                type="primary"
            />
        ]} />;

    if (albums) {
        return (
            <>
                {header}
                <AlbumList albums={albums} />
            </>
        );
    }

    return (
        <>
            {header}
            <Loading />
        </>
    );
}