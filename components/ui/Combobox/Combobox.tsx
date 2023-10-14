'use client';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/Command';
import { Popover, PopoverTrigger } from '@/components/ui/Popover/index';
import React, { useState } from 'react';

const groups = [
  {
    label: 'Stocks',
    teams: [
      {
        label: 'SPY',
        value: 'SPY'
      }
    ]
  },
  {
    label: 'Cryptocurrency',
    teams: [
      {
        label: 'Bitcoin-USD',
        value: 'BTC-USD'
      },
      {
        label: 'Ethereum',
        value: 'ETH-USD'
      }
    ]
  }
];

type Team = (typeof groups)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export function Combobox({ className }: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const inputRef = React.useRef(null); // Create a ref

  const [selectedTeam, setSelectedTeam] = useState<Team>(groups[0].teams[0]);

  console.log(open);

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
            placeholder="Search stocks..."
          />
          {/* <CommandEmpty>No stock results found.</CommandEmpty> */}
          {groups.map(
            (group) =>
              open && (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      {team.label}
                      {/* <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          selectedTeam.value === team.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      /> */}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
          )}
        </CommandList>
        <CommandSeparator />
      </Command>
    </Popover>
  );
}
