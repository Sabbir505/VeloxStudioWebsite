"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export default function Logo({
  className = "",
  size = "md",
  variant = "full",
}: LogoProps) {
  const { theme } = useTheme();
  
  const sizes = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 50 },
    lg: { width: 200, height: 60 },
  };

  const iconSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 56, height: 56 },
  };

  const { width, height } = variant === "full" ? sizes[size] : iconSizes[size];

  const logoFile =
    variant === "full"
      ? theme === "dark"
        ? "/assets/logo/vs-dark-full.png"
        : "/assets/logo/vs-light-full.png"
      : "/assets/CoreMembers/group1.png";

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoFile}
        alt="Velox Studio"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}
