"use client";

import { useState, useEffect } from "react";
import { type Star } from "@/app/constants";
import { STAR_CONFIG } from "@/app/constants/constants";

export const {
  COUNT,
  STAR_TOP_LEFT,
  STAR_PARTICLE_MIN_SIZE,
  STAR_PARTICLE_MAX_SIZE,
  STAR_DELAY,
} = STAR_CONFIG;

export const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    const starCount = COUNT;
    const newStars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * STAR_TOP_LEFT}%`,
        left: `${Math.random() * STAR_TOP_LEFT}%`,
        size: `${Math.random() * (STAR_PARTICLE_MAX_SIZE - STAR_PARTICLE_MIN_SIZE) + STAR_PARTICLE_MIN_SIZE}px`,
        delay: `${Math.random() * STAR_DELAY}s`,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-twinkle opacity-50"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};
