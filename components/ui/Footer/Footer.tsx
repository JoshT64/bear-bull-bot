import { FooterLinks } from './FooterLinks';
import GitHub from '@/components/icons/GitHub';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="grid grid-cols-1 gap-8 py-12 text-white transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 bg-zinc-900">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/" className="flex items-center  font-bold md:mr-16">
            <span className="mr-2 border-zinc-700">
              <Logo />
            </span>
            <span className="  whitespace-nowrap">Bear Bull Bot</span>
          </Link>
        </div>
        <FooterLinks />
        <div className="flex items-start col-span-1 text-white lg:col-span-6 lg:justify-end">
          <div className="flex items-center h-10 space-x-6">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
            ></a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row bg-zinc-900">
        <div>
          <span>
            &copy; {new Date().getFullYear()} Bear Bull Bot, Inc. All rights
            reserved.
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-white pr-2">Crafted by </span>
          <a href="https://github.com/joshT64/" aria-label="Github.com Link">
            <GitHub />
          </a>
        </div>
      </div>
    </footer>
  );
}
