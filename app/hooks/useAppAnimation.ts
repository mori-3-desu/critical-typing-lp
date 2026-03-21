import { useAnimationContext } from "../providers";
import { TargetAndTransition } from "framer-motion";

export const useAppAnimation = () => {
  const { hasPlayedOpening } = useAnimationContext();
  const shouldAnimate = !hasPlayedOpening;
  const commonTransition = (duration: number, delay: number = 0) => ({
    duration: shouldAnimate ? duration : 0,
    delay: shouldAnimate ? delay : 0,
  });

  const initialStyle = (fromStyle: TargetAndTransition, toStyle: TargetAndTransition): TargetAndTransition =>
    shouldAnimate ? fromStyle : toStyle;

  return { shouldAnimate, commonTransition, initialStyle };
};
