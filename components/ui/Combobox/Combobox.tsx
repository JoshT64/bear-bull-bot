'use client';

import { Tickers } from '../Homepage';
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
import React, { useEffect, useState } from 'react';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  stocks: { label: string; tickers: { label: string; value: string }[] }[];
}

export function Combobox({
  className,
  placeholder,
  stocks
}: TeamSwitcherProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selectedTicker, setSelectedTicker] = useState<Tickers>();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild></PopoverTrigger>
      {/* @ts-ignore */}
      <Command open={open}>
        <CommandList>
          <CommandInput
            ref={inputRef}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            // @Todo: Add command open like CMD + P dialog
            placeholder={placeholder}
          />
          {open &&
            stocks.map((stock) => (
              <CommandGroup key={stock.label} heading={stock.label}>
                {stock.tickers.map((ticker) => (
                  <CommandItem
                    key={ticker.value}
                    onSelect={() => {
                      console.log('ON select');
                      router.push(`/selectedTicker/${ticker.value}`);
                      setSelectedTicker(ticker);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    {ticker.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
        </CommandList>
        <CommandSeparator />
      </Command>
    </Popover>
  );
}

// Todo: =>

// useEffect(() => {
//   const down = (e: KeyboardEvent) => {
//     if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
//       e.preventDefault();
//       setOpen((open) => !open);
//       // input ref focus doesn't work :(
//       if (inputRef && inputRef.current) {
//         inputRef.current.focus();
//       }
//     }
//   };

//   document.addEventListener('keydown', down);
//   return () => document.removeEventListener('keydown', down);
// }, []);
