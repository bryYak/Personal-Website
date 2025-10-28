import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-zinc-800 shadow-md">
      <h1 className="text-xl font-bold"><Link to="/">Bryan Yakimisky</Link></h1>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>

      </div>
    </nav>
  );
}
