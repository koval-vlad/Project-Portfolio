export type TransitionType =
  | 'random'
  | 'fade'
  | 'crossfade'
  | 'smooth-blur'
  | 'push-right'
  | 'push-left'
  | 'push-up'
  | 'push-down'
  | 'zoom-in'
  | 'zoom-out'
  | 'pop-up'
  | 'flip-x'
  | 'flip-y'
  | 'cube-turn'
  | '3d-lift'
  | 'wipe-right'
  | 'wipe-vertical'
  | 'circle-reveal'
  | 'bounce-drop'
  | 'tilt-shift'
  | 'swing-in'
  | 'glitch-fade'
  | 'scan-reveal'
  | 'shutter'
  | 'data-stream'
  | 'door-open'
  | 'spiral'
  | 'slide-and-skew'
  | 'float-and-glow';

export const transitionVariants = [
  // --- RANDOM TRANSITION (special case) ---
  { name: 'random', initial: {}, animate: {}, exit: {} },

  // --- SUBTLE & PROFESSIONAL ---
  { name: 'fade', initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  { name: 'crossfade', initial: { opacity: 0, scale: 1.05 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } },
  { name: 'smooth-blur', initial: { opacity: 0, filter: "blur(10px)" }, animate: { opacity: 1, filter: "blur(0px)" }, exit: { opacity: 0, filter: "blur(10px)" } },

  // --- DIRECTIONAL PUSH (PowerPoint Style) ---
  { name: 'push-right', initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  { name: 'push-left', initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  { name: 'push-up', initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
  { name: 'push-down', initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '100%' } },

  // --- ZOOM & SCALE ---
  { name: 'zoom-in', initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.5, opacity: 0 } },
  { name: 'zoom-out', initial: { scale: 1.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } },
  { name: 'pop-up', initial: { scale: 0.8, y: 50, opacity: 0 }, animate: { scale: 1, y: 0, opacity: 1 }, exit: { scale: 1.1, y: -20, opacity: 0 } },

  // --- 3D & PERSPECTIVE (Futuristic) ---
  { name: 'flip-x', initial: { rotateX: 90, opacity: 0 }, animate: { rotateX: 0, opacity: 1 }, exit: { rotateX: -90, opacity: 0 } },
  { name: 'flip-y', initial: { rotateY: 90, opacity: 0 }, animate: { rotateY: 0, opacity: 1 }, exit: { rotateY: -90, opacity: 0 } },
  { name: 'cube-turn', initial: { rotateY: 45, x: '50%', opacity: 0 }, animate: { rotateY: 0, x: 0, opacity: 1 }, exit: { rotateY: -45, x: '-50%', opacity: 0 } },
  { name: '3d-lift', initial: { rotateX: -15, z: -200, opacity: 0 }, animate: { rotateX: 0, z: 0, opacity: 1 }, exit: { rotateX: 15, z: -200, opacity: 0 } },

  // --- WIPES & MASKS ---
  { name: 'wipe-right', initial: { clipPath: 'inset(0 100% 0 0)' }, animate: { clipPath: 'inset(0 0 0 0)' }, exit: { clipPath: 'inset(0 0 0 100%)' } },
  { name: 'wipe-vertical', initial: { clipPath: 'inset(100% 0 0 0)' }, animate: { clipPath: 'inset(0 0 0 0)' }, exit: { clipPath: 'inset(0 0 100% 0)' } },
  { name: 'circle-reveal', initial: { clipPath: 'circle(0% at 50% 50%)' }, animate: { clipPath: 'circle(100% at 50% 50%)' }, exit: { clipPath: 'circle(0% at 50% 50%)' } },

  // --- DYNAMIC & PLAYFUL ---
  { name: 'bounce-drop', initial: { y: -500 }, animate: { y: 0, transition: { type: 'spring', bounce: 0.5 } }, exit: { y: 500 } },
  { name: 'tilt-shift', initial: { rotate: -5, scale: 0.9, opacity: 0 }, animate: { rotate: 0, scale: 1, opacity: 1 }, exit: { rotate: 5, scale: 1.1, opacity: 0 } },
  { name: 'swing-in', initial: { rotateY: -90, originX: 0 }, animate: { rotateY: 0 }, exit: { rotateY: 90, originX: 1 } },

  // --- SCI-FI / TECH ---
  { name: 'glitch-fade', initial: { skewX: 20, opacity: 0 }, animate: { skewX: 0, opacity: 1 }, exit: { skewX: -20, opacity: 0 } },
  { name: 'scan-reveal', initial: { y: -20, opacity: 0, filter: 'brightness(2)' }, animate: { y: 0, opacity: 1, filter: 'brightness(1)' }, exit: { y: 20, opacity: 0 } },
  { name: 'shutter', initial: { scaleY: 0, opacity: 0 }, animate: { scaleY: 1, opacity: 1 }, exit: { scaleY: 0, opacity: 0 } },
  { name: 'data-stream', initial: { x: 100, letterSpacing: '10px', opacity: 0 }, animate: { x: 0, letterSpacing: 'normal', opacity: 1 }, exit: { x: -100, opacity: 0 } },

  // --- MISC / CREATIVE ---
  { name: 'door-open', initial: { rotateY: 90, originX: 0, opacity: 0 }, animate: { rotateY: 0, opacity: 1 }, exit: { rotateY: -90, originX: 1, opacity: 0 } },
  { name: 'spiral', initial: { rotate: 180, scale: 0, opacity: 0 }, animate: { rotate: 0, scale: 1, opacity: 1 }, exit: { rotate: -180, scale: 0, opacity: 0 } },
  { name: 'slide-and-skew', initial: { x: '100%', skewX: -10 }, animate: { x: 0, skewX: 0 }, exit: { x: '-100%', skewX: 10 } },
  { name: 'float-and-glow', initial: { y: 20, filter: 'drop-shadow(0 0 0px var(--primary))', opacity: 0 }, animate: { y: 0, filter: 'drop-shadow(0 0 10px var(--primary))', opacity: 1 }, exit: { y: -20, opacity: 0 } }
];
