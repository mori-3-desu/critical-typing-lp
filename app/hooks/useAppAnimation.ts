import { useAnimationContext } from "../providers";
import { Target } from "framer-motion";

export const useAppAnimation = () => {
  const { hasPlayedOpening } = useAnimationContext();
  const shouldAnimate = !hasPlayedOpening;
  const commonTransition = (duration: number, delay: number = 0) => ({
    duration: shouldAnimate ? duration : 0,
    delay: shouldAnimate ? delay : 0,
  });

  const initialStyle = (fromStyle: Target, toStyle: Target): Target =>
    shouldAnimate ? fromStyle : toStyle;

  return { shouldAnimate, commonTransition, initialStyle };
};
