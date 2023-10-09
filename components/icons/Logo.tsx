import Image from 'next/image';

const Logo = ({ className = '', ...props }) => (
  <Image
    src="/bear-bull-bot-logo-white.png"
    alt="bear bull bot logo"
    width={48}
    height={48}
    priority={true}
  />
);

export default Logo;
