"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

/**
 * Warm cream/tan mesh gradient backdrop, built on paper-design's
 * open-source MeshGradient shader (MIT).
 */
export function HeroMeshGradient({ className }: { className?: string }) {
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) setSpeed(0);
  }, []);

  return (
    <MeshGradient
      className={className}
      width="100%"
      height="100%"
      fit="cover"
      colors={["#f5f5db", "#ece7cb", "#e2d7b6", "#dacaa4"]}
      distortion={0.8}
      swirl={0.1}
      grainMixer={0}
      grainOverlay={0}
      speed={speed}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
