"use client";
import React from "react";
import Image from "next/image";
import githubLogo from "./github-mark.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Collapse,
  Card,
} from "@material-tailwind/react";

const navLinks: { name: string; href: string }[] = [
  {
    name: "Highlight.js",
    href: "/highlightjs",
  },
];

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  const pathname = usePathname();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Typography
            as="li"
            key={link.name}
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link
              className={isActive ? "text-blue" : "text-black"}
              href={link.href}
            >
              {link.name}
            </Link>
          </Typography>
        );
      })}
    </>
  );

  return (
    <Navbar
      data-id="navbar"
      className="sticky top-[-1.5rem] z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as={Link}
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Highlight Index
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navList}
              <Typography
                as="li"
                key="github"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                {" "}
                <a href="https://github.com/wangpin34/highlight-index">
                  <Image
                    src={githubLogo}
                    alt="logo of github"
                    width="20"
                    height="20"
                  />
                </a>
              </Typography>
            </ul>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          {navList}
          <Typography
            as="li"
            key="github"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            {" "}
            <a href="https://github.com/wangpin34/highlight-index">GitHub</a>
          </Typography>
        </ul>
      </Collapse>
    </Navbar>
  );
}
