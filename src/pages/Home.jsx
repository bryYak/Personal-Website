import GraphBackground from "../components/Graph";
export default function Home() {
    return (
        <div >
            <div className="fixed inset-0 z-0 pointer-events-none">
                <GraphBackground />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <div className='p-8 text-center'>
                    <div className='bg-black text-3xl font-bold font-mono p-4'><AnimatedHeader /></div>
                </div>
            </div>
        </div>
    );
}
import { useState, useEffect } from "react";

function AnimatedHeader() {
  const titles = [
    "Building Scalable Systems",
    "Designing Intelligent Models",
    "Exploring Innovative Technology",
    "67",
  ];

  const [index, setIndex] = useState(0);      // which phrase
  const [subIndex, setSubIndex] = useState(0); // how many chars shown
  const [deleting, setDeleting] = useState(false); // deleting or typing
  const [blink, setBlink] = useState(true);   // cursor blink

  useEffect(() => {
    // blinking cursor interval
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // exit if we've finished deleting the last phrase
    if (index === titles.length) return;

    // typing or deleting speed
    const timeout = setTimeout(() => {
      setSubIndex((prev) =>
        deleting ? prev - 1 : prev + 1
      );

      // when finished typing a word
      if (!deleting && subIndex === titles[index].length) {
        setTimeout(() => setDeleting(true), 1000);
      }

      // when finished deleting
      if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % titles.length);
      }
    }, deleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-gray-400 dark:text-gray-300 mt-2">
      {titles[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </h2>
  );
}


function Card({ title, description }) {
    return (
        <a href="my-portfolio/projects" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </a>
    );
}

function CardBar() {
    return (
        <div className="text-center" >
            <h2 className="text-2xl font-bold"> Featured Projects</h2>
            <div className="flex flex-row items-center gap-4 content-center justify-center">
                <Card title="abc" description="bcd"></Card>
                <Card title="abc" description="bcd"></Card>
            </div></div>);
}