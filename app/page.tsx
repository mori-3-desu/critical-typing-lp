import Hero from "@/components/features/Hero"; 
import { generateCurtainStars } from "./utils/star";
import { CONFIG } from "@/app/utils/constants";

export default function Home() {
  const leftStars = generateCurtainStars(CONFIG.curtain.starCount);
  const rightStars = generateCurtainStars(CONFIG.curtain.starCount);
  return (
    <main>
      <Hero leftCurtainStars={leftStars} rightCurtainStars={rightStars} />
    </main>
  );
}