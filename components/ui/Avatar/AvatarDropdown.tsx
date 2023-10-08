'use client';

import './Avatar.scss';
import Profile from '../../icons/ProfileIcon';
import ProfileIcon from '../../icons/ProfileIcon';
import SignOutIcon from '../../icons/SignOutIcon';
import Button from '../Button';
import { Dropdown } from '../Dropdown';
import SignOutButton from '../Navbar/SignOutButton';
// @ts-ignore
import styles from './Avatar.modules.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | '2xlarge' | '3xlarge';
}

export const AvatarDropdown: React.FC<AvatarProps> = ({
  size = 'medium',
  src,
  alt
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleClickOutside = (event: MouseEvent) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const rootClassName = classNames(styles.root);

  return (
    <div ref={ref}>
      <span
        className={`c-avatar c-avatar--size-${size}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img className="c-avatar__img" src={src} alt={alt} />
      </span>
      {isDropdownOpen && (
        <Dropdown
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
          label={alt}
          options={[
            <Button variant="slim" onClick={() => router.push('/account')}>
              <ProfileIcon />
              Account
            </Button>,
            <SignOutButton>
              <SignOutIcon />
            </SignOutButton>
          ]}
        />
      )}
    </div>
  );
};
