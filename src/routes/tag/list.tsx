import { useState } from "react";
import { Tag } from "../../config/site";
import InfiniteScroll from "react-infinite-scroller";
import TagCard from "../../components/TagCard";

export default function TagList({ tags }: { tags: Tag[] }) {
    const [tagsList, setTagsList] = useState<JSX.Element[]>([]);
    const [count, setCount] = useState(0);

    const fetchTags = () => {
        if (count > tags.length) {
            return;
        }
        setTagsList([
            ...tagsList, ...tags.slice(count, count + 10).
                map((tag: Tag) => <TagCard key={tag.id} tag={tag} />)
        ]);

        setCount(count + 10);
    };

    const loader = <div></div>;

    return (
        <>
            <InfiniteScroll
                loadMore={fetchTags}
                hasMore={true}
                loader={loader}
            >
                <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}>
                    {tagsList}
                </div>
            </InfiniteScroll>
        </>
    );
}