export function Header({ title }) {
    return (
        <header className="mb-4 lg:mb-6 not-format">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl text-white">
                {title}
            </h1>
        </header>
    );
}

export function Lead({ description }) {
    return (
        <p className="mb-4 text-neutral-400 text-xl ">
            {description}
        </p>
    );
}


export function Image({ src, caption }) {
    return (
        <figure className = "object-center m-4" >
            <img className = "mx-auto w-1/2" src={src} alt="" />
            <figcaption className="text-center text-neutral-400 text-sm">{caption}</figcaption>
        </figure>
    )
}

