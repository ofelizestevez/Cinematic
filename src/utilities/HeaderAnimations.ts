// HeaderAnimations.ts
import {gsap} from "gsap";

export const fadeIn = (element: HTMLElement | null) => {
  if (element) {
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1 });
  }
};

export const beatingAnimation = (
  timeline: gsap.core.Timeline,
  element: HTMLElement | null,
  backgroundImage: string | null,
  backupImage: string | null
) => {
  if (element) {
    if (backgroundImage === backupImage) {
      timeline
        .clear()
        .repeat(-1)
        .fromTo(element, { opacity: 1 }, { opacity: 0.5, duration: 1 })
        .to(element, { opacity: 1, duration: 1 });
    } else {
      timeline.repeat(0).to(element, { opacity: 1 });
    }
  }
};

export const crossFade = (backupImageRef: HTMLImageElement | null) => {
  return new Promise<void>((resolve) => {
    if (backupImageRef) {
      gsap.fromTo(backupImageRef, { opacity: 1 }, { opacity: 0 }).then(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

export const scrollableAnimation = (
  element: HTMLElement | null,
  scrollable: boolean
) => {
  if (element) {
    gsap.to(element, { opacity: scrollable ? 0.5 : 1 });
  }
};