export default function Header({title, children} :{title: string | JSX.Element, children?: JSX.Element[]}) {
    return (
        <header className="my-7 flex ">
            <h1 className="uppercase text-black text-opacity-50">{title}</h1>
            {children}
        </header>
    );
}