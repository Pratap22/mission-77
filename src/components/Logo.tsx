import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 72 }: LogoProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Mission 77 - Explore with Pratap"
        width={size}
        height={size}
        className="drop-shadow-sm"
        priority
      />
    </div>
  );
}
