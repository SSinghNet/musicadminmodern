import { Link } from "react-router-dom";

export default function Button(
    {
        onClick,
        type,
        content,
        className,
        link,
    }:
        {
            onClick?: React.MouseEventHandler<HTMLButtonElement>,
            type: "primary" | "secondary",
            content: string,
            className?: string,
            link?: string
        }
) {

    const color = type == "primary" ? "bg-primary" : type == "secondary" ? "bg-black bg-opacity-70" : "";
    const classes = `drop-shadow-md px-4 text-sm text-off-white rounded-md p-2 mx-2 mt-auto ml-auto ${color} ${className}`;

    const button = <button onClick={onClick} className={classes}>{content}</button>;

    if (link) {
        return (
            <Link to={link}> {button}</Link>
        );
    }

    return button;
}