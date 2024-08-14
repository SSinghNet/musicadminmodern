import { Link, useParams } from "react-router-dom";
import { getAlbums } from ".";
import { useEffect, useState } from "react";
import { Album } from "../../config/site";
import AlbumForm from "../../components/album/AlbumForm";
import Header from "../../components/elements/Header";

export default function AlbumPage() {
    const [albums, setAlbums] = useState<Album[] | null>(null);
    const { albumId } = useParams();

    useEffect(() => {
        const initAlbums = async () => {
            setAlbums(await getAlbums());
        };
        initAlbums();
    }, []);

    useEffect(() => {
        localStorage.setItem("albums", JSON.stringify(albums));
    }, [albums]);

    const getAlbum = (id: string): Album | null => {
        if (albums === null) {
            return null;
        }
        for (let i = 0; i < albums?.length; i++) {
            if (albums[i].id === parseInt(id)) {
                return albums[i];
            }
        }

        return null;
    }
    const header = <Header
        title={
            <Link to="/album">&lt; Albums </Link>
        }
        children={[]} />;

    if (albums) {
        const album = getAlbum(albumId as string);
        if (album) {
            return <AlbumForm key={album.id} album={album} />
        }
        return (<>{header} Album Not Found</>);
    }
    return (<>{header}Loading...</>);
}