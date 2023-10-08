import { Avatar, AvatarDropdown } from '../Avatar';
import { Dropdown } from '../Dropdown';
import s from './Navbar.module.css';
import SignOutButton from './SignOutButton';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Logo from '@/components/icons/Logo';
import Image from 'next/image';
import Link from 'next/link';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-7xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Image
                src="/bear-bull-bot-logo-white.png"
                alt="bear bull bot logo"
                width={48}
                height={48}
                priority={true}
              />
            </Link>
            <nav className="hidden ml-6 space-x-2 lg:block">
              <Link href="/" className={s.link}>
                Pricing
              </Link>
              {user && (
                <Link href="/account" className={s.link}>
                  Account
                </Link>
              )}
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8 place-self-center">
            {user ? (
              <AvatarDropdown src={user?.user_metadata.picture} />
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
