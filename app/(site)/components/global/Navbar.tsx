"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import Logo from "../../icons/logo.png";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-100 z-30 md:mb-28 mb-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} width={25} height={25} alt="logo" />
        </Link>
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link
                href="/about"
                className="dark:text-white text-zinc-600 hover:text-purple-400 dark:hover:text-purple-400 duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="dark:text-white text-zinc-600 hover:text-purple-400 dark:hover:text-purple-400 duration-300"
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`dark:bg-[#1d1d20] bg-zinc-100 dark:text-purple-400 text-zinc-500 rounded-full p-2 duration-300 transition-transform text-xl ${
            theme === "light" ? "-rotate-180" : "rotate-0"
          }`}
        >
          {theme === "light" ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
}
