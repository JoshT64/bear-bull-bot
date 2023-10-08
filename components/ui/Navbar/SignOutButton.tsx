'use client';

import Button from '../Button';
import s from './Navbar.module.css';
import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function SignOutButton({ children }: PropsWithChildren) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <Button variant="slim" onClick={handleSignOut}>
      {children} Sign out
    </Button>
  );
}
