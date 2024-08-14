import { Link } from "react-router-dom";

export default function SidebarElement({link, content, active} : {link: string, content: string, active: boolean}) {
    return (
        <li className="my-16">
            <Link to={link}>
                {content}
                <span className={
                    "ml-6 py-2 px-[0.1rem] rounded-sm h-full " +
                    (active ? "bg-primary" : "bg-white")
                }></span>
            </Link>
        </li>
    );
}