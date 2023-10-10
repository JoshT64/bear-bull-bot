import Image from 'next/image';

interface ImageProps {
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

const Logo = ({
  className = '',
  width = 48,
  height = 48,
  priority = true
}: ImageProps) => (
  <Image
    src="/bear-bull-bot-logo-white.png"
    alt="bear bull bot logo"
    width={width}
    height={height}
    priority={priority}
  />
);

export default Logo;
