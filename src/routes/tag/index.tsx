import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Tag } from "../../config/site";
import TagList from "./list";
import Button from "../../components/Button";

const fetchTags = async () => {
    const res = await fetch("https://music.ssingh.net/tag?format=json&all=true");
    return await res.json() as Tag[];
};

// eslint-disable-next-line react-refresh/only-export-components
export const getTags = async () => {
    const tags = JSON.parse(localStorage.getItem("tags")!) as Tag[];
    if (tags) {
        return tags;
    }
    return await fetchTags();
};

export default function Tags() {

    const [tags, setTags] = useState<Tag[] | null>(null);

    const initTags = async () => {
        setTags(await getTags());
    };

    useEffect(() => {
        initTags();
    }, []);

    useEffect(() => {
        if (tags == null) {
            localStorage.removeItem("tags");
        } else {
            localStorage.setItem("tags", JSON.stringify(tags));
        }
    }, [tags]);

    const header = <Header
        title="Tags"
        children={[
            <Button
                type="secondary"
                onClick={() => { setTags(null); initTags(); }}
                content="Refresh"
            />
        ]} />;

    if (tags) {
        return (
            <>
                {header}
                <TagList tags={tags} />
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