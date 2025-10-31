import GraphBackground from "../components/Graph";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Home() {
  return (
    <div className="w-full flex flex-col">

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <GraphBackground />
        </div>


        <div className="relative z-10 text-center p-8">
          <div className="bg-black text-3xl font-bold font-mono p-4 text-white">
            <AnimatedHeader />
          </div>
        </div>
      </section>

      {/* CARD SECTION (normal background) */}
      <section className="relative z-20 bg-zinc-900 py-20">
        <CardBar />
      </section>
    </div>
  );
}


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
    }, deleting ? 50 : 50);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <div>
      {titles[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </div>
  );
}



function Card({ title, description, border_color , image_src}) {
  const borderClass =
    {
      pink: "border-fuchsia-500",
      purple: "border-violet-500",
      green: "border-emerald-500",
      red: "border-red-700",
    }[border_color] || "border-zinc-700";

  return (
    <a
      href="my-portfolio/projects"
      className={clsx(
        "block w-full p-6 bg-white border-[2px] rounded-xl shadow-md bg-zinc-800 hover:bg-zinc-700 transition-all",
        borderClass
      )}
    >
      <h5 className="mb-3 text-3xl font-bold tracking-tight text-white">
        {title}
      </h5>
      <p className="text-lg text-gray-400">{description}</p>
      

      <img class="h-auto max-w-full" src="/images/tb2.png" alt="Image of Tension Board 2 Spray"/>


    </a>
  );
}

function CardBar() {
  return (
    <div className="text-center px-8">
      <h2 className="text-2xl font-bold mb-8 text-white">Featured Projects</h2>
      <div className="flex flex-row items-center gap-8 max-w-8xl mx-auto">
        <Card title="Tension Board 2 Grade Classifier" description="A custom built neural network to automatically grade climbs for the world's best system board" border_color="pink" />
        <Card title="My Website" description="bcd" border_color="green" />
      </div>
    </div>
  );
}