import { Link } from "react-router-dom";
import { Tag } from "../config/site";

export default function TagCard({ tag }: { tag: Tag }) {
    const bg = { backgroundColor: (tag.color != null ? `#${tag.color}` : "#ffffff") };
    
    return (
        <Link to={`/tag/${tag.id}`} className={"m-3 md:m-4"}>
            <div className={"h-full text-center drop-shadow-xl rounded-xl pb-4"} style={bg} >
                <div className={"px-3 py-5"}>
                    <h1 className={"text-md font-medium my-1"}>{tag.name} - {tag.color}</h1>
                </div>
            </div>
        </Link>
    );
}