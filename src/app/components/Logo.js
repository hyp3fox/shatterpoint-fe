// components/Logo.js
"use client"; // Mark as client component if using App Router

import Image from 'next/image';
import { useTheme } from 'next-themes';

const Logo = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'dark' ? '/images/shatterdex-logo-black.png' : '/images/shatterdex-logo-white.png'}
      alt="Shatterdex: A Shatterpoint App"
      width={200}
      height={21.82}
    />
  );
};

export default Logo;