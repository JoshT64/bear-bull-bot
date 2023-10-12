'use server';

import Link from 'next/link';

export const FooterLinks = () => {
  return (
    <>
      <div className="col-span-1 lg:col-span-2">
        <ul className="flex flex-col flex-initial md:flex-1">
          <li className="py-3 md:py-0 md:pb-4">
            <Link
              href="/"
              className="text-white transition duration-150 ease-in-out hover:text-zinc-300"
            >
              Home
            </Link>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <Link
              href="/"
              className="text-white transition duration-150 ease-in-out hover:text-zinc-300"
            >
              About
            </Link>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <a
              target="_blank"
              href="https://bear-bull-bot.gitbook.io/bear-bull-bot/"
              className="text-white transition duration-150 ease-in-out hover:text-zinc-300"
            >
              Docs
            </a>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <Link
              href="/"
              className="text-white transition duration-150 ease-in-out hover:text-zinc-200"
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <ul className="flex flex-col flex-initial md:flex-1">
          <li className="py-3 md:py-0 md:pb-4">
            <p className="font-bold text-white transition duration-150 ease-in-out hover:text-zinc-300">
              LEGAL
            </p>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <Link
              href="/"
              className="text-white transition duration-150 ease-in-out hover:text-zinc-300"
            >
              Privacy Policy
            </Link>
          </li>
          <li className="py-3 md:py-0 md:pb-4">
            <Link
              href="/"
              className="text-white transition duration-150 ease-in-out hover:text-zinc-300"
            >
              Terms of Use
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
