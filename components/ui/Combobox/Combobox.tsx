'use client';

import { useOnClickAway } from '../../utils/useOnClickAway';
import { Ticker } from '../Pricing/types';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/Command';
import { Popover, PopoverTrigger } from '@/components/ui/Popover/index';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ComboboxProps {
  className?: string;
  placeholder?: string;
  tickers: Ticker[] | null;
}

export function Combobox({ placeholder, tickers }: ComboboxProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const comboboxRef = React.useRef<HTMLDivElement>(null);

  useOnClickAway(comboboxRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <div ref={comboboxRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild></PopoverTrigger>
        {/* @ts-ignore */}
        <Command open={open}>
          <CommandList>
            <CommandInput
              ref={inputRef}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
            />
            {open && (
              <CommandGroup heading="Stocks">
                {tickers?.map((stock) => (
                  <CommandItem
                    key={stock.ticker}
                    onSelect={() => {
                      router.push(`/symbol/${stock.ticker}`);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {stock.ticker}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <CommandSeparator />
        </Command>
      </Popover>
    </div>
  );
}

// useEffect(() => {
//   const handleKeyDown = (e: KeyboardEvent) => {
//     if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
//       if (isFocused) {
//         console.log(isFocused);
//         (inputRef?.current?.lastChild as HTMLInputElement).blur();
//         setIsFocused(false);
//       } else {
//         console.log('set', isFocused);
//         (inputRef?.current?.lastChild as HTMLInputElement)?.focus();
//         setIsFocused(true);
//       }
//     }
//   };

//   document.addEventListener('keydown', handleKeyDown);
//   return () => document.removeEventListener('keydown', handleKeyDown);
// }, []);
