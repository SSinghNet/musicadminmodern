import { Link, useParams } from "react-router-dom";
import { getTags } from ".";
import { useEffect, useState } from "react";
import { Tag } from "../../config/site";
import TagForm from "../../components/TagForm";
import Header from "../../components/Header";

export default function TagPage() {
    const [tags, setTags] = useState<Tag[] | null>(null);
    const { tagId } = useParams();

    useEffect(() => {
        const initTags = async () => {
            setTags(await getTags());
        };
        initTags();
    }, []);

    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tags));
    }, [tags]);

    const getTag = (id: string): Tag | null => {
        if (tags === null) {
            return null;
        }
        for (let i = 0; i < tags?.length; i++) {
            if (tags[i].id === parseInt(id)) {
                return tags[i];
            }
        }

        return null;
    }
    const header = <Header
        title={
            <Link to="/tag">&lt; Tags </Link>
        }
        children={[]} />;

    if (tags) {
        const tag = getTag(tagId as string);
        if (tag) {
            return <TagForm key={tag.id} tag={tag} />
        }
        return (<>{header} Tag Not Found</>);
    }
    return (<>{header}Loading...</>);
}