"use client";

import dynamic from "next/dynamic";

const LogoSlider = dynamic(() => import("./LogoSlider"), {
  ssr: false,
});

export default function LogoSliderWrapper() {
  return <LogoSlider />;
}
