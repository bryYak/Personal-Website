import 'prismjs/themes/prism-tomorrow.css';
import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql'; // add SQL syntax
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/tokyo-night-dark.css';
import fs from 'fs';



export function Code({ file }) {
    const [content, setContent] = useState(0);
  useEffect(() => {
    fetch(file)
      .then(res => res.text())
      .then(setContent);
  }, [file]);


    console.log(content)
    return (
        <div className="prose m-2 prose-invert max-w-none bg-gray-950 text-xs">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}

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
        <figure className="object-center m-4" >
            <img className="mx-auto w-[500px]" src={src} alt="" />
            <figcaption className="text-center text-neutral-400 text-sm">{caption}</figcaption>
        </figure>
    )
}
